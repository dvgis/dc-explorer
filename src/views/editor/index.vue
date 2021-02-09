<template>
  <div class="editor">
    <div class="title">
      <div class="left">
        <div class="btn-back" @click="goBack">
          <svg-icon
            icon-class="back_b"
            class-name="icon"
            @on-click="goBack"
          ></svg-icon>
        </div>
        三维场景构建工具
      </div>
      <div class="pro-name"></div>
      <div class="tool"></div>
    </div>
    <Menu></Menu>
    <ToolPanel :panel-title="toolPanel.title">
      <scene-panel v-if="toolPanel.type === 'scene'"></scene-panel>
      <layer-panel v-if="toolPanel.type === 'layer'"></layer-panel>
      <map-panel
        v-if="toolPanel.type === 'map'"
        :selected="selectedBaseLayer"
      ></map-panel>
      <overlay-panel v-if="toolPanel.type === 'overlay'"></overlay-panel>
      <weather-panel v-if="toolPanel.type === 'weather'"></weather-panel>
      <basic-panel v-if="toolPanel.type === 'basic'"></basic-panel>
    </ToolPanel>
    <div id="viewer-container" class="viewer-container"></div>
  </div>
</template>

<script>
import ViewerApi from '@/api/ViewerApi'
import Menu from './Menu'
import ScenePanel from './comps/ScenePanel'
import MapPanel from './comps/base-layer/MapPanel'
import LayerPanel from './comps/layer/LayerPanel'
import OverlayPanel from './comps/layer/OverlayPanel'
import BasicPanel from './comps/effect/BasicPanel'
import WeatherPanel from './comps/effect/WeatherPanel'

export default {
  name: 'Editor',
  components: {
    Menu,
    ScenePanel,
    MapPanel,
    LayerPanel,
    OverlayPanel,
    BasicPanel,
    WeatherPanel,
  },
  data() {
    return {}
  },
  computed: {
    toolPanel() {
      return (
        this.$store.getters.currentToolPanel || {
          title: '场景管理',
          type: 'scene',
        }
      )
    },
    selectedBaseLayer() {
      return this.$store.getters.selectedBaseLayer
    },
  },
  methods: {
    goBack() {
      this.$router.push('/')
      this.$store.dispatch('INIT_MENU')
      this.$store.dispatch('INIT_SCENE')
    },
    initViewer() {
      let viewer = new DC.Viewer('viewer-container')
      let weather = new DC.Weather()
      viewer.use(new DC.Effect())
      viewer.use(weather)
      global.viewerApi = new ViewerApi(viewer)
    },
  },
  mounted() {
    DC.ready(this.initViewer)
  },
}
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  position: relative;
  .title {
    width: 100%;
    position: relative;
    z-index: 1;
    height: 40px;
    border-bottom: 2px solid #000;
    font-size: 14px;
    background: #20212b;
    transition: all 0.3s;
    min-width: 1200px;
    color: #c8c8d7;
    font-style: oblique;
    user-select: none;
    .left {
      display: flex;
      height: 100%;
      align-items: center;
      .btn-back {
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #25283f;
        cursor: pointer;
        margin-right: 10px;
        .icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .viewer-container {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    margin-left: 40px;
    overflow: hidden;
  }
}
</style>

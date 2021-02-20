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
      <div class="pro-name">
        <a-input v-model:value="name"></a-input>
      </div>
      <div class="tool">
        <a-button @click="savePro">
          <svg-icon icon-class="save" class-name="icon"></svg-icon
          >保存</a-button
        >
      </div>
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
import ProApi from '@/api/ProApi'
import UserApi from '@/api/UserApi'

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
    return {
      fileName: '',
      name: '',
      pro: {},
    }
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
    proList() {
      return this.$store.getters.proList || []
    },

    baseLayers() {
      return this.$store.getters.baseLayers
    },
    layers() {
      return this.$store.getters.layers
    },
    viewPositions() {
      return this.$store.getters.viewPositions
    },
    effect() {
      return this.$store.getters.effect
    },
  },
  methods: {
    goBack() {
      this.$router.push('/')
      this.init()
    },
    init() {
      this.$store.dispatch('INIT_MENU')
      this.$store.dispatch('INIT_PRO')
      this.$store.dispatch('INIT_BASE_LAYER')
      this.$store.dispatch('INIT_LAYER')
      this.$store.dispatch('INIT_OVERLAY')
    },
    initPro() {
      this.init()
      let params = this.$route.params
      this.fileName = params.id
      let pro = ProApi.getProContent(this.fileName)
      console.log(pro)
      if (pro) {
        this.name = pro.name
        if (pro.baseLayers && pro.baseLayers.length) {
          this.$store.dispatch('SET_BASE_LAYERS', pro.baseLayers)
          pro.baseLayers.forEach((item) => {
            if (item.selected) {
              this.$store.dispatch('SET_CURRENT_BASE_LAYER', item)
            }
          })
        }
        if (pro.layers && pro.layers.length) {
          this.$store.dispatch('SET_LAYERS', pro.layers)
        }

        if (pro.viewPositions && pro.viewPositions.length) {
          this.$store.dispatch('SET_VIEW_POSITIONS', pro.viewPositions)
        }

        if (pro.effect?.basic) {
          this.$store.dispatch('SET_BASIC_EFFECT', pro.effect.basic)
        }

        if (pro.effect?.weather) {
          this.$store.dispatch('SET_WEATHER', pro.effect.weather)
        }
      }
      this.pro = pro
    },
    async initViewer() {
      let viewer = new DC.Viewer('viewer-container')
      let weather = new DC.Weather()
      viewer.use(new DC.Effect())
      viewer.use(weather)
      global.viewerApi = new ViewerApi(viewer)
      this.mountViewer()
    },
    mountViewer() {
      this.pro.baseLayers.forEach((item) => {
        if (item.selected) {
          global.viewerApi.addBaselayer(item).setBaseLayer(item)
        }
      })
    },
    savePro() {
      try {
        if (this.$store.getters.selectedIndex >= 0) {
          this.proList[this.$store.getters.selectedIndex].name = this.name
          UserApi.saveUserInfo({
            token: this.$store.getters.token,
            proCount: this.$store.getters.proCount,
            proList: this.proList,
          })
          ProApi.writePro(
            {
              name: this.name,
              baseLayers: this.baseLayers,
              layers: this.layers,
              viewPositions: this.viewPositions,
              effect: this.effect,
            },
            this.fileName
          )
        }
        this.$message.success('保存成功')
      } catch (e) {
        this.$message.error('保存失败')
      }
    },
  },
  created() {
    this.initPro()
  },
  mounted() {
    this.$nextTick(() => {
      DC.ready(this.initViewer)
    })
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      width: 200px;
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
    .pro-name {
      width: 200px;
    }
    .tool {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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

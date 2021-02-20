<template>
  <div class="panel map-panel">
    <div class="name_wrapper">
      <a-input v-model:value="baserLayer.name" class="ipt"></a-input>
    </div>
    <div class="attr_wrapper">
      <div class="attr_title">属性</div>
      <ul class="attr_content">
        <li>
          <span class="attr_name">透明度</span>
          <div class="attr_setting">
            <a-slider
              v-model:value="baserLayer.alpha"
              :min="0"
              :max="1"
              :step="0.1"
              class="slider"
            />
          </div>
        </li>
        <li>
          <span class="attr_name">亮度</span>
          <div class="attr_setting">
            <a-slider
              v-model:value="baserLayer.brightness"
              :min="0"
              :max="2"
              :step="0.1"
              class="slider"
            />
          </div>
        </li>
        <li>
          <span class="attr_name">对比度</span>
          <div class="attr_setting">
            <a-slider
              v-model:value="baserLayer.contrast"
              :min="0"
              :max="1"
              :step="0.1"
              class="slider"
            />
          </div>
        </li>
        <li>
          <span class="attr_name">饱和度</span>
          <div class="attr_setting">
            <a-slider
              v-model:value="baserLayer.saturation"
              :min="0"
              :max="2"
              :step="0.1"
              class="slider"
            />
          </div>
        </li>
        <li>
          <span class="attr_name">Gamma</span>
          <div class="attr_setting">
            <a-slider
              v-model:value="baserLayer.gamma"
              :min="0"
              :max="2"
              :step="0.1"
              class="slider"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="btns">
      <a-button @click="addBaseLayer" v-if="mode === 'add'" class="btn_save"
        ><svg-icon
          icon-class="add"
          class-name="icon"
          @on-click="addBaseLayer"
        ></svg-icon
        >添加地图</a-button
      >
      <a-button @click="saveBaseLayer" v-if="mode === 'edit'" class="btn_save"
        ><svg-icon
          icon-class="save"
          class-name="icon"
          @on-click="saveBaseLayer"
        ></svg-icon
        >保存地图</a-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPanel',
  props: {
    selected: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    baseLayers() {
      return this.$store.getters.baseLayers || []
    },
    currentBaseLayer() {
      return this.$store.getters.currentBaseLayer
    },
  },
  watch: {
    selected: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal?.id) {
          this.mode = 'edit'
          this.initVal(newVal)
        } else {
          this.mode = 'add'
          this.reset(newVal)
        }
      },
    },
    baserLayer: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        global.viewerApi.setBaseLayer(newVal)
      },
    },
  },
  data() {
    return {
      mode: 'add',
      baserLayer: {
        id: '',
        name: '',
        type: '',
        style: [],
        preView: '',
        selected: false,
        alpha: 1.0,
        brightness: 1.0,
        contrast: 1.0,
        saturation: 1.0,
        gamma: 1.0,
      },
    }
  },
  methods: {
    initVal(baserLayer) {
      this.baserLayer = baserLayer
    },
    reset(baserLayer) {
      this.baserLayer = {
        id: '',
        name: baserLayer.name,
        type: baserLayer.type,
        style: baserLayer.style,
        preView: baserLayer.preview,
        selected: false,
        alpha: 1.0,
        brightness: 1.0,
        contrast: 1.0,
        saturation: 1.0,
        gamma: 1.0,
      }
    },
    addBaseLayer() {
      let baseLayers = this.baseLayers.concat({
        ...this.baserLayer,
        id: DC.Util.uuid(),
      })
      if (baseLayers.length === 1) {
        baseLayers[0].selected = true
        this.$store.dispatch('SET_CURRENT_BASE_LAYER', baseLayers[0])
      } else {
        global.viewerApi
          .addBaselayer(this.currentBaseLayer)
          .setBaseLayer(this.currentBaseLayer)
      }
      this.$store.dispatch('SET_BASE_LAYERS', baseLayers)
      this.$store.dispatch('SET_SELECTED_BASE_LAYER', undefined)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', undefined)
    },
    saveBaseLayer() {
      let baseLayer = this.baseLayers.filter(
        (item) => item.id === this.baserLayer.id
      )[0]
      if (baseLayer) {
        baseLayer = this.baserLayer
      }
      this.$store.dispatch('SET_BASE_LAYERS', this.baseLayers)
      this.$store.dispatch('SET_SELECTED_BASE_LAYER', undefined)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', undefined)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('SET_SELECTED_KEY', 'map')
    })
  },
  beforeUnmount() {
    if (!this.currentBaseLayer) {
      global.viewerApi.removeBaseLayer()
    } else if (this.currentBaseLayer?.id !== this.baserLayer.id) {
      global.viewerApi
        .addBaselayer(this.currentBaseLayer)
        .setBaseLayer(this.currentBaseLayer)
    }
  },
}
</script>

<style lang="scss" scoped>
.map-panel {
  padding: 10px 0;
}
</style>

<template>
  <div class="panel layer-panel">
    <div class="name_wrapper">
      <a-input v-model:value="layer.name" class="ipt"></a-input>
    </div>
    <div class="attr_wrapper">
      <div class="attr_title">属性</div>
      <ul class="attr_content">
        <li>
          <span class="attr_name">ID</span>
          <div class="attr_setting">
            <a-input
              class="attr_ipt_addr"
              v-model:value="layer.id"
              :disabled="mode === 'edit'"
            ></a-input>
          </div>
        </li>
        <li>
          <span class="attr_name">类型</span>
          <div class="attr_setting">
            <a-select
              :disabled="mode === 'edit'"
              size="small"
              dropdownClassName="attr_dropdown"
              v-model:value="layer.type"
              style="width: 200px"
              class="attr_select_type"
            >
              <a-select-option
                class="attr_option"
                v-for="item in layerTypes"
                :key="item.type"
                >{{ item.name }}
              </a-select-option>
            </a-select>
          </div>
        </li>
        <li v-if="layer.type === 'geojson'">
          <span class="attr_name">地址</span>
          <div class="attr_setting">
            <a-input
              class="attr_ipt_addr"
              v-model:value="layer.url"
              :disabled="mode === 'edit'"
            ></a-input>
          </div>
        </li>
        <li>
          <span class="attr_name">显示</span>
          <div class="attr_setting">
            <a-checkbox v-model:checked="layer.show"></a-checkbox>
          </div>
        </li>
      </ul>
      <div class="attr_title" v-if="layer.type === 'geojson'">覆盖物属性</div>
      <ul class="attr_content" v-if="layer.type === 'geojson'">
        <li>
          <span class="attr_name">类型</span>
          <div class="attr_setting overlay-type">
            <a-radio-group v-model:value="overlay.type" class="overlay-radio">
              <a-radio
                class="overlay-radio-item"
                v-for="(item, index) in overlayTypes"
                :key="'overlay-' + index"
                :value="item.type"
                >{{ item.name }}</a-radio
              >
            </a-radio-group>
          </div>
        </li>
      </ul>
      <material-picker
        v-if="layer.type === 'geojson'"
        title="覆盖物材质"
        :types="materialTypes"
        v-model:type="material.type"
        v-model:colors="material.colors"
        v-model:speed="material.speed"
        v-model:isRandom="material.isRandom"
        v-model:url="material.url"
        v-model:repeat="material.repeat"
        v-model:frequency="material.frequency"
        v-model:animationSpeed="material.animationSpeed"
        v-model:amplitude="material.amplitude"
        v-model:specularIntensity="material.specularIntensity"
      ></material-picker>
    </div>
    <div class="btns">
      <a-button
        @click="preview"
        class="btn_preview"
        v-if="layer.type === 'geojson'"
        ><svg-icon
          icon-class="preview"
          class-name="icon"
          @on-click="preview"
        ></svg-icon
        >预览</a-button
      >
      <a-button @click="addLayer" v-if="mode === 'add'" class="btn_save"
        ><svg-icon
          icon-class="add"
          class-name="icon"
          @on-click="addLayer"
        ></svg-icon
        >添加图层</a-button
      >
      <a-button @click="saveLayer" v-if="mode === 'edit'" class="btn_save"
        ><svg-icon
          icon-class="save"
          class-name="icon"
          @on-click="saveLayer"
        ></svg-icon
        >保存图层</a-button
      >
    </div>
  </div>
</template>

<script>
import { layerTypeData, overlayTypeData, materialTypeData } from '@/config'

export default {
  name: 'LayerPanel',

  data() {
    return {
      mode: 'add',
      color: 'red',
      layerTypes: layerTypeData,
      overlayTypes: overlayTypeData,
      materialTypes: materialTypeData,
      layer: {
        id: '',
        name: '图层',
        type: 'vector',
        url: '',
        show: true,
        children: [],
      },
      overlay: {
        type: 'point',
      },
      material: {
        type: '',
        colors: [],
        speed: 2,
        isRandom: false,
        url: '',
        repeat: 1,
        frequency: 1000,
        animationSpeed: 0.03,
        amplitude: 100,
        specularIntensity: 10,
      },
    }
  },
  computed: {
    layers() {
      return this.$store.getters.layers || []
    },
    selectedLayer() {
      return this.$store.getters.selectedLayer
    },
  },
  methods: {
    addLayer() {
      if (!this.layer.name) {
        this.$message.error('请输入图层名称')
        return
      }
      if (this.layer.type === 'geojson' && !this.layer.url) {
        this.$message.error('请选择文件地址')
        return
      }
      this.layer.id = this.layer?.id || DC.Util.uuid()
      let layers = this.layers.concat({
        ...this.layer,
      })
      global.viewerApi.addLayer(this.layer, this.overlay, this.material)
      this.$store.dispatch('SET_LAYERS', layers)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', undefined)
    },
    saveLayer() {
      let layer = this.layers.filter((item) => item.id === this.layer.id)[0]
      if (layer) {
        layer.show = this.layer.show
        layer.name = this.layer.name
        layer.children.forEach((item) => {
          item.show = layer.show
        })
        global.viewerApi.updateLayer(this.layer)
      }
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', undefined)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('SET_SELECTED_KEY', 'layer')
      if (this.selectedLayer) {
        this.mode = 'edit'
        this.layer.id = this.selectedLayer.id
        this.layer.name = this.selectedLayer.name
        this.layer.type = this.selectedLayer.type
        this.layer.show = this.selectedLayer.show
        this.layer.children = this.selectedLayer.children
        if (this.layer.type === 'geojson') {
          this.overlay = this.layer.overlay
          this.material = this.layer.material
        }
      }
    })
  },
  beforeUnmount() {
    this.$store.dispatch('SET_SELECTED_LAYER', undefined)
  },
}
</script>

<style lang="scss" scoped>
@import '../../../../themes/var';
.layer-panel {
  padding: 10px 0;
  .overlay-radio {
    display: flex;
    align-items: center;
    .overlay-radio-item {
      display: flex;
      align-items: center;
      margin: 5px 5px;
      color: $base-font-color;
    }
  }
  .attr_content {
    li {
      .attr_name {
        width: 40px !important;
      }
      .attr_setting {
        .attr_ipt_number {
          margin-left: 0 !important;
          width: 70px !important;
          text-indent: 0 !important;
          &:nth-of-type(1) {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>

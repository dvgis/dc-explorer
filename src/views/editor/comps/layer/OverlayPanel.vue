<template>
  <div class="panel overlay-panel">
    <div class="name_wrapper">
      <a-input v-model:value="overlay.name" class="ipt"></a-input>
    </div>
    <div class="attr_wrapper">
      <div class="attr_title">属性</div>
      <ul class="attr_content">
        <li>
          <span class="attr_name">ID</span>
          <div class="attr_setting">
            <a-input class="attr_ipt_addr" v-model:value="overlay.id"></a-input>
          </div>
        </li>
        <li>
          <span class="attr_name">地址</span>
          <div class="attr_setting">
            <a-input
              class="attr_ipt_addr"
              :disabled="mode === 'edit'"
              v-model:value="overlay.url"
            ></a-input>
          </div>
        </li>
        <li>
          <span class="attr_name">显示</span>
          <div class="attr_setting">
            <a-checkbox v-model:checked="overlay.show"></a-checkbox>
          </div>
          <span
            class="attr_name"
            style="margin: 0 15px"
            v-if="layer.type === 'tileset'"
            >SkipLod</span
          >
          <div class="attr_setting" v-if="layer.type === 'tileset'">
            <a-checkbox v-model:checked="overlay.skipLod"></a-checkbox>
          </div>
          <span
            class="attr_name"
            style="margin: 0 15px"
            v-if="layer.type === 'tileset'"
            >Siblings</span
          >
          <div class="attr_setting" v-if="layer.type === 'tileset'">
            <a-checkbox v-model:checked="overlay.siblings"></a-checkbox>
          </div>
        </li>
      </ul>
      <a-collapse expandIconPosition="right" accordion>
        <a-collapse-panel key="position" header="坐标">
          <ul class="attr_content">
            <li>
              <span class="attr_name">定位</span>
              <div class="attr_setting">
                <svg-icon icon-class="location" class-name="icon"></svg-icon>
              </div>
            </li>
            <li>
              <span class="attr_name">经度</span>
              <div class="attr_setting">
                <a-input
                  class="attr_ipt_number"
                  v-model:value="overlay.lng"
                ></a-input>
              </div>
              <span class="attr_name">纬度</span>
              <div class="attr_setting">
                <a-input
                  class="attr_ipt_number"
                  v-model:value="overlay.lat"
                ></a-input>
              </div>
            </li>
            <li>
              <span class="attr_name">高度</span>
              <div class="attr_setting">
                <a-input
                  class="attr_ipt_number"
                  v-model:value="overlay.alt"
                ></a-input>
              </div>
              <span class="attr_name">偏转</span>
              <div class="attr_setting">
                <a-input
                  class="attr_ipt_number"
                  v-model:value="overlay.heading"
                ></a-input>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel
          key="material"
          header="材质"
          v-if="layer.type === 'tileset'"
        >
          <ul class="attr_content">
            <li>
              <span class="attr_name">颜色</span>
            </li>
            <li>
              <div class="attr_setting">
                <a-textarea
                  class="attr_area"
                  v-model:value="overlay.colorCondition"
                ></a-textarea>
              </div>
            </li>
            <li>
              <span class="attr_name">自定义</span>
            </li>
            <li>
              <div class="attr_setting">
                <a-textarea
                  class="attr_area"
                  v-model:value="overlay.customShader"
                ></a-textarea>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="btns">
      <a-button @click="preview" class="btn_preview"
        ><svg-icon
          icon-class="preview"
          class-name="icon"
          @on-click="preview"
        ></svg-icon
        >预览</a-button
      >
      <a-button @click="addOverlay" v-if="mode === 'add'" class="btn_save"
        ><svg-icon
          icon-class="add"
          class-name="icon"
          @on-click="addOverlay"
        ></svg-icon
        >添加覆盖物</a-button
      >
      <a-button @click="saveOverlay" v-if="mode === 'edit'" class="btn_save"
        ><svg-icon
          icon-class="save"
          class-name="icon"
          @on-click="saveOverlay"
        ></svg-icon
        >保存覆盖物</a-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverlayPanel',
  data() {
    return {
      mode: 'add',
      tempLayerId: '',
      overlay: {
        id: '',
        name: '覆盖物',
        url: '',
        show: true,
        colorCondition: '',
        customShader: '',
        lng: '',
        lat: '',
        alt: 0.0,
        heading: 0.0,
        skipLod: false,
        siblings: false,
      },
    }
  },
  computed: {
    layer() {
      return this.$store.getters.selectedLayer
    },
    selectedOverlay() {
      return this.$store.getters.selectedOverlay
    },
  },
  methods: {
    preview() {
      if (!this.overlay.url) {
        this.$message.error('请输入覆盖物地址')
        return
      }
      if (this.tempLayerId) {
        global.viewerApi.clearLayer(this.tempLayerId)
      } else {
        this.tempLayerId = DC.Util.uuid()
        if (this.layer.type === 'tileset') {
          global.viewerApi.addLayer({
            id: this.tempLayerId,
            type: 'tileset',
            name: 'temp',
            show: true,
          })
        }
      }

      if (this.layer.type === 'tileset') {
        let id = DC.Util.uuid()
        global.viewerApi.addTileset(this.tempLayerId, {
          ...this.overlay,
          id,
        })
        global.viewerApi.flyTo(this.tempLayerId, id)
      }
    },
    deleteTemp() {
      if (this.tempLayerId) {
        global.viewerApi.removeLayer(this.tempLayerId)
      }
      this.tempLayerId = undefined
    },
    addOverlay() {
      if (!this.overlay.url) {
        this.$message.error('请输入覆盖物地址')
        return
      }
      this.deleteTemp()
      this.overlay.id = this.overlay?.id || DC.Util.uuid()
      if (this.layer.type === 'tileset') {
        global.viewerApi.addTileset(this.layer.id, this.overlay)
      }
      this.layer.children.push(this.overlay)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', undefined)
      this.$store.dispatch('SET_SELECTED_LAYER', undefined)
    },
    saveOverlay() {},
  },
  beforeUnmount() {
    this.deleteTemp()
  },
}
</script>

<style lang="scss" scoped>
.overlay-panel {
  padding: 10px 0;

  .attr_name {
    width: 40px !important;
  }

  .attr_setting {
    .icon {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
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
</style>

<template>
  <div class="panel scene-panel">
    <a-collapse v-model:activeKey="activeKey" accordion>
      <a-collapse-panel key="layer" header="图层管理">
        <template #extra
          ><svg-icon
            icon-class="layer"
            class-name="layer-icon"
            title="添加图层"
            @on-click="addLayer"
          ></svg-icon
        ></template>
        <layer-tree
          :list="layers"
          @change-layer-visible="changeLayerVisible"
          @del-layer="delLayer"
          @edit-layer="editLayer"
          @add-overlay="addOverlay"
          @change-overlay-visible="changeOverlayVisible"
          @locate-overlay="locateOverlay"
        />
      </a-collapse-panel>
      <a-collapse-panel key="location" header="视角管理">
        <template #extra
          ><svg-icon
            icon-class="view"
            class-name="icon"
            title="添加视角"
            @on-click="viewModalVisible = true"
          ></svg-icon
        ></template>
        <ul class="view-list">
          <li
            v-for="(view, viewIndex) in viewPositions"
            :key="'view-' + viewIndex"
          >
            <span>{{ view.name }}</span>
            <div class="tool-wrapper">
              <svg-icon
                icon-class="location"
                class-name="icon"
                @on-click="locatePosition(view.position)"
              ></svg-icon>
              <a-popover placement="bottom">
                <span class="tool">...</span>
                <template v-slot:content>
                  <a @click="delView(viewIndex)" class="tool-del">删除</a>
                </template>
              </a-popover>
            </div>
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="map" header="地图管理">
        <a-radio-group v-model:value="baseLayerId" @change="changeBaseLayer">
          <a-radio
            v-for="(baseLayer, index) in baseLayers"
            :value="baseLayer.id"
            :key="baseLayer.id"
            class="base-layer-radio"
          >
            <div class="base-layer-item">
              <span>{{ baseLayer.name }}</span>
              <a-popover
                placement="bottom"
                v-if="baseLayer.id === baseLayerId"
                class="tool-wrapper"
              >
                <span class="tool">...</span>
                <template v-slot:content>
                  <div>
                    <a @click="editBaseLayer(baseLayer)">编辑</a>
                    <a @click="delBaseLayer(index)" class="tool-del">删除</a>
                  </div>
                </template>
              </a-popover>
            </div>
          </a-radio>
        </a-radio-group>
      </a-collapse-panel>
      <a-collapse-panel key="flying" header="漫游路径"> </a-collapse-panel>
    </a-collapse>
    <a-modal
      v-model:visible="viewModalVisible"
      @ok="addView"
      :closable="false"
      cancelText="取消"
      okText="确定"
    >
      <template #title>
        <svg-icon icon-class="view" class-name="icon" />添加视角
      </template>
      <a-input v-model:value="viewName" placeholder="请输入名称"></a-input>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'ScenePanel',
  computed: {
    currentBaseLayer() {
      return this.$store.getters.currentBaseLayer
    },
    baseLayers() {
      return this.$store.getters.baseLayers || []
    },
    layers() {
      return this.$store.getters.layers || []
    },
    viewPositions() {
      return this.$store.getters.viewPositions || []
    },
  },
  data() {
    return {
      activeKey: 'layer',
      baseLayerId: '',
      viewModalVisible: false,
      viewName: '',
    }
  },
  methods: {
    changeBaseLayer() {
      this.baseLayers.forEach((item) => {
        item.selected = false
      })
      let baseLayer = this.baseLayers.filter(
        (item) => item.id === this.baseLayerId
      )[0]
      if (baseLayer) {
        baseLayer.selected = true
        global.viewerApi.addBaselayer(baseLayer).setBaseLayer(baseLayer)
        this.$store.dispatch('SET_CURRENT_BASE_LAYER', baseLayer)
      }
    },
    editBaseLayer(baseLayer) {
      this.$store.dispatch('SET_SELECTED_BASE_LAYER', baseLayer)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', {
        type: 'map',
        title: '地图配置',
      })
    },
    delBaseLayer(index) {
      global.viewerApi.removeBaseLayer()
      this.baseLayers.splice(index, 1)
      if (this.baseLayers.length === 0) {
        return
      }
      let baseLayer = this.baseLayers[0]
      baseLayer.selected = true
      this.baseLayerId = baseLayer.id
      global.viewerApi.addBaselayer(baseLayer).setBaseLayer(baseLayer)
      this.$store.dispatch('SET_CURRENT_BASE_LAYER', baseLayer)
    },
    addLayer() {
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', {
        type: 'layer',
        title: '图层配置',
      })
    },
    editLayer(layer) {
      this.$store.dispatch('SET_SELECTED_LAYER', layer)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', {
        type: 'layer',
        title: '图层配置',
      })
    },
    delLayer(layer, index) {
      if (layer) {
        global.viewerApi.removeLayer(layer.id)
        this.layers.splice(index, 1)
      }
    },
    changeLayerVisible(layer) {
      global.viewerApi.setLayerVisible(layer.id, layer.show)
      layer.children.forEach((item) => {
        item.show = layer.show
      })
    },
    addOverlay(layer) {
      this.$store.dispatch('SET_SELECTED_LAYER', layer)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', {
        type: 'overlay',
        title: '覆盖物配置',
      })
    },
    delOverlay(layer, overlayId, overlayIndex) {
      layer.children.splice(overlayIndex, 1)
      global.viewerApi.removeOverlay(layer.id, overlayId)
    },
    changeOverlayVisible(layerId, overlay) {
      global.viewerApi.setOverlayVisible(layerId, overlay)
    },
    locateOverlay(layerId, overlayId) {
      global.viewerApi.flyTo(layerId, overlayId)
    },
    addView() {
      let position = global.viewerApi.getCameraPosition()
      if (!this.viewName) {
        this.$message.error('请输入名称')
        return false
      }
      this.viewPositions.push({
        name: this.viewName,
        position,
      })
      this.viewModalVisible = false
      this.viewName = ''
    },
    delView(index) {
      this.viewPositions.splice(index, 1)
    },
    locatePosition(position) {
      global.viewerApi.flyToPosition(position)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.baseLayerId = this.currentBaseLayer?.id
      this.activeKey = this.$store.getters.selectedKey || 'layer'
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../../../themes/var.scss';
.scene-panel {
  .icon {
    color: $base-font-color;
    width: 14px;
    height: 14px;
  }
  .view-list {
    color: $base-font-color;
    li {
      position: relative;
      padding: 5px 8px 5px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tool-wrapper {
        display: flex;
        align-items: center;
        .icon {
          width: 12px;
          height: 12px;
          color: $base-font-color;
          cursor: pointer;
          margin-right: 8px;
        }
      }
    }
  }
  .base-layer-radio {
    display: flex;
    align-items: center;
    padding: 5px 8px 5px 30px;
    .base-layer-item {
      position: relative;
      width: 200px;
      color: $base-font-color;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .tool {
    font-size: 16px;
    color: $tool-font-color;
    font-weight: bold;
    transform: translateY(-3px);
    cursor: pointer;
  }
}
</style>

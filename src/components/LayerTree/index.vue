<template>
  <div class="layer-tree">
    <ul class="layer-list">
      <li
        v-for="(layer, layerIndex) in list"
        :key="'layer-' + layerIndex"
        class="layer-item"
      >
        <a-checkbox
          v-model:checked="layer.show"
          @change="changeLayerVisible(layer)"
          >{{ layer.name }}</a-checkbox
        >
        <div class="tool-wrapper">
          <svg-icon
            icon-class="location"
            class-name="icon"
            v-if="layer.type === 'geojson'"
          ></svg-icon>
          <svg-icon
            icon-class="model"
            class-name="icon"
            v-if="layer.type === 'tileset' || layer.type === 'vector'"
            @on-click="addOverlay(layer)"
          ></svg-icon>
          <a-popover placement="bottom">
            <span class="tool">...</span>
            <template v-slot:content>
              <div class="layer-popover">
                <a @click="editLayer(layer)">编辑</a>
                <a @click="delLayer(layer, layerIndex)" class="tool-del"
                  >删除</a
                >
              </div>
            </template>
          </a-popover>
        </div>
        <ul>
          <li
            v-for="(overlay, overlayIndex) in layer.children"
            :key="'overlay-' + overlayIndex"
          >
            <a-checkbox
              v-model:checked="overlay.show"
              @change="changeOverlayVisible(layer.id, overlay)"
              >{{ overlay.name }}</a-checkbox
            >
            <div class="tool-wrapper">
              <svg-icon
                icon-class="location"
                class-name="icon"
                @on-click="locateOverlay(layer.id, overlay.id)"
              ></svg-icon>
              <a-popover placement="bottom">
                <span class="tool">...</span>
                <template v-slot:content>
                  <div class="overlay-popover">
                    <a @click="editOverlay(layer.id, overlay)">编辑</a>
                    <a
                      @click="delOverlay(layer.id, overlay.id, overlayIndex)"
                      class="tool-del"
                      >删除</a
                    >
                  </div>
                </template>
              </a-popover>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LayerTree',
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    changeLayerVisible(layer) {
      this.$emit('change-layer-visible', layer)
    },
    editLayer(layer) {
      this.$emit('edit-layer', layer)
    },
    delLayer(layer, index) {
      this.$emit('del-layer', layer, index)
    },
    addOverlay(layer) {
      this.$emit('add-overlay', layer)
    },
    changeOverlayVisible(layerId, overlay) {
      this.$emit('change-overlay-visible', layerId, overlay)
    },
    locateOverlay(layerId, overlay) {
      this.$emit('locate-overlay', layerId, overlay)
    },
    editOverlay(layerId, overlay) {
      this.$emit('edit-overlay', layerId, overlay)
    },
    delOverlay(layerId, overlay, index) {
      this.$emit('del-overlay', layerId, overlay, index)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../themes/var.scss';
.layer-tree {
  width: 100%;
  .layer-list {
    color: $base-font-color;
    margin-bottom: 0;
    li.layer-item {
      position: relative;
      padding: 5px 8px 5px 30px;
      .tool-wrapper {
        position: absolute;
        right: 8px;
        top: 5px;
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
      ul {
        list-style: none;
        li {
          position: relative;
          padding-left: 25px;
          margin-top: 10px;
          .tool-wrapper {
            right: 1px;
          }
        }
      }
    }
  }
  .tool {
    font-size: 16px;
    color: #6064ff;
    font-weight: bold;
    transform: translateY(-3px);
    cursor: pointer;
  }
}
</style>

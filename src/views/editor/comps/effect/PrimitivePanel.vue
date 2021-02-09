<template>
  <div class="panel layer-panel">
    <div class="name_wrapper">
      <a-input v-model:value="layer.name" class="ipt"></a-input>
    </div>
    <div class="attr_wrapper">
      <div class="attr_title">属性</div>
      <div class="attr_content">
        <ul>
          <li>
            <span class="attr_name">ID</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_addr" v-model:value="layer.id"></a-input>
            </div>
          </li>
          <li>
            <span class="attr_name">类型</span>
            <div class="attr_setting">
              <a-select
                :disabled="layer.isEffect"
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
      </div>
      <div
        class="attr_title"
        v-if="layer.type !== 'tileset' && layer.type !== 'vector'"
      >
        覆盖物属性
      </div>
      <div
        class="attr_content"
        v-if="layer.type !== 'tileset' && layer.type !== 'vector'"
      >
        <ul>
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
      </div>
      <div class="attr_title" v-if="layer.type === 'primitive'">覆盖物坐标</div>
      <div class="attr_content" v-if="layer.type === 'primitive'">
        <ul>
          <li>
            <span class="attr_name">经度</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
            <span class="attr_name">纬度</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
          </li>
          <li>
            <span class="attr_name">高度</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
            <span class="attr_name">半径</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
          </li>
          <li>
            <span class="attr_name">随机</span>
            <div class="attr_setting">
              <a-checkbox v-model:checked="overlay.isRandom"></a-checkbox>
            </div>
          </li>
          <li v-if="overlay.isRandom">
            <span class="attr_name">范围</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
            <span class="attr_name">数量</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="attr_title"
        v-if="layer.type !== 'tileset' && layer.type !== 'vector'"
      >
        覆盖物材质
      </div>
      <div
        class="attr_content"
        v-if="layer.type !== 'tileset' && layer.type !== 'vector'"
      >
        <ul>
          <li>
            <span class="attr_name">类型</span>
            <div class="attr_setting">
              <a-select
                size="small"
                dropdownClassName="attr_dropdown"
                v-model:value="material.type"
                style="width: 200px"
                class="attr_select_type"
              >
                <a-select-option
                  class="attr_option"
                  v-for="item in materialTypes"
                  :key="item.type"
                  >{{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </li>
          <li>
            <span class="attr_name">颜色</span>
            <div class="attr_setting">
              <el-color-picker
                size="mini"
                show-alpha
                v-model="color"
                @change="changeColor"
              ></el-color-picker>
            </div>
          </li>
          <li v-show="material.colors.length">
            <div class="colors">
              <div
                class="color-item"
                v-for="(item, index) in material.colors"
                :style="{ background: item }"
                :key="'color-' + index"
              >
                <svg-icon
                  icon-class="close"
                  class-name="btn_close"
                  @on-click="removeColor(index)"
                ></svg-icon>
              </div>
            </div>
          </li>
          <li>
            <span class="attr_name">速度</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
            <span class="attr_name">随机</span>
            <div class="attr_setting">
              <a-checkbox v-model:checked="material.isRandom"></a-checkbox>
            </div>
          </li>
          <li
            v-if="
              material.type === 'polylineImageTrail' ||
              material.type === 'water'
            "
          >
            <span class="attr_name">图片</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_addr"></a-input>
            </div>
          </li>
          <li v-if="material.type === 'polylineImageTrail'">
            <span class="attr_name">重复</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
          </li>
          <li v-if="material.type === 'water'">
            <span class="attr_name">波纹数</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
            <span class="attr_name">频率</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
          </li>
          <li v-if="material.type === 'water'">
            <span class="attr_name">反射率</span>
            <div class="attr_setting">
              <a-input class="attr_ipt_number"></a-input>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="btns">
      <a-button @click="addLayer" v-if="mode === 'add'"
        ><svg-icon
          icon-class="add"
          class-name="icon"
          @on-click="addLayer"
        ></svg-icon
        >添加图层</a-button
      >
      <a-button @click="saveLayer" v-if="mode === 'edit'"
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
        isEffect: false,
        children: [],
      },
      overlay: {
        type: 'point',
        isRandom: false,
      },
      material: {
        type: '',
        colors: [],
        speed: '',
        isRandom: false,
      },
    }
  },
  computed: {
    layers() {
      return this.$store.getters.pro.layers || []
    },
  },
  methods: {
    changeColor(color) {
      this.material.colors.push(color)
    },
    removeColor(index) {
      this.material.colors.splice(index, 1)
    },
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
    saveLayer() {},
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('SET_SELECTED_KEY', 'layer')
    })
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
      .colors {
        margin: 10px 0;
        display: flex;
        flex-wrap: wrap;
        padding-left: 40px;
        .color-item {
          position: relative;
          width: 40px;
          height: 24px;
          padding: 2px;
          border: 1px solid #363742;
          margin-top: 5px;
          margin-right: 8px;
          .btn_close {
            position: absolute;
            cursor: pointer;
            width: 15px;
            height: 15px;
            right: -5px;
            top: -6px;
            display: none;
          }
          &:hover {
            .btn_close {
              display: block;
            }
          }
        }
      }
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

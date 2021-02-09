<template>
  <div class="material-picker">
    <div class="attr_title">{{ title }}</div>
    <ul class="attr_content">
      <li>
        <span class="attr_name">类型</span>
        <div class="attr_setting">
          <a-select
            size="small"
            dropdownClassName="attr_dropdown"
            :value="type"
            style="width: 200px"
            class="attr_select_type"
            @change="changeType"
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
      <li v-show="colors.length">
        <div class="colors">
          <div
            class="color-item"
            v-for="(item, index) in colors"
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
      <li v-if="type && type !== 'color'">
        <span class="attr_name">速度</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_number"
            :value="speed"
            @change="$emit('update:speed', $event.target.value)"
          ></a-input>
        </div>
        <span class="attr_name">随机</span>
        <div class="attr_setting">
          <a-checkbox
            :checked="isRandom"
            @change="$emit('update:isRandom', $event.target.checked)"
          ></a-checkbox>
        </div>
      </li>
      <li v-if="type === 'polylineImageTrail' || type === 'water'">
        <span class="attr_name">图片</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_addr"
            :value="url"
            @change="$emit('update:url', $event.target.value)"
          ></a-input>
        </div>
      </li>
      <li v-if="type === 'polylineImageTrail'">
        <span class="attr_name">重复</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_number"
            :value="repeat"
            @change="$emit('update:repeat', $event.target.value)"
          ></a-input>
        </div>
      </li>
      <li v-if="type === 'water'">
        <span class="attr_name">频率</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_number"
            :value="frequency"
            @change="$emit('update:frequency', $event.target.value)"
          ></a-input>
        </div>
        <span class="attr_name">速度</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_number"
            :value="animationSpeed"
            @change="$emit('update:animationSpeed', $event.target.value)"
          >
          </a-input>
        </div>
      </li>
      <li v-if="type === 'water'">
        <span class="attr_name">振幅</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_number"
            :value="amplitude"
            @change="$emit('update:amplitude', $event.target.value)"
          ></a-input>
        </div>
        <span class="attr_name">反射率</span>
        <div class="attr_setting">
          <a-input
            class="attr_ipt_number"
            :value="specularIntensity"
            @change="$emit('update:specularIntensity', $event.target.value)"
          ></a-input>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MaterialPicker',
  props: {
    title: String,
    types: Array,
    type: String,
    colors: Array,
    speed: Number,
    isRandom: Boolean,
    url: String,
    repeat: Number,
    frequency: Number,
    animationSpeed: Number,
    amplitude: Number,
    specularIntensity: Number,
  },
  data() {
    return {
      color: '',
      tempColors: [],
      materialTypes: this.types,
    }
  },
  methods: {
    changeType(type) {
      this.$emit('update:type', type)
    },
    changeColor(color) {
      this.tempColors.push(color)
      this.$emit('update:colors', this.tempColors)
    },
    removeColor(index) {
      this.tempColors.splice(index, 1)
      this.$emit('update:colors', this.tempColors)
    },
  },
}
</script>

<style lang="scss" scoped>
.material-picker {
  .attr_content {
    li {
      .colors {
        margin: 10px 0;
        display: grid;
        padding-left: 6px;
        grid-template-columns: repeat(5, 48px);
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

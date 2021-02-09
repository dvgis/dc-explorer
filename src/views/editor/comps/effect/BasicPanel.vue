<template>
  <div class="panel basic-panel">
    <div class="attr_wrapper">
      <a-collapse expandIconPosition="right" accordion>
        <a-collapse-panel key="bloom">
          <template #header>
            <svg-icon icon-class="bloom" class-name="icon" />
            泛光</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="bloom.enable"
                  @change="enableBloom"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">对比度</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="bloom.contrast"
                    :min="0"
                    :max="255"
                    :step="1"
                    class="slider"
                    @change="changeBloom"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">亮度</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="bloom.brightness"
                    :min="-5"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeBloom"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">Delta</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="bloom.delta"
                    :min="0"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeBloom"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">Sigma</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="bloom.sigma"
                    :min="0"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeBloom"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">stepSize</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="bloom.stepSize"
                    :min="0"
                    :max="10"
                    :step="1"
                    class="slider"
                    @change="changeBloom"
                  />
                </div>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="brightness">
          <template #header>
            <svg-icon icon-class="brightness" class-name="icon" />明亮</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="brightness.enable"
                  @change="enableBrightness"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">强度</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="brightness.intensity"
                    :min="0"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeBrightness"
                  />
                </div>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="depth_of_field">
          <template #header>
            <svg-icon
              icon-class="depth_of_field"
              class-name="icon"
            />景深</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="depthOfField.enable"
                  @change="enableDepthOfField"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">焦距</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="depthOfField.focalDistance"
                    :min="0"
                    :max="1000"
                    :step="1"
                    class="slider"
                    @change="changeDepthOfField"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">Delta</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="depthOfField.delta"
                    :min="0"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeDepthOfField"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">Sigma</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="depthOfField.sigma"
                    :min="0"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeDepthOfField"
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="attr_name">stepSize</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="depthOfField.stepSize"
                    :min="0"
                    :max="10"
                    :step="1"
                    class="slider"
                    @change="changeDepthOfField"
                  />
                </div>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="silhouette">
          <template #header>
            <svg-icon icon-class="silhouette" class-name="icon" />轮廓</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="silhouette.enable"
                  @change="enableSilhouette"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">颜色</span>
              <div class="attr_setting">
                <el-color-picker
                  size="mini"
                  show-alpha
                  v-model="silhouette.color"
                  @change="changeSilhouette"
                ></el-color-picker>
              </div>
            </li>
            <li>
              <span class="attr_name">长度</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="silhouette.length"
                    :min="0"
                    :max="5"
                    :step="0.1"
                    class="slider"
                    @change="changeDepthOfField"
                  />
                </div>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="black_and_white">
          <template #header>
            <svg-icon
              icon-class="black_and_white"
              class-name="icon"
            />黑白</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="blackAndWhite.enable"
                  @change="enableBlackAndWhite"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">级别</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="blackAndWhite.gradations"
                    :min="0"
                    :max="20"
                    :step="1"
                    class="slider"
                    @change="changeBlackAndWhite"
                  />
                </div>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="night">
          <template #header>
            <svg-icon icon-class="night" class-name="icon" />夜视</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="night.enable"
                  @change="enableNight"
                />
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="lens_flare">
          <template #header>
            <svg-icon
              icon-class="lens_flare"
              class-name="icon"
            />镜头耀斑</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="lensFlare.enable"
                  @change="enableLensFlare"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">强度</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="lensFlare.intensity"
                  :min="0"
                  :max="10"
                  :step="0.1"
                  class="slider"
                  @change="changeLensFlare"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">扭曲度</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="lensFlare.distortion"
                  :min="0"
                  :max="100"
                  :step="1"
                  class="slider"
                  @change="changeLensFlare"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">分散度</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="lensFlare.dirtAmount"
                  :min="0"
                  :max="10"
                  :step="0.01"
                  class="slider"
                  @change="changeLensFlare"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">光圈宽度</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="lensFlare.haloWidth"
                  :min="0"
                  :max="10"
                  :step="0.1"
                  class="slider"
                  @change="changeLensFlare"
                />
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="ao">
          <template #header>
            <svg-icon icon-class="ao" class-name="icon" />环境光遮蔽</template
          >
          <ul class="attr_content"></ul>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherPanel',
  data() {
    return {
      bloom: {
        enable: false,
        contrast: 128,
        brightness: -0.3,
        delta: 1,
        sigma: 3.8,
        stepSize: 5,
      },
      brightness: {
        enable: false,
        intensity: 1,
      },
      depthOfField: {
        enable: false,
        focalDistance: 87,
        delta: 1,
        sigma: 3.8,
        stepSize: 2.5,
      },
      silhouette: {
        enable: false,
        color: 'rgba(0,255,0,1)',
        length: 0.5,
      },
      blackAndWhite: {
        enable: false,
        gradations: 1,
      },
      night: {
        enable: false,
      },
      lensFlare: {
        enable: false,
        intensity: 2,
        distortion: 10,
        dirtAmount: 0.4,
        haloWidth: 0.4,
      },
    }
  },
  computed: {
    basic() {
      return this.$store.getters.effect.basic
    },
  },
  methods: {
    enableBloom(checked) {
      this.bloom.enable = checked
      this.changeBloom()
    },
    changeBloom() {
      global.viewerApi.setBasicEffect('bloom', this.bloom)
    },
    enableBrightness(checked) {
      this.brightness.enable = checked
      this.changeBrightness()
    },
    changeBrightness() {
      global.viewerApi.setBasicEffect('brightness', this.brightness)
    },
    enableDepthOfField(checked) {
      this.depthOfField.enable = checked
      this.changeDepthOfField()
    },
    changeDepthOfField() {
      global.viewerApi.setBasicEffect('depthOfField', this.this.depthOfField)
    },
    enableSilhouette(checked) {
      this.silhouette.enable = checked
      this.changeSilhouette()
    },
    changeSilhouette() {
      global.viewerApi.setBasicEffect('silhouette', this.silhouette)
    },
    enableBlackAndWhite(checked) {
      this.blackAndWhite.enable = checked
      this.changeBlackAndWhite()
    },
    changeBlackAndWhite() {
      global.viewerApi.setBasicEffect('black_and_white', this.blackAndWhite)
    },
    enableNight(checked) {
      this.night.enable = checked
      global.viewerApi.setBasicEffect('night', this.night)
    },
    enableLensFlare(checked) {
      this.lensFlare.enable = checked
      this.changeLensFlare()
    },
    changeLensFlare() {
      global.viewerApi.setBasicEffect('lens_flare', this.lensFlare)
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.basic.bloom) {
        this.bloom = this.basic.bloom
      }
    })
  },
  beforeUnmount() {},
}
</script>

<style lang="scss" scoped>
@import '../../../../themes/var';
.basic-panel {
  padding: 10px 0;
  .icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    color: #6f6ff5;
  }
  .attr_content {
    .attr_name {
      width: 50px !important;
    }
  }
}
</style>

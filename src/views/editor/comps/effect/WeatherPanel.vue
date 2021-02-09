<template>
  <div class="panel weather-panel">
    <div class="attr_wrapper">
      <a-collapse expandIconPosition="right" accordion>
        <a-collapse-panel key="cloud">
          <template #header>
            <svg-icon icon-class="cloud" class-name="icon" />
            云</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="cloud.enable"
                  @change="enableCloud"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">变化量</span>
              <div class="attr_setting">
                <div class="attr_setting">
                  <a-slider
                    v-model:value="cloud.rotateAmount"
                    :min="0"
                    :max="0.1"
                    :step="0.01"
                    class="slider"
                    @change="changeCloud"
                  />
                </div>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="fog">
          <template #header>
            <svg-icon icon-class="fog" class-name="icon" />
            雾</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="fog.enable"
                  @change="enableFog"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">距离</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="fog.far"
                  :min="0"
                  :max="20000"
                  :step="100"
                  class="slider"
                  @change="changeFog"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">颜色</span>
              <div class="attr_setting">
                <el-color-picker
                  size="mini"
                  show-alpha
                  v-model="fog.color"
                  @change="changeFog"
                ></el-color-picker>
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="rain">
          <template #header>
            <svg-icon icon-class="rain" class-name="icon" />
            雨</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="rain.enable"
                  @change="enableRain"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">速度</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="rain.speed"
                  :min="1"
                  :max="10"
                  :step="1"
                  class="slider"
                  @change="changeRain"
                />
              </div>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="snow">
          <template #header>
            <svg-icon icon-class="snow" class-name="icon" />
            雪</template
          >
          <ul class="attr_content">
            <li>
              <span class="attr_name">启用</span>
              <div class="attr_setting">
                <a-switch
                  size="small"
                  v-model:checked="snow.enable"
                  @change="enableSnow"
                />
              </div>
            </li>
            <li>
              <span class="attr_name">速度</span>
              <div class="attr_setting">
                <a-slider
                  v-model:value="snow.speed"
                  :min="1"
                  :max="10"
                  :step="1"
                  class="slider"
                  @change="changeSnow"
                />
              </div>
            </li>
          </ul>
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
      cloud: {
        enable: false,
        rotateAmount: 0.01,
      },
      fog: {
        enable: false,
        far: 2000,
        color: 'rgba(0,0,0,1)',
      },
      rain: {
        enable: false,
        speed: 2,
      },
      snow: {
        enable: false,
        speed: 2,
      },
    }
  },
  computed: {
    weather() {
      return this.$store.getters.effect.weather
    },
  },
  methods: {
    enableCloud(checked) {
      this.cloud.enable = checked
      this.changeCloud()
    },
    changeCloud() {
      global.viewerApi.setWeather('cloud', this.cloud)
    },
    enableFog(checked) {
      this.fog.enable = checked
      this.changeFog()
    },
    changeFog() {
      global.viewerApi.setWeather('fog', this.fog)
    },
    enableRain(checked) {
      this.rain.enable = checked
      this.changeRain()
    },
    changeRain() {
      global.viewerApi.setWeather('rain', this.rain)
    },
    enableSnow(checked) {
      this.snow.enable = checked
      this.changeSnow()
    },
    changeSnow() {
      global.viewerApi.setWeather('snow', this.snow)
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.weather.cloud) {
        this.cloud = this.weather.cloud
      }
      if (this.weather.fog) {
        this.fog = this.weather.fog
      }
      if (this.weather.rain) {
        this.rain = this.weather.rain
      }
      if (this.weather.snow) {
        this.snow = this.weather.snow
      }
    })
  },
  beforeUnmount() {
    let weather = {
      cloud: this.cloud,
      fog: this.fog,
      rain: this.rain,
      snow: this.snow,
    }
    this.$store.dispatch('SET_WEATHER', weather)
  },
}
</script>

<style lang="scss" scoped>
@import '../../../../themes/var';
.weather-panel {
  padding: 10px 0;
  .icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    color: #6f6ff5;
  }
  .attr_content {
    li {
      .attr_name {
        width: 50px !important;
      }
    }
  }
}
</style>

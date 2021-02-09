<template>
  <div class="list map-list">
    <div class="card-list">
      <a-card
        class="card"
        v-for="(map, index) in listData"
        :key="'map-' + index"
      >
        <img
          :src="map.preview || 'assets/images/map/default.png'"
          :title="map.name"
          :alt="map.name"
          @click="addBaseLayer(map)"
        />
        <p>{{ map.name }}</p>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapList',
  props: {
    listData: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    selectedData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    addBaseLayer(baseLayer) {
      this.$store.dispatch('SET_SELECTED_BASE_LAYER', baseLayer)
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', {
        type: 'map',
        title: '地图配置',
      })
      global.viewerApi.addBaselayer(baseLayer)
    },
  },
}
</script>

<style lang="scss" scoped>
.map-list {
}
</style>

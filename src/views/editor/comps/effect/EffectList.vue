<template>
  <div class="list effect-list">
    <div class="card-list">
      <a-collapse
        accordion
        expandIconPosition="right"
        default-active-key="base"
      >
        <a-collapse-panel
          v-for="effect in listData"
          :key="effect.type"
          :header="effect.name"
        >
          <a-card
            class="card"
            v-for="child in effect.children"
            :key="child.type"
          >
            <img
              :src="child.preview || 'assets/images/effect/default.png'"
              :title="child.name"
              :alt="child.name"
              @click="showPanel(child)"
            />
            <p>{{ child.name }}</p>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EffectList',
  props: {
    listData: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    showPanel(item) {
      this.$store.dispatch('SET_CURRENT_TOOL_PANEL', {
        type: item.panelType,
        title: item.panelTitle,
      })
      if (item.panelType === 'primitive') {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.effect-list {
}
</style>

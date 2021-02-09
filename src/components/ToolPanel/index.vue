<template>
  <div class="tool-panel">
    <div class="panel-title">{{ panelTitle }}</div>
    <div class="panel-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolPanel',
  props: {
    panelTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.tool-panel {
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 5;
  width: 280px;
  overflow: hidden;
  height: 100%;
  box-shadow: 2px 0 20px 5px rgb(0 0 0 / 50%);
  display: flex;
  flex-direction: column;
  background: #20212b;
  color: #b6b8cc;
  .panel-title {
    user-select: none;
    width: 100%;
    text-align: center;
    height: 36px;
    line-height: 36px;
    background: #2c2e3f;
  }

  .panel-wrapper {
    height: calc(100% - 36px);
    overflow: hidden;
  }
}
</style>

<template>
  <div class="preview">
    <div id="viewer-container" class="viewer-container"></div>
    <div class="back">
      <svg-icon
        icon-class="back"
        @on-click="goback"
        class-name="icon"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  data() {
    return {}
  },
  methods: {
    goback() {
      this.$router.push('/')
    },
    initViewer() {
      global.viewer = new DC.Viewer('viewer-container')
      viewer.use(new DC.Weather())
    },
  },
  mounted() {
    DC.ready(this.initViewer)
  },
}
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  position: relative;
  .viewer-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .back {
    position: absolute;
    width: 54px;
    height: 40px;
    bottom: 10px;
    right: 20px;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 4px;
    &:hover {
      background: rgba(0, 0, 0, 1);
    }
    .icon {
      width: 25px;
      height: 25px;
      color: #b6b8cc;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>

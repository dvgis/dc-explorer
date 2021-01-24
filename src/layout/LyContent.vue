<template>
  <div class="ly-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LyContent',
}
</script>

<style lang="scss" scoped>
.ly-content {
  position: absolute;
  top: 50px;
  width: 100%;
  min-height: 800px;
}
</style>

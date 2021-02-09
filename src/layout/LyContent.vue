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
  width: 100%;
  height: calc(100% - 50px);
}
</style>

<template>
  <div class="ly-footer">
    <div class="copyright">
      版权所有 &copy; 2019 - {{ new Date().getFullYear() }} 数字视觉(Digital
      Visual)
    </div>
  </div>
</template>

<script>
export default {
  name: 'LyFooter',
}
</script>

<style lang="scss" scoped>
.ly-footer {
  width: 100%;
  height: 50px;
  .copyright {
    padding-top: 14px;
    text-align: center;
    font-size: 14px;
    color: #3c3c46;
    a {
      color: #3c3c46;
    }
  }
}
</style>

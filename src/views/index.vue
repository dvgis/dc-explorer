<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script>
import UserApi from '@/api/UserApi'
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    async getUserInfo() {
      try {
        let userInfo = UserApi.getUserInfo()
        if (userInfo) {
          this.$store.dispatch('SET_TOKEN', userInfo.token)
          this.$store.dispatch('SET_PRO_COUNT', userInfo.proCount || 2)
          this.$store.dispatch('SET_PRO_LIST', userInfo.proList || [])
        } else {
          let token = UserApi.initUserInfo()
          this.$store.dispatch('SET_TOKEN', token)
          this.$store.dispatch('SET_PRO_COUNT', 2)
          this.$store.dispatch('SET_PRO_LIST', [])
        }
      } catch (e) {
        this.$message.error('获取用户信息失败')
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getUserInfo()
    })
  },
}
</script>

<style lang="scss">
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #131313;
}
</style>

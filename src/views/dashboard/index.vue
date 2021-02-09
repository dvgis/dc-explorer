<template>
  <div class="dashboard">
    <div class="title">三维场景构建工具 <sub>v 0.1.0</sub></div>
    <div class="wrapper">
      <div class="log bg-border">
        <div class="btns">
          <a-button class="btn_create" @click="openProModal">创建场景</a-button>
          <span>
            <a-button>本地</a-button>
            <a-button>在线</a-button>
          </span>
        </div>
      </div>
      <div class="pro-list bg-border">
        <div class="content">
          <div class="card-list">
            <a-card
              class="card"
              v-for="(proItem, proindex) in proList"
              :key="'location-' + proindex"
            >
              <div class="img-wrapper">
                <img :src="getPreviewImg(proItem)" />
              </div>
              <div class="mask"></div>
              <p>{{ proItem.name }}</p>
              <div class="icons">
                <svg-icon
                  icon-class="pro_preview"
                  class-name="icon"
                  title="查看场景"
                  @on-click="preview(proItem)"
                ></svg-icon>
                <svg-icon
                  icon-class="edit"
                  class-name="icon"
                  title="编辑场景"
                  @on-click="edit(proItem)"
                ></svg-icon>
                <svg-icon
                  icon-class="download"
                  class-name="icon"
                  title="下载场景"
                  @on-click="download(proItem)"
                ></svg-icon>
              </div>
              <a-popover placement="bottom">
                <span class="tool">...</span>
                <template v-slot:content>
                  <a @click="edit(proItem)">封面</a>
                  <a @click="share(proItem)">复制</a>
                  <a @click="del(proindex, proItem)" class="tool-del">删除</a>
                </template>
              </a-popover>
            </a-card>
          </div>
        </div>
      </div>
    </div>
    <ly-footer></ly-footer>

    <a-modal
      v-model:visible="proModalVisible"
      @ok="addPro"
      :closable="false"
      cancelText="取消"
      okText="确定"
    >
      <template #title>
        <svg-icon icon-class="view" class-name="icon" />添加场景
      </template>
      <a-input v-model:value="proName" placeholder="请输入名称"></a-input>
    </a-modal>
  </div>
</template>

<script>
import LyFooter from '@/layout/LyFooter'
import UserApi from '@/api/UserApi'
import ProApi from '@/api/ProApi'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'DashBoard',
  components: { SvgIcon, LyFooter },
  data() {
    return {
      proModalVisible: false,
      selectedPro: {},
      proName: '',
    }
  },
  computed: {
    token() {
      return this.$store.getters.token
    },
    proCount() {
      return this.$store.getters.proCount || 2
    },
    proList() {
      return this.$store.getters.proList || []
    },
  },
  methods: {
    getPreviewImg(pro) {
      if (pro.preview) {
        const HOME_PATH = process.env.HOME || process.env.USERPROFILE
        return `${HOME_PATH}/.dc-lab/preview/${pro.preview}`
      }
      return 'assets/images/preview/3D.png'
    },
    openProModal() {
      if (this.proCount <= this.proList.length) {
        this.$message.error('已达到场景创建上限')
        return
      }
      this.proModalVisible = true
    },
    addPro() {
      if (!this.proName) {
        this.$message.error('请输入场景名称')
        return
      }
      let pro = {
        name: this.proName,
        preview: '',
        fileName: `${new Date().getTime()}.dc`,
      }
      this.proList.push(pro)
      UserApi.saveUserInfo({
        token: this.token,
        proCount: this.proCount,
        proList: this.proList,
      })
      ProApi.createPro(pro)
      this.$message.success('场景创建成功')
      this.proName = ''
      this.proModalVisible = false
    },
    preview(pro) {
      this.$router.push(`/preview/${pro.fileName}`)
    },
    edit(pro) {
      this.$router.push(`/editor/${pro.fileName}`)
    },
    share(pro) {},
    del(index, pro) {
      this.proList.splice(index, 1)
      UserApi.saveUserInfo({
        token: this.token,
        proCount: this.proCount,
        proList: this.proList,
      })
      ProApi.removePro(pro)
    },
    download(pro) {},
  },
}
</script>

<style lang="scss" scoped>
@import '../../themes/var.scss';
.dashboard {
  width: 100%;
  height: 100%;
  .title {
    padding-top: 10px;
    padding-left: 20px;
    height: 70px;
    font-size: 20px;
    color: rgb(255, 255, 255);
    font-style: italic;
    user-select: none;
  }
  .wrapper {
    width: 100%;
    padding: 0 30px;
    height: calc(100% - 120px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .log {
      width: 300px;
      height: 100%;
    }
    .pro-list {
      width: calc(100% - 350px);
      height: 100%;
      padding: 2px 2px;
      overflow: hidden;
      .content {
        width: 100%;
        height: 100%;
        padding: 10px 10px;
        background: #191a1c;
        background-size: 100% 100%;
        .card-list {
          height: calc(100% - 50px);
          overflow: hidden;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(4, 25%);
          .card {
            height: 240px;
            p {
              text-align: left;
              line-height: 40px;
              padding-left: 10px;
            }
            .img-wrapper {
              width: 200px;
              height: 200px;
              display: flex;
              align-items: center;
              justify-content: space-around;
              background: #111;
              img {
                width: 60px;
                height: 60px;
              }
            }
            .mask {
              position: absolute;
              z-index: 10;
              background: rgba(0, 0, 0, 0.5);
              top: 0;
              width: 100%;
              height: 200px;
              visibility: hidden;
            }
            .icons {
              position: absolute;
              z-index: 20;
              width: 100%;
              top: 35%;
              display: flex;
              align-items: center;
              justify-content: space-around;
              visibility: hidden;
              .icon {
                color: $tool-font-color;
                width: 25px;
                height: 25px;
              }
            }
            .tool {
              position: absolute;
              z-index: 100;
              font-size: 20px;
              font-weight: bold;
              color: $tool-font-color;
              top: -8px;
              right: 8px;
            }
            &:hover {
              .icons,
              .mask {
                visibility: visible;
              }
            }
          }
        }
      }
    }
  }
}
</style>

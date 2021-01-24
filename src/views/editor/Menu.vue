<template>
  <div class="menu">
    <div class="menu-list">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="'menu-' + index"
          :class="{ active: currentMenu?.key === item.key }"
        >
          <svg-icon
            :icon-class="item.key"
            class-name="icon"
            @on-click="showPanel(item)"
            :title="item.label"
          ></svg-icon>
        </li>
      </ul>
    </div>
    <div class="menu-panel" :style="{ left: panelLeft + 'px' }">
      <div class="panel-title">{{ menuPanelTitle }}</div>
      <map-list
        class="panel-wrapper"
        v-if="currentMenu?.key === 'map'"
        :list-data="listData"
      ></map-list>
      <setting-panel
        class="panel-wrapper"
        v-if="currentMenu?.key === 'setting'"
      ></setting-panel>
    </div>
  </div>
</template>

<script>
import { menuData, mapData } from '@/config'
import MapList from './MapList'
import SettingPanel from './SettingPanel'

export default {
  name: 'Menu',
  components: { SettingPanel, MapList },
  data() {
    return {
      menuList: menuData,
      listData: [],
      currentMenu: null,
      menuPanelTitle: '',
    }
  },
  computed: {
    panelLeft() {
      if (
        !this.currentMenu ||
        this.currentMenu.key === 'scene' ||
        this.currentMenu.key === 'location' ||
        this.currentMenu.key === 'flying'
      ) {
        return -240
      }
      return 46
    },
  },
  methods: {
    showPanel(menu) {
      if (this.currentMenu && this.currentMenu.key === menu.key) {
        this.currentMenu = null
        this.listData = []
      } else {
        if (menu.key === 'map') {
          this.listData = mapData
        } else if (menu.key === 'terrain') {
          this.listData = mapData
        }
        this.menuPanelTitle = menu.label
        this.currentMenu = menu
      }
      this.$store.dispatch(
        'SET_CURRENT_TOOL_PANEL',
        ['scene', 'flying', 'location'].indexOf(this.currentMenu?.key) >= 0
          ? {
              type: this.currentMenu?.key,
              title: this.currentMenu?.panelTitle,
            }
          : undefined
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  .menu-list {
    width: 40px;
    height: calc(100% - 40px);
    background: #20212b;
    position: absolute;
    top: 40px;
    z-index: 2;
    ul {
      li {
        cursor: pointer;
        text-align: center;
        margin: 20px 0;
        padding: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-of-type(1) {
          margin-top: 30px;
        }
        &:nth-of-type(3) {
          border-bottom: 1px solid #363742;
        }
        &:nth-of-type(8) {
          border-top: 1px solid #363742;
        }
        &.active {
          background: rgba(111, 111, 245, 0.2);
          border-left: 2px solid rgb(96, 100, 255);
        }
        .icon {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .menu-panel {
    background: #20212b;
    position: absolute;
    top: 42px;
    z-index: 1;
    width: 240px;
    height: calc(100% - 50px);
    -webkit-transition: left 0.2s;
    transition: left 0.2s;
    border-radius: 4px;
    color: #b6b8cc;
    .panel-title {
      user-select: none;
      width: 100%;
      text-align: center;
      height: 36px;
      line-height: 36px;
      background: #2c2e3f;
      border-radius: 4px 4px 0 0;
    }
    .panel-wrapper {
      width: 100%;
      height: calc(100% - 36px);
      overflow: hidden;
    }
  }
}
</style>

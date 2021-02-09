/**
 * @Author: Caven
 * @Date: 2021-01-22 17:41:56
 */

const Menu = {
  state: () => ({
    currentMenu: null,
    currentToolPanel: null,
  }),
  mutations: {
    initMenu(state) {
      state.currentMenu = null
      state.currentToolPanel = null
    },
    setCurrentMenu(state, menu) {
      state.currentMenu = menu
    },
    setCurrentToolPanel(state, toolPanel) {
      state.currentToolPanel = toolPanel
    },
  },
  actions: {
    INIT_MENU: ({ commit }) => {
      commit('initMenu')
    },
    SET_CURRENT_MENU: ({ commit }, menu) => {
      commit('setCurrentMenu', menu)
    },
    SET_CURRENT_TOOL_PANEL: ({ commit }, toolPanel) => {
      commit('setCurrentToolPanel', toolPanel)
    },
  },
}

export default Menu

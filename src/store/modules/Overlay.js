/**
 * @Author: Caven
 * @Date: 2021-01-28 20:54:45
 */

const Overlay = {
  state: () => ({
    selectedOverlay: null,
  }),
  mutations: {
    initOverlay(state) {
      state.selectedOverlay = null
    },
    setSelectedOverlay(state, overlay) {
      state.selectedOverlay = overlay
    },
  },
  actions: {
    INIT_OVERLAY: ({ commit }) => {
      commit('initOverlay')
    },
    SET_SELECTED_OVERLAY: ({ commit }, overlay) => {
      commit('selectedOverlay', overlay)
    },
  },
}

export default Overlay

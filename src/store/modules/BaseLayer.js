/**
 * @Author: Caven
 * @Date: 2021-01-24 20:23:20
 */

const BaseLayer = {
  state: () => ({
    currentBaseLayer: null,
    selectedBaseLayer: null,
  }),
  mutations: {
    initBaseLayer(state) {
      state.currentBaseLayer = null
      state.selectedBaseLayer = null
    },
    setCurrentBaseLayer(state, baseLayer) {
      state.currentBaseLayer = baseLayer
    },
    setSelectedBaseLayer(state, baseLayer) {
      state.selectedBaseLayer = baseLayer
    },
  },
  actions: {
    INIT_BASE_LAYER: ({ commit }) => {
      commit('initBaseLayer')
    },
    SET_CURRENT_BASE_LAYER: ({ commit }, baseLayer) => {
      commit('setCurrentBaseLayer', baseLayer)
    },
    SET_SELECTED_BASE_LAYER: ({ commit }, baseLayer) => {
      commit('setSelectedBaseLayer', baseLayer)
    },
  },
}

export default BaseLayer

/**
 * @Author: Caven
 * @Date: 2021-01-24 20:23:16
 */

const Layer = {
  state: () => ({
    selectedLayer: null,
  }),
  mutations: {
    initLayer(state) {
      state.selectedLayer = null
    },
    setSelectedLayer(state, layer) {
      state.selectedLayer = layer
    },
  },
  actions: {
    INIT_LAYER: ({ commit }) => {
      commit('initLayer')
    },
    SET_SELECTED_LAYER: ({ commit }, layer) => {
      commit('setSelectedLayer', layer)
    },
  },
}

export default Layer

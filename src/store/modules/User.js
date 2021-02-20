/**
 * @Author: Caven
 * @Date: 2021-01-28 14:44:21
 */

const User = {
  state: () => ({
    token: '',
    proCount: 0,
    proList: [],
    selectedIndex: -1,
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setProList(state, proList) {
      state.proList = proList
    },
    setProCount(state, count) {
      state.proCount = count
    },
    setSelectedIndex(state, index) {
      state.selectedIndex = index
    },
  },
  actions: {
    SET_TOKEN: ({ commit }, token) => {
      commit('setToken', token)
    },
    SET_PRO_LIST: ({ commit }, proList) => {
      commit('setProList', proList)
    },
    SET_PRO_COUNT: ({ commit }, count) => {
      commit('setProCount', count)
    },
    SET_SELECTED_INDEX: ({ commit }, index) => {
      commit('setSelectedIndex', index)
    },
  },
}

export default User

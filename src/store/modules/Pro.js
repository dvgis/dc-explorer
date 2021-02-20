/**
 * @Author: Caven
 * @Date: 2021-01-22 17:36:19
 */

const Pro = {
  state: () => ({
    selectedKey: null,
    name: '',
    layers: [],
    baseLayers: [],
    viewPositions: [],
    terrain: {},
    effect: {
      basic: {},
      weather: {},
      postStage: {},
    },
    widgets: [],
    setting: {
      tdt_key: '',
      globe: {},
    },
  }),
  mutations: {
    initPro(state) {
      state.selectedKey = null
      state.name = ''
      state.layers = []
      state.baseLayers = []
      state.viewPositions = []
      state.terrain = {}
      state.effect = {
        basic: {},
        weather: {},
        postStage: {},
      }
      state.widgets = []
      state.setting = {
        tdt_key: '',
        globe: {},
      }
    },

    setSelectedKey(state, key) {
      state.selectedKey = key
    },

    setProName(state, name) {
      state.name = name
    },

    setLayers(state, layers) {
      state.layers = layers
    },

    setBaseLayers(state, baseLayers) {
      state.baseLayers = baseLayers
    },

    setTerrain(state, terrain) {
      state.terrain = terrain
    },

    setViewPositions(state, viewPositions) {
      state.viewPositions = viewPositions
    },

    setBasicEffect(state, basic) {
      state.effect.basic = basic
    },

    setProSetting(state, setting) {
      state.setting = setting
    },

    setWeather(state, weather) {
      state.effect.weather = weather
    },

    setPostStage(state, postStage) {
      state.effect.postStage = postStage
    },
    setWidgets(state, widgets) {
      state.widgets = widgets
    },
  },
  actions: {
    INIT_PRO: ({ commit }) => {
      commit('initPro')
    },
    SET_SELECTED_KEY: ({ commit }, key) => {
      commit('setSelectedKey', key)
    },
    SET_PRO_NAME: ({ commit }, name) => {
      commit('setProName', name)
    },
    SET_SCENE_SETTING: ({ commit }, setting) => {
      commit('setSceneSetting', setting)
    },
    SET_BASE_LAYERS: ({ commit }, baseLayers) => {
      commit('setBaseLayers', baseLayers)
    },
    SET_TERRAIN: ({ commit }, terrain) => {
      commit('setTerrain', terrain)
    },
    SET_LAYERS: ({ commit }, layers) => {
      commit('setLayers', layers)
    },
    SET_VIEW_POSITIONS: ({ commit }, viewPositions) => {
      commit('setViewPositions', viewPositions)
    },
    SET_BASIC_EFFECT: ({ commit }, basic) => {
      commit('setBasicEffect', basic)
    },
    SET_WEATHER: ({ commit }, weather) => {
      commit('setWeather', weather)
    },
    SET_POST_STAGE: ({ commit }, postStage) => {
      commit('setPostStage', postStage)
    },
    SET_WIDGETS: ({ commit }, widgets) => {
      commit('setWidgets', widgets)
    },
  },
}

export default Pro

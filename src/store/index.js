/**
 * @Author: Caven
 * @Date: 2021-01-22 17:38:55
 */

import { createStore } from 'vuex'

import User from './modules/User'
import Menu from './modules/Menu'
import Pro from './modules/Pro'
import BaseLayer from './modules/BaseLayer'
import Layer from './modules/Layer'
import Overlay from './modules/Overlay'
import getters from './getters'

const store = createStore({
  getters,
  modules: {
    User,
    Menu,
    BaseLayer,
    Pro,
    Layer,
    Overlay,
  },
})

export default store

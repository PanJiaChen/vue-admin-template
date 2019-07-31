import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import layout from './modules/layout'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    layout,
    settings,
    user
  },
  getters
})

export default store

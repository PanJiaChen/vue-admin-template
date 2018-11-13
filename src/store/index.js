import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...modules
  },
  getters
})

export default store

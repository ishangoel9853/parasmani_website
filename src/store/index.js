import Vue from 'vue'
import Vuex from 'vuex'

import actions from './modules/actions'
import state from './modules/state'
import mutations from './modules/mutations'
import getters from './modules/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})

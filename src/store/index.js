import Vue from 'vue'
import Vuex from 'vuex'


import 'beautify-scrollbar/dist/index.css';
import 'v2-table/dist/index.css';
import V2Table from 'v2-table';

import actions from './modules/actions'
import state from './modules/state'
import mutations from './modules/mutations'
import getters from './modules/getters'

Vue.use(Vuex)
Vue.use(V2Table)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})

import Vue from "vue";
import Vuex from "vuex";

import commonModule from './modules/common';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    commonModule
  }
})

export default store;

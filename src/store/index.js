import Vue from 'vue'
import Vuex from 'vuex'
import {dataService} from "../shared";
import {
  GET_MENUS,
} from "./mutation-types";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [],
  },
  mutations: {
    [GET_MENUS](state, menus) {
      state.menus = menus;
    },
  },
  actions: {
    async getMenusAction({ commit }) {
      const menus = await dataService.getMenus();
      commit(GET_MENUS, menus);
    },
  },
  modules: {
  }
})

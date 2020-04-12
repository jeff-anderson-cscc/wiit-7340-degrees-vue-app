import Vue from 'vue'
import Vuex from 'vuex'
import {dataService} from "../shared";
import {
  GET_MENUS, ADD_FLASH_MESSAGE, CLEAR_FLASH_MESSAGES, GET_CATEGORIES, GET_ITEMS,
    ADD_CATEGORY, UPDATE_CATEGORIES, DELETE_CATEGORY,
} from "./mutation-types";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [],
    categories: [],
    menuItems: [],
    flashMessages: [],
  },
  mutations: {
    [GET_MENUS](state, menus) {
      state.menus = menus;
    },
    [GET_CATEGORIES](state, categories) {
      state.categories = categories.sort((a, b) => a.id - b.id);
    },
    [GET_ITEMS](state, menuItems) {
      state.menuItems = menuItems.sort((a, b) => a.id - b.id);
    },
    [ADD_FLASH_MESSAGE](state, message) {
      state.flashMessages = [ { id: 0, message: message } ];
    },
    [CLEAR_FLASH_MESSAGES](state) {
      state.flashMessages = [];
    },
    [UPDATE_CATEGORIES](state, category) {
      const index = state.categories.findIndex(h => h.id === category.id);
      state.categories.splice(index, 1, category);
      state.categories = [...state.categories];
    },
    [ADD_CATEGORY](state, category) {
      state.categories.unshift(category);
    },
    [DELETE_CATEGORY](state, categoryId) {
      state.categories = [...state.categories.filter(p => p.id !== categoryId)];
    },
  },
  actions: {
    async getMenusAction({ commit }) {
      const menus = await dataService.getMenus();
      commit(GET_MENUS, menus);
    },
    async getCategoriesAction({ commit }) {
      const categories = await dataService.getCategories();
      commit(GET_CATEGORIES, categories);
    },
    async getMenuItemsAction({ commit }) {
      const menuItems = await dataService.getItems();
      commit(GET_ITEMS, menuItems);
    },
    clearFlashMessagesAction({ commit }) {
      commit(CLEAR_FLASH_MESSAGES);
    },
    setFlashMessageAction({commit}, message) {
      commit(ADD_FLASH_MESSAGE, message);
    },
    async updateCategoryAction({commit}, category) {
      commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
      const statusData = await dataService.updateCategory(category);
      if (statusData.statusCode === 204) {
        commit(ADD_FLASH_MESSAGE, "Category updated");
        commit(UPDATE_CATEGORIES, category);
      } else {
        commit(ADD_FLASH_MESSAGE, "Update failed: " + statusData.statusCode + " - " + statusData.statusMessage);
      }
    },
    async createCategoryAction({commit}, category) {
      commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
      const statusData = await dataService.createCategory(category);
      if (statusData.statusCode === 200 || statusData.statusCode === 201) {
        commit(ADD_FLASH_MESSAGE, "New category created");
        commit(ADD_CATEGORY, statusData.data)
      } else {
        commit(ADD_FLASH_MESSAGE, "Create failed: " + statusData.statusCode + " - " + statusData.statusMessage);
      }
    },
    async deleteCategoryAction({commit}, id) {
      commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
      const statusData = await dataService.deleteCategory(id);
      if (statusData.statusCode === 204) {
        commit(ADD_FLASH_MESSAGE, "Category deleted");
        commit(DELETE_CATEGORY, id);
      } else {
        commit(ADD_FLASH_MESSAGE, "Delete failed: " + statusData.statusCode + " - " + statusData.statusMessage);
      }
    },
  },
  modules: {
  },
  getters: {
    getFlashMessages: state => {return state.flashMessages},
    getCategoryById: state => id => state.categories.find(h => h.id === id),
  },
})

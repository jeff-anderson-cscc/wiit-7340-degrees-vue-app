import Vue from 'vue'
import Vuex from 'vuex'
import {dataService} from "../shared";
import {
  GET_MENUS, ADD_FLASH_MESSAGE, CLEAR_FLASH_MESSAGES, GET_CATEGORIES, GET_ITEMS,
    ADD_CATEGORY, UPDATE_CATEGORIES, DELETE_CATEGORY, ADD_MENU_ITEM, UPDATE_MENU_ITEM,
    DELETE_MENU_ITEM,
} from "./mutation-types";

Vue.use(Vuex);

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
      state.categories = state.categories.sort((a, b) => a.id - b.id);
    },
    [DELETE_CATEGORY](state, categoryId) {
      state.categories = [...state.categories.filter(p => p.id !== categoryId)];
    },
    [UPDATE_MENU_ITEM](state, menuItem) {
      const index = state.menuItems.findIndex(h => h.id === menuItem.id);
      state.menuItems.splice(index, 1, menuItem);
      state.menuItems = [...state.menuItems];
    },
    [ADD_MENU_ITEM](state, menuItem) {
      state.menuItems.unshift(menuItem);
      state.menuItems = state.menuItems.sort((a, b) => a.id - b.id);
    },
    [DELETE_MENU_ITEM](state, menuItemId) {
      state.menuItems = [...state.menuItems.filter(p => p.id !== menuItemId)];
    },
  },
  actions: {
    async getMenusAction({ commit }) {
      const menus = await dataService.getMenus();
      commit(GET_MENUS, menus);
    },
    async getCategoriesAction({ commit }) {
      if (this.state.categories.length === 0) {
        const categories = await dataService.getCategories();
        commit(GET_CATEGORIES, categories);
      }
    },
    async getMenuItemsAction({ commit }) {
      if (this.state.menuItems.length === 0) {
        const menuItems = await dataService.getItems();
        commit(GET_ITEMS, menuItems);
      }
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
    async updateMenuItemAction({commit}, menuItem) {
      commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
      const statusData = await dataService.updateMenuItem(menuItem);
      if (statusData.statusCode === 204) {
        commit(UPDATE_MENU_ITEM, menuItem);
        commit(ADD_FLASH_MESSAGE, "Menu item updated");
      } else {
        commit(ADD_FLASH_MESSAGE, "Update failed: " + statusData.statusCode + " - " + statusData.statusMessage);
      }
    },
    async createMenuItemAction({commit}, menuItem) {
      commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
      const statusData = await dataService.createMenuItem(menuItem);
      if (statusData.statusCode === 200 || statusData.statusCode === 201) {
        commit(ADD_FLASH_MESSAGE, "New menu item created");
        commit(ADD_MENU_ITEM, statusData.data)
      } else {
        commit(ADD_FLASH_MESSAGE, "Create failed: " + statusData.statusCode + " - " + statusData.statusMessage);
      }
    },
    async deleteMenuItemAction({commit}, id) {
      commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
      const statusData = await dataService.deleteMenuItem(id);
      if (statusData.statusCode === 204) {
        commit(ADD_FLASH_MESSAGE, "Menu item deleted");
        commit(DELETE_MENU_ITEM, id);
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

import * as axios from 'axios';
import { API } from './config';
import Vue from 'vue';

const statusDescriptions = new Map([
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [405, 'Method Not Allowed'],
    [409, 'Conflict'],
    [500, 'Internal Server Error'],
    [501, 'Not Implemented'],
    [502, 'Bad Gateway'],
    [503, 'Service Unavailable'],
    [504, 'Gateway Timeout'],
]);

const getMenus = async function() {
    try {
        const response = await axios.get(`${API}/public/api/menus`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

const getCategories = async function() {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.get(`${API}/api/menu/categories`, config);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

const getItems = async function() {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.get(`${API}/api/menu/items`,config);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

export const getCategoryById = async function (id) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.get(`${API}/api/menu/categories/${id}`, config);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

const updateCategory = async function (category) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.put(`${API}/api/menu/categories/${category.id}`, category, config);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const createCategory = async function (category) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.post(`${API}/api/menu/categories/`, category, config);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const deleteCategory = async function (id) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.delete(`${API}/api/menu/categories/${id}`, config);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

export const getMenuItemById = async function (id) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.get(`${API}/api/menu/items/${id}`, config);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

const createMenuItem = async function (menuItem) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.post(`${API}/api/menu/items/`, menuItem, config);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const updateMenuItem = async function (menuItem) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.put(`${API}/api/menu/items/${menuItem.id}`, menuItem, config);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const deleteMenuItem = async function (id) {
    try {
        let accessToken = await Vue.prototype.$auth.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await axios.delete(`${API}/api/menu/items/${id}`, config);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};



const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};

const handleError = function (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error.response) {
        // eslint-disable-next-line no-console
        console.log(error.response);
        if (error.response.statusText.length === 0 && statusDescriptions.has(error.response.status)) {
            error.response.statusText = statusDescriptions.get(error.response.status)
        }
        return {
            statusCode: error.response.status,
            statusMessage: error.response.statusText,
            data: error.response.body
        }
    } else {
        return {
            statusCode: 500,
            statusMessage: error.toString(),
            data: ""
        }
    }
};


export const dataService = {
    getMenus,
    getCategories,
    getItems,
    getCategoryById,
    updateCategory,
    createCategory,
    deleteCategory,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    createMenuItem,
};



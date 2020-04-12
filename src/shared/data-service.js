import * as axios from 'axios';
import { API } from './config';
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

        let data = parseList(response);

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

const getCategories = async function() {
    try {
        const response = await axios.get(`${API}/api/menu/categories`);

        let data = parseList(response);

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

const getItems = async function() {
    try {
        const response = await axios.get(`${API}/api/menu/items`);

        let data = parseList(response);

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

export const getCategoryById = async function (id) {
    try {
        const response = await axios.get(`${API}/api/menu/categories/${id}`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

const updateCategory = async function (category) {
    try {
        const response = await axios.put(`${API}/api/menu/categories/${category.id}`, category);
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
        const response = await axios.post(`${API}/api/menu/categories/`, category);
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
        const response = await axios.delete(`${API}/api/menu/categories/${id}`);
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
        const response = await axios.get(`${API}/api/menu/items/${id}`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
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
};



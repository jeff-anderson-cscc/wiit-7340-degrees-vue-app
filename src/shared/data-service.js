import * as axios from 'axios';
import { API } from './config';

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

const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};


export const dataService = {
    getMenus,
};



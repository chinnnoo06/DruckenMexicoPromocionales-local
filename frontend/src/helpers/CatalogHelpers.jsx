// helpers/catalogHelper.js
import { Fetch } from './Fetch';
import { Global } from './Global';

export const getProducts = async (category, page, isAdmin) => {
    if (isAdmin) {
        const data = await Fetch(`${Global.url}product/obtener-productos-admin/${category}/${page}`, "GET");
        return data;
    } else {
        const data = await Fetch(`${Global.url}product/obtener-productos/${category}/${page}`, "GET");
        return data;
    }
};

export const findProducts = async (category, query, page, isAdmin) => {
    if (isAdmin) {
        const data = await Fetch(`${Global.url}product/buscar-productos-admin/${category}/${query}/${page}`, "GET");
        return data;
    } else {
        const data = await Fetch(`${Global.url}product/buscar-productos/${category}/${query}/${page}`, "GET");
        return data;
    }
};

export const selectCategory = (setSearchCategory) => (value) => {
    setSearchCategory(value);
};

// helpers/catalogHelper.js
import { Fetch } from './Fetch';
import { Global } from './Global';

export const getProduct = async (id, isAdmin) => {

    if (isAdmin) {

        const data = await Fetch(`${Global.url}product/obtener-producto-admin/${id}`, "GET");
        return data;
    } else {
        const data = await Fetch(`${Global.url}product/obtener-producto/${id}`, "GET");
        return data;
    }


};


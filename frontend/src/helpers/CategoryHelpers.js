// helpers/catalogHelper.js
import { Fetch } from './Fetch';
import { Global } from './Global';

export const getCategorys = async () => {
    const data = await Fetch(`${Global.url}category/obtener-categorias`, "GET");
    return data;
};

export const addCategory = async (formData) => {
    const data = await Fetch(`${Global.url}category/crear-categoria`, "POST", formData);
    return data;
};

export const updateCategory = async (formData) => {
    const data = await Fetch(`${Global.url}category/actualizar-categoria`, "POST", formData);
    return data;
};

export const deleteCategory = async (categoryId) => {
    const data = await Fetch(`${Global.url}category/eliminar-categoria/` + categoryId, "DELETE");
    return data;
};
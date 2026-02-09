import { useState, useEffect } from "react";
import { Validation } from "../helpers/Validation";
import { Fetch } from "../helpers/Fetch";
import { Global } from "../helpers/Global";

export const useCategorys = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const fetchCategorys = async () => {
        setLoading(true);
        const data = await Fetch(`${Global.url}category/obtener-categorias`, "GET");

        if (data.status === "success") {
            setCategories(data.categories);
        }
        setLoading(false);
    };

    const fetchTotalCountProducts = async () => {
        setLoading(true);
        const data = await Fetch(`${Global.url}product/obtener-total`, "GET");

        if (data.status === "success") {
            setTotalCount(data.count)
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategorys();
        fetchTotalCountProducts();
    }, []);

    const saveCategory = async (e, formData, setAdding, setEditing, isEditing = false, idCategoryEdit = -1) => {

        e.preventDefault();
        setLoadingAction(true);

        const { errors } = Validation(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            setLoadingAction(false);
            return;
        }

        const dataToSend = { ...formData }; // clona el objeto

        let data;

        if (isEditing) {
            data = await Fetch(`${Global.url}category/actualizar-categoria/${idCategoryEdit}`, "POST", dataToSend);
            if (data.status === "success") {
                await fetchCategorys();
            }
            setEditing(false);
        } else {
            data = await Fetch(`${Global.url}category/crear-categoria`, "POST", dataToSend);
            if (data.status === "success") {
                await fetchCategorys();
            }
            setAdding(false);
        }


        setLoadingAction(false)
    }

    const removeCategory = async (categoryId, setShowModal) => {
        const data = await Fetch(`${Global.url}category/eliminar-categoria/${categoryId}`, "DELETE");

        if (data.status === "success") {
            setCategories(prev => prev.filter(cat => cat._id !== categoryId));
            setShowModal(false)
        }
    }

    return { totalCount, categories, loading, saveCategory, formErrors, setFormErrors, removeCategory, loadingAction };
};

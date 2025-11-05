import { useState, useEffect } from "react";
import { addCategory, deleteCategory, getCategorys, updateCategory } from "../helpers/CategoryHelpers";
import { Validation } from "../helpers/Validation";


export const useCategorys = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const fetchCategorys = async () => {
        setLoading(true);
        let data;

        data = await getCategorys();

        if (data.status === "success") {
            setCategories(data.categorys);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategorys();
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

        if (idCategoryEdit >= 0) {
            formData.append(idCategoryEdit);
        }


        const dataToSend = { ...formData }; // clona el objeto
        if (idCategoryEdit != -1) {
            dataToSend._id = idCategoryEdit;
        }

        let data;

        if (isEditing) {
            data = await updateCategory(dataToSend);
            if (data.status === "success") {
                await fetchCategorys();
            }
            setEditing(false);
        } else {
            data = await addCategory(dataToSend);
            if (data.status === "success") {
                await fetchCategorys();
            }
            setAdding(false);
        }


        setLoadingAction(false)
    }

    const removeCategory = async (categodyId, setShowModal) => {
        let data;

        data = await deleteCategory(categodyId);

        if (data.status === "success") {
            setCategories(prev => prev.filter(cat => cat._id !== categodyId));
            setShowModal(false)
        }
    }

    return { categories, loading, saveCategory, formErrors, setFormErrors, removeCategory, loadingAction };
};

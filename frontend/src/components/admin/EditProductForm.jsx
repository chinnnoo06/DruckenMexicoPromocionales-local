import React, { useState, useEffect } from 'react'
import { useFormProduct } from '../../hooks/useFormProduct';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { FormActionProduct } from './FormActionProduct';

export const EditProductForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const update = true;

    useEffect(() => {
        if (!location.state?.product) {
            navigate('/catalogo-admin', { replace: true });
        }
    }, [location, navigate]);

    const [colors, setColors] = useState(location.state.product.colors);
    const { formData, setFormData, manageChange } = useForm({
        _id: location.state.product._id,
        name: location.state.product.name,
        price: location.state.product.price,
        minQuantity: location.state.product.minQuantity,
        category: location.state.product.category,
        description: location.state.product.description,
        colors: location.state.product.colors
    })

    const { handleAddColor, handleRemoveColor, handleColorChange, sendProduct, formErrors, loading } = useFormProduct(colors, setColors, formData, setFormData, update)

    return (
        <FormActionProduct 
        handleAddColor={handleAddColor} handleRemoveColor={handleRemoveColor} handleColorChange={handleColorChange} sendProduct={sendProduct} 
        formErrors={formErrors} loading={loading} formData={formData} manageChange={manageChange} colors={colors} isEdit={true} />
    )
}

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

    // Inicializamos colors solo con color y hex, image vacío
    const initialColors = location.state.product.colors.map(c => ({
        color: c.color,
        hex: c.hex,
        image: '' // obliga a subir nueva imagen
    }));

    const [colors, setColors] = useState(initialColors);

    const { formData, setFormData, manageChange } = useForm({
        _id: location.state.product._id,
        name: location.state.product.name,
        key: location.state.product.key,
        description: location.state.product.description,
        colors: initialColors, // usamos initialColors
        printingTechnique: location.state.product.printingTechnique,
        material: location.state.product.material,
        measures: location.state.product.measures,
        printingMeasures: location.state.product.printingMeasures,
        category: location.state.product.category,
        price: location.state.product.price,
        minQuantity: location.state.product.minQuantity,
        generalImage: '' // obliga a subir nueva imagen general
    });


    const { handleAddColor, handleRemoveColor, handleColorChange, handleImageChange, sendProduct, formErrors, loading } = useFormProduct(colors, setColors, formData, setFormData, update)

    return (
        <FormActionProduct
            handleAddColor={handleAddColor} handleRemoveColor={handleRemoveColor} handleColorChange={handleColorChange} handleImageChange={handleImageChange} sendProduct={sendProduct}
            formErrors={formErrors} loading={loading} formData={formData} manageChange={manageChange} colors={colors} isEdit={true} />
    )
}

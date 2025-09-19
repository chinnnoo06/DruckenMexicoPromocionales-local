import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFormProduct } from '../../hooks/useFormProduct';
import { FormActionProduct } from './FormActionProduct';

export const AddProductForm = () => {
  const [colors, setColors] = useState([{ color: '', hex: '', image: '' }]);
  const { formData, setFormData, manageChange } = useForm({
    name: '',
    key: '',
    description: '',
    colors: [{ color: '', hex: '', image: '' }],
    printingTechnique: '',
    material: '',
    measures: '',
    printingMeasures: '',
    category: '',
    price: '',
    minQuantity: 1,
    generalImage: ''
  })

  const { handleAddColor, handleRemoveColor, handleColorChange, handleImageChange, sendProduct, formErrors, loading } = useFormProduct(colors, setColors, formData, setFormData)

  return (
    <FormActionProduct
      handleAddColor={handleAddColor} handleRemoveColor={handleRemoveColor} handleColorChange={handleColorChange}  handleImageChange={handleImageChange} sendProduct={sendProduct}
      formErrors={formErrors} loading={loading} formData={formData} manageChange={manageChange} colors={colors} />
  );
};

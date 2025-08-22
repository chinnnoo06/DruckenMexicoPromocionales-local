import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFormProduct } from '../../hooks/useFormProduct';
import { FormActionProduct } from './FormActionProduct';

export const AddProductForm = () => {
  const [colors, setColors] = useState([{ color: '', hex: '', image: '' }]);
  const { formData, setFormData, manageChange } = useForm({
    name: '',
    price: '0.00',
    minQuantity: 1,
    category: '',
    description: '',
    colors: [{ color: '', hex: '', image: '' }]
  })

  const { handleAddColor, handleRemoveColor, handleColorChange, sendProduct, formErrors, loading } = useFormProduct(colors, setColors, formData, setFormData)

  return (
    <FormActionProduct
      handleAddColor={handleAddColor} handleRemoveColor={handleRemoveColor} handleColorChange={handleColorChange} sendProduct={sendProduct}
      formErrors={formErrors} loading={loading} formData={formData} manageChange={manageChange} colors={colors} />
  );
};

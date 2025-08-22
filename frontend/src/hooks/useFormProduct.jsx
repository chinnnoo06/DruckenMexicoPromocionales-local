import React, { useState } from 'react'
import { Fetch } from '../helpers/Fetch';
import { Global } from '../helpers/Global';
import { Validation } from '../helpers/Validation';

export const useFormProduct = (colors, setColors, formData, setFormData, update = false) => {
  const [formErrors, setFormErrors] = useState([])
  const [loading, setLoading] = useState(false);

  const handleAddColor = () => {
    const newColors = [...colors, { color: '', hex: '', image: '' }];
    setColors(newColors);
    setFormData({ ...formData, colors: newColors });
  };

  const handleRemoveColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    setFormData({ ...formData, colors: newColors });
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
    setFormData({ ...formData, colors: newColors });
  };


  const sendProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { errors } = Validation(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    // Crear FormData
    const form = new FormData();
    form.append("data", JSON.stringify(formData));

    formData.colors.forEach((color) => {
      if (color.image) {
        form.append("colorImages", color.image); // TODOS con mismo fieldname
      }
    });

    if (update) {
      const data = await Fetch(`${Global.url}product/actualizar-producto`, "POST", form);

      if (data.status === "success") {
        alert("Producto actualizado correctamente");
      } else {
        alert("Producto no actualizado, hubo un error");
      }
    } else {
      const data = await Fetch(`${Global.url}product/crear-producto`, "POST", form);

      if (data.status === "success") {
        alert("Producto agregado correctamente");
      } else {
        alert("Producto no agregado, hubo un error");
      }
    }

    setLoading(false);

  };

  return {
    handleAddColor,
    handleColorChange,
    handleRemoveColor,
    sendProduct,
    formErrors,
    loading
  }
}

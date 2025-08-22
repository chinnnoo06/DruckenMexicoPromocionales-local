import React, { useState } from 'react'
import { Validation } from '../helpers/Validation';

export const useFormContact = (formData, setFormData) => {
    const [formErrors, setFormErrors] = useState([])

    const sendMessage = (e) => {
        e.preventDefault();

        const { errors } = Validation(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const phoneNumber = "3310168320";
        const tittle = `*${formData.tittle}*`;
        const greeting = `Hola buen día, soy ${formData.name}, visité el sitio web de Drucken México Promocionales.`;
        const message = formData.message;

        // Codificar para URL
        const encodedMessage = encodeURIComponent(`${tittle}\n\n${greeting}\n\n${message}`);

        // Crear URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abrir en nueva pestaña
        window.open(whatsappUrl, "_blank");

        setFormData({
            tittle: '',
            name: '',
            message: ''
        });

    }


    return {
        formErrors,
        sendMessage
    }
}

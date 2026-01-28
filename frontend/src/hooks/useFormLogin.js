import React, { useState } from 'react'
import { Fetch } from '../helpers/Fetch';
import { Global } from '../helpers/Global';
import { Validation } from '../helpers/Validation';
import { useNavigate } from 'react-router-dom';

export const useFormLogin = (formData) => {
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const sendForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { errors } = Validation(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const cleanForm = {
            username: formData.username.trim(),
            password: formData.password.trim()
        };

        const data = await Fetch(`${Global.url}user/login`, "POST", cleanForm);

        if (data.status === "success") {
            setSuccess(true);
            setMessage("");
        } else {
            setMessage(data.mensaje)
        }

        setLoading(false);

    };

    return {
        passwordVisibility,
        sendForm,
        message,
        showPassword,
        formErrors,
        loading,
        success
    }
}

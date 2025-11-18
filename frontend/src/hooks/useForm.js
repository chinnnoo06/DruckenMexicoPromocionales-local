import { useState } from 'react'

export const useForm = (initialValues = {}) => {
    const [formData, setFormData] = useState(initialValues)

    const manageChange = ({ target }) => {
        const { name, value, type } = target;

        setFormData({
            ...formData,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        });
    }

    return {
        formData,
        setFormData,
        manageChange
    }
}

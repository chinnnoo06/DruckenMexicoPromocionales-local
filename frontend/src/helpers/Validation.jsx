export const Validation = (data) => {
    const errors = {};

    const validate = (obj, path = '') => {

        if (obj instanceof File) {
            // Solo validar si existe, no entrar dentro del objeto
            if (!obj) {
                errors[path] = 'Este campo es obligatorio';
            }
            return;
        }

        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            for (const key in obj) {
                // Añadimos esta condición para ignorar generalImage si hay un solo color
                if (key === 'generalImage' && data.colors && data.colors.length <= 1) {
                    continue;
                }
                validate(obj[key], path ? `${path}.${key}` : key);
            }
        } else if (Array.isArray(obj)) {
            obj.forEach((item, idx) => {
                validate(item, `${path}[${idx}]`);
            });
        } else {
            if (!obj || obj.toString().trim() === '') {
                errors[path] = 'Este campo es obligatorio';
            }
        }
    }

    validate(data);

    return { errors };
}

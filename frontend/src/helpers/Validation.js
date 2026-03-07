export const Validation = (data) => {
    const errors = {};

    const colorRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

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
                 return;
            }

            if (/^colors\[\d+\]\.color$/.test(path)) {
                if (!colorRegex.test(obj)) {
                    errors[path] = "El nombre del color solo puede contener letras";
                }
            }

        }
    }

    validate(data);

    return { errors };
}

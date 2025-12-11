export const Fetch = async (url, meth, information) => {
    let options = {
        method: meth,
        credentials: "include",
    };

    if (meth === "POST" || meth === "PUT") {
        if (information instanceof FormData) {
            // Si es FormData, enviamos tal cual, sin headers
            options.body = information;
        } else {
            // Si es objeto normal, enviamos JSON
            options.body = JSON.stringify(information);
            options.headers = {
                "Content-Type": "application/json",
            };
        }
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

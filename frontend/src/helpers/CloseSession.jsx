import { Fetch } from "./Fetch";
import { Global } from "./Global";

export const closeSession = async () => {
    try {
        const data = await Fetch(`${Global.url}user/logout`, "POST"); 

        if (data.status === "success") {
            window.location.href = "/inicio";
        } else {
            alert("No se pudo cerrar sesión");
        }
    } catch (error) {
        console.error("Error cerrando sesión:", error);
        alert("Error al cerrar sesión");
    }

};

import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom"; 
import { HeaderAdmin } from "./HeaderAdmin";
import { FooterAdmin } from "./FooterAdmin";
import { Global } from "../../helpers/Global";
import { Fetch } from "../../helpers/Fetch";

export const AdminLayout = () => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
       const data = await Fetch(`${Global.url}user/check`, "GET");

        if (data.status === "success") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  // Mientras validamos la sesión, mostramos algo neutro
  if (checking) {
    return <p className="text-center mt-20">Verificando sesión...</p>;
  }

  // Si no está autorizado → redirigir a inicio
  if (!authorized) {
    alert("Debes iniciar sesión para acceder a este sitio");
    return <Navigate to="/inicio" replace />;
  }

  // Si está autorizado → renderizar layout completo
  return (
    <>
      <HeaderAdmin />
      <section id="content" className="content">
        <Outlet /> 
      </section>
      <FooterAdmin />
    </>
  );
};

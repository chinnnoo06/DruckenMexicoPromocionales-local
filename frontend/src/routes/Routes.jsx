import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Catalog } from "../pages/Catalog";
import { Error } from "../pages/Error";
import { Privacy } from "../pages/Privacy";
import { Terms } from "../pages/Terms";
import { Order } from "../pages/Order";
import { Product } from "../pages/Product";
import { LoginAdmin } from "../pages/LoginAdmin";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AddProduct } from "../pages/AddProduct";
import { EditProduct } from "../pages/EditProduct";
import { CategorysAdmin } from "../pages/CategorysAdmin";

export const MainRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas con Header/Footer */}
      <Route
        element={<DefaultLayout />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/pedido" element={<Order />} />
        <Route path="/producto/:id" element={<Product />} />
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/terminos" element={<Terms />} />
        
      </Route>

      <Route path="*" element={<Error />} />

      <Route path="/login-admin" element={<LoginAdmin />} />

      <Route
        element={<AdminLayout />}
      >
        <Route path="/catalogo-admin" element={<Catalog/>} />
        <Route path="/producto-admin" element={<Product/>} />
        <Route path="/agregar-producto-admin" element={<AddProduct/>} />
        <Route path="/editar-producto-admin" element={<EditProduct/>} />
        <Route path="/categorias-admin" element={<CategorysAdmin/>} />
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/terminos" element={<Terms />} />
      </Route>


    </Routes>
  );
};

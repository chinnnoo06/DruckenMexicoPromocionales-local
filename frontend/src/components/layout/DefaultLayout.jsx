import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom"; 

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <section id="content" className="content">
        <Outlet /> 
      </section>
      <Footer />
    </>
  );
};

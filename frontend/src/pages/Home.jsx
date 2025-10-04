import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper'
import '../styles/home.css'
import { HomeProductsCarousel } from '../components/home/HomeProductsCarousel';
import { HomeMainContent } from '../components/home/HomeMainContent';
import { About } from './About';
import { OurServices } from './OurServices';
import { Contact } from './Contact';

export const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Sección Hero */}
      <div id="inicio" className="hero-container mt-0">
        <SectionWrapper className="container-main-content home-content flex min-h-screen justify-center items-center gap-10 mx-auto max-w-[1300px] pt-20 lg:pt-0 ">
          <HomeMainContent />
        </SectionWrapper>
      </div>


      {/* Sección Productos */}
      <SectionWrapper>
        <div className='tittle-section flex justify-between items-center'>
          <h2 className='text-[#9F531B] titulo-seccion font-bold text-[32px] sm:text-[37px] md:text-[40px] lg:text-[45px] mb-6  relative inline-block '>
            Productos Para ti
            <span className="absolute left-0 bottom-[-6px] w-20 h-1 bg-[#9F531B] rounded-full"></span>
          </h2>
        </div>
        <HomeProductsCarousel />
      </SectionWrapper>

      {/* Sección Nosotros */}
      <section id="nosotros" className=" bg-gray-50">
        <About />
      </section>

      {/* Sección Servicios */}
      <section id="servicios">
        <OurServices />
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className=" bg-gray-50">
        <Contact />
      </section>
    </>
  );
}

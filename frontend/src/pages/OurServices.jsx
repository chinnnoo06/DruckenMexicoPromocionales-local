import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper'
import serigrafia from '../assets/images_services/serigrafia.jpg';
import tampografia from '../assets/images_services/tampografia.jpg';
import subliminado from '../assets/images_services/subliminado.jpg';
import esmaltado2D from '../assets/images_services/esmaltado2D.jpg';

import grabadoLaser from '../assets/images_services/grabadoLaser.jpg';
import bordado from '../assets/images_services/bordado.jpg';
import rotulosPublicitarios from '../assets/images_services/rotulosPublicitarios.jpg';
import diseñosEspeciales3D from '../assets/images_services/diseñosEspeciales3D.jpg';
import impresionDTFTextil from '../assets/images_services/impresionDTFTextil.jpg';
import { MapServices } from '../components/ourServices/MapServices';

export const OurServices = () => {

  const services = [
    {
      id: 1,
      name: "Serigrafía",
      description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
      image: serigrafia
    },
    {
      id: 2,
      name: "Tampografía",
      description: "Si tu promocional tiene superficies irregulares, cilíndricas, esféricas, ángulos compuestos, texturas, superficies cóncavas, convexas o es un artículo blando, esta es la técnica ideal.",
      image: tampografia
    },
    {
      id: 3,
      name: "Subliminado",
      description: "Transfiere tus diseños en full color en tazas, reconocimientos, gorras, playeras, mochilas y cualquier tipo de textiles en una alta resolución, gran calidad y colorido.",
      image: subliminado
    },
    {
      id: 4,
      name: "ESMALTADOS 2D",
      description: "Imprime a todo color, con corte a la medida y gran durabilidad gracias a nuestras resinas de alta resitencia.",
      image: esmaltado2D
    },
    {
      id: 5,
      name: "Grabado Laser",
      description: "Da ese acabado elegante plasmando tu logo en una gran variedad de materiales como metales, orgánicos, madera, corcho, etc.",
      image: grabadoLaser
    },
    {
      id: 6,
      name: "Bordado",
      description: "Plasma tu logo con una de nuestra gran gama de Polisedas, es ideal para playeras, gorras, mochilas, cangureras u otros textiles.",
      image: bordado
    },
    {
      id: 7,
      name: "Rótulos Publicitarios",
      description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
      image: rotulosPublicitarios
    },
    {
      id: 8,
      name: "Diseños Especiales 3D",
      description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
      image: diseñosEspeciales3D
    },
    {
      id: 9,
      name: "Impresión DTF Textil",
      description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
      image: impresionDTFTextil
    }
  ]

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SectionWrapper>
        <div className="text-center mb-8">
          <h2 className='text-[#9F531B] font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
            Nuestros Servicios
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
          </h2>
          <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
            Ofrecemos una amplia variedad en acabados, grabados y tipos de impresión para los artículos promocionales, 
            de acuerdo a las necesidades requeridas:
          </p>
        </div>

        <MapServices services={services}/>

      </SectionWrapper>
    </>
  );
}

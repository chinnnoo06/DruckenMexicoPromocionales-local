import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';

export const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWrapper>
      <div className="text-center mb-8">
        <h2 className='text-[#9F531B] titulo-seccion font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
          Contactanos
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
        </h2>
        <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
          Estamos listos para escuchar tus ideas y hacerlas realidad
        </p>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-stretch'>
        <ContactForm />
        <ContactInfo />
      </div>


    </SectionWrapper>
  );
}
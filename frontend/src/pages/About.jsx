import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { ContentAbout } from '../components/about/ContentAbout';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWrapper>
  
        <div className="text-center mb-8">
          <h2 className='text-[#9F531B] titulo-seccion font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
            Sobre nosotros
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
          </h2>
          <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
            Conoce nuestra visión y misión que nos impulsan a ser líderes en el mercado promocional.
          </p>
        </div>

        <ContentAbout/>
      
    </SectionWrapper>
  );
}
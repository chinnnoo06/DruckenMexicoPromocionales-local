import React from 'react'
import { Link } from 'react-router-dom';
import DruckenLogo from '../../assets/logodrucken.png';
import SplitText from "../layout/SplitText";

export const HomeMainContent = () => {

    const scrollToSection = () => {
        const element = document.getElementById("contacto");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className='col1 flex flex-col'>
                {/* Badge de empresa */}
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-[#9F531B]/10 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 w-fit">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#9F531B] rounded-full animate-pulse"></div>
                    <span className="text-[#9F531B] font-semibold text-xs sm:text-sm md:text-base">Empresa Mexicana desde 2016</span>
                </div>
                <div className='text-container  '>
                    <SplitText
                        text="Drucken México Promocionales"
                        className="text-[#9F531B] font-extrabold text-[32px] sm:text-[37px] md:text-[40px] lg:text-[45px]"
                        delay={50}
                        duration={0.3}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="start"
                    />
                    <h3 className='text-[#1A1615] font-semibold text-[17px] sm:text-[19px] md:text-[22px] lg:text-[25px]'>
                        Promociona con impacto, vende con resultados.
                    </h3>
                    <span className='text-[#1A1615] text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-medium mt-2 block '>
                        Drucken es una empresa mexicana dedicada a la distribución de artículos promocionales, desde el año 2016 contamos
                        con un equipo de trabajo preparado, comprometido y responsable, que busca brindarle el mejor servicio
                        y las mejores alternativas de marketing promocional.
                    </span>
                </div>

                <div className='butons-container flex flex-wrap gap-4 pt-4'>
                    <Link to="/catalogo" className='no-underline'>
                        <button className='px-3.5 py-1 text-sm md:px-5 md:py-2 md:text-lg bg-[#9F531B] text-[#EEEEEF] rounded-xl hover:bg-[#7C3E13]  hover:text-[#EEEEEF] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1'>
                            <span>Ver Catálogo</span>
                        </button>
                    </Link>


                    <button onClick={scrollToSection} className='px-3.5 py-1 text-sm md:px-5 md:py-2 md:text-lg bg-[#9F531B] text-[#EEEEEF] rounded-xl hover:bg-[#7C3E13]  hover:text-[#EEEEEF] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1'>
                        Contactar
                    </button>
            

                </div>

                <div className='socialMedia-container flex gap-4 pt-4 text-lg sm:text-xl md:text-2xl'>
                    <a href='https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr' target='_blank' rel='noopener noreferrer' className='text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3'><i className='fab fa-facebook'></i></a>
                    <a href='https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5' target='_blank' rel='noopener noreferrer' className='text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3'><i className='fab fa-instagram'></i></a>
                    <a href='https://wa.me/523315876207' target='_blank' rel='noopener noreferrer' className='text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3'><i className='fab fa-whatsapp'></i></a>
                </div>
            </div>

            <div className='col2 w-full max-w-[350px] lg:max-w-[600px] xl:max-w-[650px] relative'>
                <div className='relative group'>
                    <img
                        src={DruckenLogo}
                        alt='Logo Drucken México'
                        className='w-full h-auto object-contain transition-all duration-700 group-hover:scale-x-100 group-hover:rotate-2'
                    />
                </div>

            </div>
        </>
    )
}

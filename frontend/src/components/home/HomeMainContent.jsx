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
            <div className='col1 flex flex-col sm:mt-20'>
                {/* Badge de empresa */}
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-[#9F531B]/10 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 w-fit relative overflow-hidden group">
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9F531B]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#9F531B] rounded-full animate-pulse relative">
                        {/* Anillo animado alrededor del punto */}
                        <div className="absolute inset-0 rounded-full border border-[#9F531B] animate-ping opacity-20"></div>
                    </div>
                    <span className="text-[#9F531B] font-semibold text-xs sm:text-sm md:text-base relative z-10">
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            Empresa Mexicana desde 2016
                        </span>
                    </span>
                </div>
                <div className='text-container'>
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
                    <h3 className='text-[#1A1615] font-semibold text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] '>
                        Promociona con impacto, vende con resultados.
                    </h3>
                    <span className='text-[#9F531B] text-[17px] sm:text-[19px] md:text-[20px] lg:text-[21px] font-medium mt-2 block relative pl-[15px] border-l-2 border-[#9F531B]/20'>
                        
                        <span className="absolute left-[2px] top-0 text-[#9F531B] opacity-40 text-base sm:text-lg">❝</span>
                        Drucken es una empresa mexicana dedicada a la distribución de artículos promocionales, desde el año 2016 contamos
                        con un equipo de trabajo preparado, comprometido y responsable, que busca brindarle el mejor servicio
                        y las mejores alternativas de marketing promocional.
                    </span>
                    
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[#9F531B]/10">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl sm:text-3xl font-bold text-[#9F531B]">+9</span>
                            <span className="text-xs sm:text-sm text-[#1A1615] opacity-80">Años</span>
                        </div>
                        <div className="h-8 w-px bg-[#9F531B]/20"></div>
             
                        <div className="flex flex-col items-center">
                            <span className="text-2xl sm:text-3xl font-bold text-[#9F531B]">+3000</span>
                            <span className="text-xs sm:text-sm text-[#1A1615] opacity-80">Productos</span>
                        </div>
                    </div>
                </div>

                <div className='butons-container flex flex-wrap gap-4 pt-4'>
                    <Link to="/catalogo" className='no-underline'>
                        <button className='px-5 py-2 text-base md:text-lg bg-[#9F531B] text-[#EEEEEF] rounded-xl hover:bg-[#7C3E13]  hover:text-[#EEEEEF] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1'>
                            <span>Ver Catálogo</span>
                        </button>
                    </Link>

                    <button onClick={scrollToSection} className='px-5 py-2 text-base md:text-lg bg-[#9F531B] text-[#EEEEEF] rounded-xl hover:bg-[#7C3E13]  hover:text-[#EEEEEF] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1'>
                        Contactar
                    </button>
                </div>

                <div className='socialMedia-container flex gap-4 pt-4 text-xl md:text-2xl'>
                    <a href='https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr' target='_blank' rel='noopener noreferrer' className='text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3'><i className='fab fa-facebook'></i></a>
                    <a href='https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5' target='_blank' rel='noopener noreferrer' className='text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3'><i className='fab fa-instagram'></i></a>
                    <a href='https://wa.me/523315876207' target='_blank' rel='noopener noreferrer' className='text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3'><i className='fab fa-whatsapp'></i></a>
                </div>
            </div>

            <div className='col2 w-full hidden sm:flex sm:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] relative mb-16 lg:mb-0'>
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
import React from 'react'

export const ContactInfo = () => {
    return (
        <div className='contact-info-container h-full'>
            <div className="bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 rounded-2xl p-4 sm:p-6 border border-[#9F531B]/20 h-full flex flex-col">
                <div className="text-center mb-8">
                    <div className="h-[68px] w-[68px] sm:h-[72px] sm:w-[72px] md:h-[76px] md:w-[76px] lg:h-[80px] lg:w-[80px] bg-gradient-to-br from-[#9F531B] to-[#7C3E13] rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-info-circle text-[#EEEEEF] text-2xl"></i>
                    </div>
                    <h3 className='text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-2'>
                        Información de Contacto
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                        Estamos aquí para ayudarte con tus proyectos
                    </p>
                </div>

                <div className='space-y-6 flex-1'>
                    {/* Teléfono */}
                    <div className='contact-item group'>
                        <div className='flex items-center gap-4 p-2 bg-white rounded-xl shadow-sm border border-gray-100 
                        hover:shadow-lg transition-all duration-300'>
                            <div className='h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] md:h-[46px] md:w-[46px] lg:h-[50px] lg:w-[50px] bg-gradient-to-br from-[#9F531B] to-[#7C3E13] rounded-full 
                            flex items-center justify-center transition-transform duration-300'>
                                <i className='fas fa-phone text-white text-lg'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-[#1A1615] font-semibold text-sm sm:text-base mb-1'>Teléfono</p>
                                <p className='text-gray-700 text-xs md:text-sm font-medium'>+52 33 1587 6207</p>
                                <p className='text-[#9F531B] text-xs mt-1'>Llamada directa y WhatsApp</p>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='contact-item group'>
                        <div className='flex items-center gap-4 p-2 bg-white rounded-xl shadow-sm border border-gray-100 
                        hover:shadow-lg transition-all duration-300'>
                            <div className='h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] md:h-[46px] md:w-[46px] lg:h-[50px] lg:w-[50px] bg-gradient-to-br from-[#9F531B] to-[#7C3E13] rounded-full 
                            flex items-center justify-center transition-transform duration-300'>
                                <i className='fas fa-envelope text-[#EEEEEF] text-lg'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-[#1A1615] font-semibold text-sm sm:text-base mb-1'>Email</p>
                                <p className='text-gray-700 text-xs md:text-sm  font-medium'>drucken2016@hotmail.com</p>
                                <p className='text-[#9F531B] text-xs mt-1'>Respuesta en 24h</p>
                            </div>
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className='contact-item group'>
                        <div className='flex items-center gap-4 p-2 bg-white rounded-xl shadow-sm border border-gray-100 
                        hover:shadow-lg transition-all duration-300'>
                            <div className='h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] md:h-[46px] md:w-[46px] lg:h-[50px] lg:w-[50px] bg-gradient-to-br from-[#9F531B] to-[#7C3E13] rounded-full 
                            flex items-center justify-center transition-transform duration-300 mt-1'>
                                <i className='fas fa-map-marker-alt text-[#EEEEEF] text-lg'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-[#1A1615] font-semibold text-sm sm:text-base mb-1'>Dirección</p>
                                <p className='text-gray-700 text-xs md:text-sm font-medium'>
                                   Ramón corona 454<br />Unidad República Zapopan Jalisco 45146
                                </p>
                                <p className='text-[#9F531B] text-xs mt-1'>Visítanos</p>
                            </div>
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className='contact-item group'>
                        <div className='flex items-center gap-4 p-2 bg-white rounded-xl shadow-sm border border-gray-100 
                        hover:shadow-lg transition-all duration-300'>
                            <div className='h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] md:h-[46px] md:w-[46px] lg:h-[50px] lg:w-[50px] bg-gradient-to-br from-[#9F531B] to-[#7C3E13] rounded-full 
                            flex items-center justify-center transition-transform duration-300 mt-1'>
                                <i className='fas fa-clock text-[#EEEEEF]  text-base md:text-lg'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-[#1A1615] font-semibold text-sm sm:text-base mb-2'>Horarios de Atención</p>
                                <div className='space-y-1'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-700 text-xs md:text-sm  font-medium'>Lunes - Viernes:</span>
                                        <span className='text-[#9F531B] text-xs md:text-sm font-semibold'>10:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-700 text-xs md:text-sm font-medium'>Sábado:</span>
                                        <span className='text-red-500 text-xs md:text-sm  font-semibold'>Cerrado</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-700 text-xs md:text-sm  font-medium'>Domingo:</span>
                                        <span className='text-red-500 text-xs md:text-sm  font-semibold'>Cerrado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

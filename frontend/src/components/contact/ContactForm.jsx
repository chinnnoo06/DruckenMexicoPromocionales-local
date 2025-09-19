import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Validation } from '../../helpers/Validation';
import { useFormContact } from '../../hooks/useFormContact';

export const ContactForm = () => {
    const { formData, setFormData, manageChange } = useForm({
        name: '',
        tittle: '',
        message: ''
    })

    const {sendMessage, formErrors} = useFormContact(formData, setFormData);

    return (
        <div className='contact-form-container h-full'>
            <div className="bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 rounded-2xl p-4 sm:p-6 border border-[#9F531B]/20 h-full flex flex-col">
                <div className="text-center mb-8">
                    <div className="h-[68px] w-[68px] sm:h-[72px] sm:w-[72px] md:h-[76px] md:w-[76px] lg:h-[80px] bg-gradient-to-br from-[#9F531B] to-[#7C3E13] rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-paper-plane text-[#EEEEEF] text-2xl"></i>
                    </div>
                    <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-2">
                        Envíanos un Mensaje
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                        Completa el formulario y nos pondremos en contacto contigo
                    </p>
                </div>

                <form className='space-y-6 flex-1 flex flex-col' onSubmit={sendMessage}>
                    <div className="flex-1 space-y-6">
                        <div className="form-group">
                            <label htmlFor="name" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base ">
                                <i className="fas fa-user mr-2"></i>
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Escribe tu nombre completo"
                                onChange={manageChange}
                                value={formData.name}
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                            />
                            {formErrors.name && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.name}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="tittle" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                <i className="fas fa-tag mr-2"></i>
                                Asunto
                            </label>
                            <input
                                type="text"
                                id="tittle"
                                name="tittle"
                                placeholder="¿En qué podemos ayudarte?"
                                onChange={manageChange}
                                value={formData.tittle}
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                            />
                            {formErrors.tittle && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.tittle}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                <i className="fas fa-comment mr-2"></i>
                                Mensaje
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Cuéntanos sobre tu proyecto..."
                                onChange={manageChange}
                                value={formData.message}
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                            />
                            {formErrors.message && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='flex justify-center pt-4'>
                        <button
                            className='px-3.5 py-1 text-sm md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                            text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]
                            shadow-lg hover:shadow-xl flex items-center gap-2'
                            type="submit"
                        >
                            <i className="fab fa-whatsapp"></i>
                            Enviar por WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

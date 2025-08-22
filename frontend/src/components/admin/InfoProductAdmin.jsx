import React, { useState, useEffect } from 'react'
import { useProduct } from '../../hooks/useProduct';
import { ModalConfirm } from './ModalConfirm';
import { Fetch } from '../../helpers/Fetch';
import { Global } from '../../helpers/Global';
import { useNavigate } from 'react-router-dom';


export const InfoProductAdmin = ({ product, selectedColor, setSelectedColor }) => {
    const { } = useProduct(product, selectedColor);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const deleteProduct = async () => {
        const data = await Fetch(Global.url + "product/eliminar-producto/" + product._id, "DELETE")

        if (data.status === "success") {
            setShowModal(false);
            navigate('/catalogo-admin', { replace: true });
        }
    }

    return (
        <>
            <div className='w-full md:w-1/2 flex flex-col justify-center'>
                <h3 className='text-[#9F531B] font-semibold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-2'>
                    {product.name}
                </h3>

                <span className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-[#9F531B]">
                    MXN {product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>

                <span className='text-[#1A1615] text-[11px] sm:text-[13px] md:text-[15px] lg:text-[16px] font-medium mt-2 block mb-5'>
                    {product.description}
                </span>

                <div className='mb-8'>
                    <h4 className='text-[#9F531B] font-semibold text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-2'>Colores disponibles</h4>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map((c, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedColor(index)}
                                className={`w-6 h-6 md:w-9 md:h-9 rounded-full border-2 transition-all flex items-center justify-center
                                                ${selectedColor === index ? 'border-amber-600 ring-2 ring-amber-200' : 'border-gray-200 hover:border-gray-300'}`}
                                style={{ backgroundColor: c.hex || '#ccc' }}
                                aria-label={`Seleccionar color ${c.color}`}
                                title={c.color}
                            >
                                {selectedColor === index && (
                                    <svg className="w-5 h-5 text-white mix-blend-difference" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>



                <div className='flex gap-5'>
                    <button
                        className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                        text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]
                        shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                        onClick={() => {
                                    navigate('/editar-producto-admin', {
                                        state: {
                                            product
                                        }
                                    })
                                }}
                    >
                        Editar
                    </button>
                    <button
                        className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                        text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]
                        shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                        onClick={() => setShowModal(true)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>

            <ModalConfirm showModal={showModal} setShowModal={setShowModal} deleteProduct={deleteProduct} />

        </>

    )
}

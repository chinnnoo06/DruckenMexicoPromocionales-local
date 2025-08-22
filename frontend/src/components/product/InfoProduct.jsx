import React, { useState, useEffect } from 'react'
import { ModalAddOrder } from './ModalAddOrder';
import { useProduct } from '../../hooks/useProduct';

export const InfoProduct = ({ product, selectedColor, setSelectedColor }) => {
    const { quantity, order, showModal, setShowModal, handleQuantityChange, saveProductLocalStorage} = useProduct(product, selectedColor);

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

                <div className='mb-5'>
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

                <div className='mb-7'>
                    <label htmlFor='quantity' className='block font-semibold text-[#9F531B] mb-2 text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px]'>Cantidad</label>
                    <input
                        type="number"
                        id='quantity'
                        name='quantity'
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className='w-16 px-2 py-1 md:w-24 md:px-4 md:py-2 rounded-lg bg-[#EEEEEF] text-gray-700 border border-[#9F531B] 
                                    focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                    focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                    text-base hover:border-[#9F531B]/50'
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        * El precio unitario puede variar según cantidad y acabados especiales, aclarar por mensaje directo
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        * La cantidad mínima de pedido es de {product.minQuantity}
                    </p>
                </div>

                <button
                    className='w-full md:w-56 px-3.5 py-1.5 text-x md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                        text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]
                        shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                    onClick={() => saveProductLocalStorage()}
                >
                    <i className="fa-solid fa-bag-shopping"></i>
                    Agregar al pedido
                </button>
            </div>

            <ModalAddOrder order={order} showModal={showModal} setShowModal={setShowModal} />
        </>

    )
}

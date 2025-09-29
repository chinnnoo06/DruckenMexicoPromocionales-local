import React, { useState, useEffect } from 'react'
import { ModalAddOrder } from './ModalAddOrder';
import { useProduct } from '../../hooks/useProduct';

export const InfoProduct = ({ product, selectedColor, setSelectedColor }) => {
    const { quantity, order, showModal, setShowModal, handleQuantityChange, saveProductLocalStorage } = useProduct(product, selectedColor);

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

                {/* Información del producto mejorada */}
                <div className="mb-5 border border-[#9F531B]/20 rounded-lg p-2 bg-[#F9F5F0]">
                    <h4 className='text-[#9F531B] font-semibold text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-3'>
                        Especificaciones del producto
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.material && (
                            <div className="flex flex-col">
                                <span className="text-[#7C3E13] text-[13px] sm:text-[14px] font-medium">Material</span>
                                <span className="text-[#1A1615] text-[14px] sm:text-[15px]">{product.material}</span>
                            </div>
                        )}

                        {product.printingTechnique && (
                            <div className="flex flex-col">
                                <span className="text-[#7C3E13] text-[13px] sm:text-[14px] font-medium">Técnica de impresión</span>
                                <span className="text-[#1A1615] text-[14px] sm:text-[15px]">{product.printingTechnique}</span>
                            </div>
                        )}

                        {product.measures && (
                            <div className="flex flex-col">
                                <span className="text-[#7C3E13] text-[13px] sm:text-[14px] font-medium">Medidas</span>
                                <span className="text-[#1A1615] text-[14px] sm:text-[15px]">{product.measures}</span>
                            </div>
                        )}

                        {product.printingMeasures && (
                            <div className="flex flex-col">
                                <span className="text-[#7C3E13] text-[13px] sm:text-[14px] font-medium">Medidas de impresión</span>
                                <span className="text-[#1A1615] text-[14px] sm:text-[15px]">{product.printingMeasures}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className='mb-5'>
                    <h4 className='text-[#9F531B] font-semibold text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-2'>Colores disponibles</h4>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map((c, index) => (
                            <div className='flex flex-col gap-2 items-center'>
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(index)}
                                    className={`w-6 h-6 md:w-9 md:h-9 rounded-full border-2 transition-all flex items-center justify-center
                                                ${selectedColor === index ? 'border-[#7C3E13] scale-110' : 'border-gray-200 hover:border-gray-300'}`}
                                    style={{ backgroundColor: c.hex || '#ccc' }}
                                    aria-label={`Seleccionar color ${c.color}`}
                                    title={c.color}
                                >
                            
                                </button>
                                <span className='text-xs'>{c.color}</span>
                            </div>

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
                    className='w-full md:w-56 px-3.5 py-1.5 text-x md:px-5 md:py-2 md:text-lg rounded-xl font-semibold 
                        text-[#EEEEEF] bg-[#9F531B] flex items-center justify-center gap-2 hover:bg-[#7C3E13] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
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
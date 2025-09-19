import React from 'react'
import { Link } from 'react-router-dom';
import { GlobalImage } from '../../helpers/Global';
import ReactDOM from 'react-dom'; 


export const ModalAddOrder = ({ order, showModal, setShowModal }) => {
    if (!showModal) return null;
    return ReactDOM.createPortal( // Usa createPortal aquí
        <div className="modal-overlay bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button btn hover:scale-110" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <div className='container-modal flex flex-col text-center'>

                    <h3 className="text-[#9F531B] font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] mb-4">
                        ¡Producto agregado!
                    </h3>

                    {/* Product Info */}
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-5 md:mb-8">
                        {/* Product Image */}
                        <div className="w-4/5 md:w-1/4 flex justify-center">
                            <div className="relative w-full max-w-xs h-48 bg-white rounded-xl shadow-sm border border-[#9F531B] overflow-hidden group">
                                <img
                                    src={`${GlobalImage.url}${order.ProductImage}`}
                                    alt={order.ProductName}
                                    loading="lazy"
                                    className="w-full h-full object-contain  transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-3/4 flex flex-col ">
                            <h4 className="text-[#9F531B] font-semibold text-left text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] mb-2">{order.ProductName}</h4>

                            <div className="space-y-2 mb-2">
                                <div className="flex items-center gap-2 text-[13px] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                                    <span className="text-[#9F531B]">Color:</span>
                                    <span className="font-medium text-gray-600">{order.ProductColor}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[13px] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                                    <span className="text-[#9F531B]">Cantidad:</span>
                                    <span className="font-medium text-gray-600">{order.OrderQuantity}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[13px] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                                    <span className="text-[#9F531B]">Precio:</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-medium text-gray-600">MXN {order.ProductPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                        <span className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-gray-600">+ IVA</span>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-transparent border border-[#9F531B] rounded-lg p-2 md:p-3 w-full">
                                <div className="flex justify-between items-center text-[13px] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                                    <span className="font-semibold text-[#9F531B]">Subtotal:</span>
                                    <span className="font-bold text-[#9F531B]">
                                        MXN {order.Subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            className="w-full md:w-1/2 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                                    text-[#9F531B] bg-transparent hover:bg-[#9F531B]/10
                                    border-2 border-[#9F531B] flex items-center justify-center gap-3"
                            onClick={() => setShowModal(false)}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Seguir comprando
                        </button>

                        <Link
                            to="/pedido"
                            className='w-full md:w-1/2 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                                    text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13] hover:shadow-md
                                    shadow-sm flex items-center justify-center gap-3'
                        >
                            <i className="fa-solid fa-bag-shopping"></i>
                            Ver mi pedido
                        </Link>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}
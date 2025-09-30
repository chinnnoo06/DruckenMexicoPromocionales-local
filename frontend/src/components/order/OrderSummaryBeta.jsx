import React from 'react'
import { Link } from 'react-router-dom';
import { useSummary } from '../../hooks/useSummary';

export const OrderSummaryBeta = ({ orders }) => {
    const { isDisabled, sendOrder, total } = useSummary(orders);

    return (
        <div className="col2 flex flex-col flex-[30%] h-1/2 bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 p-6 rounded-xl border border-[#9F531B]/20 shadow-sm">
            <div className='flex flex-col space-y-6'>
                {/* Resumen del pedido */}
                <div className="space-y-3">
                    <h3 className="text-[17px] sm:text-[17px] md:text-[18px] lg:text-[22px] font-semibold text-[#9F531B] border-b pb-2 border-[#9F531B]/20">
                        Resumen del pedido
                    </h3>

                    <div className="flex justify-between items-center text-[14px] sm:text-[15px] md:text-[15px] lg:text-[17px]">
                        <span className="text-[#1A1615]">Productos:</span>
                        <span className="font-medium">{orders.length}</span>
                    </div>


                </div>

                {/* Botones de acción */}
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <button
                            className={`w-full 
                            px-3 py-1 text-base        /* base (xs) → pequeño */
                            sm:px-5 sm:py-2 sm:text-base /* sm → más grande */
                            md:px-3 md:py-1 md:text-base /* md → más pequeño */
                            lg:px-5 lg:py-2 lg:text-lg /* lg → normal */
                            rounded-xl font-semibold transition-all duration-300
                            text-[#EEEEEF] flex items-center justify-center gap-3 
                            ${isDisabled ? 'bg-[#8e8e92] cursor-not-allowed' : 'bg-[#9F531B] hover:bg-[#7C3E13] hover:shadow-md shadow-sm'}`}
                            disabled={isDisabled}
                            onClick={sendOrder}
                        >
                            <i className="fab fa-whatsapp"></i>
                            Realizar Pedido
                        </button>
                        {isDisabled && (
                            <p className="text-xs text-red-500 mt-1">
                                * Uno o más productos no cumplen con la cantidad mínima de pedido
                            </p>
                        )}
                    </div>

                    <Link
                        to="/catalogo"
                        className="no-underline"
                    >
                        <button
                            className="w-full 
                            px-3 py-1 text-base        /* base */
                            sm:px-5 sm:py-2 sm:text-base /* sm más grande */
                            md:px-3 md:py-1 md:text-base /* md más pequeño */
                            lg:px-5 lg:py-2 lg:text-base /* lg normal */
                            rounded-xl font-semibold transition-all duration-300
                            text-[#9F531B] bg-transparent hover:bg-[#9F531B]/10
                            border-2 border-[#9F531B] flex items-center justify-center gap-3"
                        >
                            <i className="fas fa-arrow-left"></i>
                            Comprar más
                        </button>
                    </Link>
                </div>


            </div>
        </div>
    )
}

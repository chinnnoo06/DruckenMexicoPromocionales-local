import React from 'react'
import { GlobalImage } from '../../helpers/Global'

export const OrderCart = ({ group, totalQuantity, handleAmount, deleteProduct }) => {

    return (
        <div className="p-4 bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 hover:shadow-md transition-shadow duration-300 rounded-lg" key={group.ProductID}>
            <h3 className="font-semibold text-[#9F531B] text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] mb-3 w-full">
                {group.ProductName}
            </h3>

            <div className="space-y-4">
                {group.groupedOrders.map((order, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-6 items-stretch"
                    >
                        <div className="w-full sm:w-[120px] h-40 sm:h-[160px]  rounded-lg flex items-center justify-center mt-2">
                            <img
                                src={`${GlobalImage.url}${order.ProductImage}`}
                                alt={order.ProductName}
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-center">


                            <div className="flex justify-between items-center gap-10 pb-3">
                                <div className="flex flex-row gap-10 sm:items-center">
                                    {/* Color */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <span className="text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-[#9f531b]">
                                            Color:
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center"
                                                style={{
                                                    backgroundColor: order.ProductHexColor || "#ccc",
                                                }}
                                            ></span>
                                            <span className="text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-gray-700">
                                                {order.ProductColor}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Precio Unitario */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <span className="text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-[#9f531b]">
                                            Precio Unitario:
                                        </span>
                                        <span className="text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-gray-700">
                                            MXN {order.ProductPrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>

                                <button onClick={() => deleteProduct(order.ProductID, order.ProductColor)}>
                                    <i className="fa-solid fa-trash text-[#9F531B] hover:text-[#7C3E13] text-[11px] sm:text-[13px] md:text-[15px] lg:text-[16px]"></i>
                                </button>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-[#9f531b]">
                                <div className="flex items-center gap-2">
                                    {order.OrderQuantity > 1 && (
                                        <>
                                            <button
                                                className="px-3 py-1 text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]"
                                                onClick={() => handleAmount(order.ProductID, order.ProductColor, 0)}
                                            >
                                                -
                                            </button>
                                        </>
                                    )}

                                    <span className="text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] py-1 bg-[#EEEEEF] text-center w-12">
                                        {order.OrderQuantity}
                                    </span>
                                    <button
                                        className="px-3 py-1 text-[13px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]"
                                        onClick={() => handleAmount(order.ProductID, order.ProductColor, 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] font-bold text-[#9F531B]">
                                    MXN {order.Subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-3">
                <p className="text-xs sm:text-sm text-gray-700">
                    Cantidad total seleccionada:{" "}
                    <span className="font-semibold">{totalQuantity}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-700">
                    Cantidad mínima requerida:{" "}
                    <span className="font-semibold">{group.minQuantity}</span>
                </p>
                {totalQuantity < group.minQuantity ? (
                    <p className="text-xs sm:text-sm text-red-500 mt-1">
                        * Debes alcanzar al menos la cantidad mínima para este producto.
                    </p>
                ) : (
                    <p className="text-xs sm:text-sm text-green-600 mt-1">
                        Has alcanzado la cantidad mínima de compra.
                    </p>
                )}
            </div>

        </div>
    )
}

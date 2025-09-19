import React from 'react'
import LoadingSpinner from '../layout/loadingSpinner'
import { useNavigate } from 'react-router-dom';
import { GlobalImage } from '../../helpers/Global';


export const MapCatalog = ({ products, loading, page, isAdmin }) => {
    const navigate = useNavigate();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {products && products.length > 0 ? (
                <div className="grid grid-cols-2 min-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5  w-full">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="relative w-full bg-transparent flex flex-col items-center transition-all duration-200 group"
                        >
                            {/* Etiqueta destacado */}
                            <span className="absolute top-1 left-1 bg-[#9F531B] text-[#EEEEEF] text-[10px] px-1 py-0 md:px-2 md:py-1 md:text-xs rounded z-10">
                                {product.span}
                            </span>

                            {/* Contenedor de imagen con aspect ratio fijo */}
                            <div className='w-full aspect-[3/4] relative overflow-hidden rounded-md '>
                                <img
                                    src={product.colors.length > 1 ? `${GlobalImage.url}${product.generalImage}` : `${GlobalImage.url}${product.colors[0].image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-200"
                                />
                                <button className="absolute inset-0 m-auto w-[80%] h-10 bg-[#9F531B] text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                                    onClick={() => {
                                        navigate(isAdmin ? '/producto-admin' : '/producto', {
                                            state: {
                                                product,
                                                page,
                                                scrollY: window.scrollY ,
                                                isAdmin
                                            }
                                        })
                                    }}>
                                    VER AHORA
                                </button>
                            </div>

                            {/* Información del producto */}
                            <div className="w-full px-1 sm:px-2">
                                {/* Nombre del producto */}
                                <div className='min-h-[40px] sm:min-h-[50px] flex items-center'>
                                    <h3 className="text-sm sm:text-base font-semibold leading-tight uppercase line-clamp-2">
                                        {product.name} ({product.key})
                                    </h3>
                                </div>

                                {/* Precio del producto */}
                                <div>
                                    <p className="text-[#9F531B] text-base font-semibold">
                                        MXN {product.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center h-52 text-[#9F531B]'>
                    <i className="fa-solid fa-circle-exclamation text-6xl md:text-8xl mb-2"></i>
                    <h3 className="font-semibold text-base md:text-2xl">No hay resultados</h3>
                </div>
            )}

        </>

    )
}
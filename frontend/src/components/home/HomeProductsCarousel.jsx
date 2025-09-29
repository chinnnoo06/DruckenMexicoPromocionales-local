import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalImage } from '../../helpers/Global';
import { useCarousel } from '../../hooks/useCarousel';

export const HomeProductsCarousel = () => {
  const { showLeftButton, showRightButton, products, carouselRef, scroll } = useCarousel();
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto">
      <div className="relative mb-5">
        {/* Botones de navegación */}
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#9F531B]/90 text-white p-2 rounded-full z-10 hover:bg-[#7C3E13] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm"
          >
            <i className="fa-solid fa-angle-left text-base"></i>
          </button>
        )}

        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-3 sm:space-x-4 lg:space-x-5 scrollbar-hide scroll-smooth py-2"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] bg-transparen  rounded-lg transition-all duration-200 group"
            >
              {/* Etiqueta destacado */}
              <span className="absolute top-1 left-1 bg-[#9F531B] text-white text-[10px] px-1 py-0 md:px-2 md:py-1 md:text-xs rounded z-10">
                {product.span}
              </span>

              {/* Contenedor de imagen con aspect ratio fijo */}
              <div className='w-full aspect-[3/4] relative overflow-hidden rounded-t-lg'>
                <img
                  src={`${GlobalImage.url}${product.colors[0].image}`}
                  alt={product.name}
                  className="absolute w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
                />
                <button className="absolute inset-0 m-auto w-[80%] h-8 sm:h-9 bg-[#9F531B]/90 text-white text-xs sm:text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                  onClick={() => {
                    navigate('/producto', {
                      state: {
                        product,
                        scrollY: window.scrollY
                      }
                    })
                  }}>
                  VER AHORA
                </button>
              </div>

              {/* Información del producto */}
              <div className="p-2 sm:p-3">
                <div className='min-h-[40px]'>
                  <h3 className="text-xs sm:text-sm font-semibold leading-tight uppercase line-clamp-2">
                    {product.name} ({product.key})
                  </h3>
                </div>
                <div className='mt-1 sm:mt-2'>
                  <p className="text-[#9F531B] text-sm sm:text-base font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#9F531B]/90 text-white p-2 rounded-full z-10 hover:bg-[#7C3E13] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm"
          >
            <i className="fa-solid fa-angle-right text-base"></i>
          </button>
        )}
      </div>

      <Link to="/catalogo" className='no-underline flex items-center justify-center'>
        <button className='px-3.5 py-1 text-sm md:px-5 md:py-2 md:text-lg rounded-xl border border-[#9F531B] text-[#9F531B] hover:bg-[#9F531B] hover:text-[#EEEEEF] transition-all duration-300 hover:shadow-lg  hover:-translate-y-1 mt-5 font-semibold w-[200px] sm:w-[300px]'>
          Ver más productos
        </button>
      </Link>
    </div>
  )

}

import React from 'react'
import { GlobalImage } from '../../helpers/Global'

export const ImgProduct = ({product, selectedColor}) => {
    
    return (
        <div className='w-full md:w-1/2 flex justify-center items-center'>
            <div className='w-full max-w-md h-[350px] sm:h-[400px] md:h-[500px] aspect-square bg-white rounded-lg shadow-md flex items-center justify-center'>
                <img
                    src={`${GlobalImage.url}${product.colors[selectedColor].image}`}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    )
}

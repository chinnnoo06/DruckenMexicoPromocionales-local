import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { ImgProduct } from '../components/product/ImgProduct';
import { InfoProduct } from '../components/product/InfoProduct';
import { InfoProductAdmin } from '../components/admin/InfoProductAdmin';
import { InfoProductBeta } from '../components/product/InfoProductBeta';

export const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [selectedColor, setSelectedColor] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (location.state?.product) {
            setProduct(location.state.product);
        } else {
            if (location.state?.isAdmin) {
                navigate('/catalogo-admin', { replace: true });
            } else {
                navigate('/catalogo', { replace: true });
            }
        }
    }, [location, navigate]);

    console.log(location.state?.searchCategory)

    return (
        <SectionWrapper className='container-main-content pt-32 pb-20 flex flex-col justify-center gap-2 mx-auto max-w-[1300px]'>
            {product ? (
                <>
                    <nav className="border-b border-amber-700/20 pb-2">
                        <Link
                            to={location.state?.isAdmin ? "/catalogo-admin" : "/catalogo"}
                            className="text-amber-700 hover:text-amber-800 transition-colors duration-200"
                            state={{
                                page: location.state?.page || 1,
                                selectCategory: location.state?.searchCategory,
                                scrollY: location.state?.scrollY || 0
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <i className="fas fa-arrow-left text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]"></i>
                                <span className="font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">Volver al catálogo</span>
                            </div>
                        </Link>
                    </nav>

                    <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-2 lg:gap-5 min-h-[550px]'>
                        {/* Imagen del producto */}
                        <ImgProduct product={product} selectedColor={selectedColor} />

                        {/* Separador visual */}
                        <div className="hidden md:block w-[2px] bg-gradient-to-b from-transparent via-[#9F531B] to-transparent mx-4"></div>

                        {/*{location.state?.isAdmin ? <InfoProductAdmin product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} /> : <InfoProduct product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />} */}

                        {location.state?.isAdmin ? <InfoProductAdmin product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} /> : <InfoProductBeta product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </SectionWrapper>
    );
}


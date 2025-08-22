import { useEffect, useRef, useState } from "react";
import { Global } from "../helpers/Global";
import { Fetch } from "../helpers/Fetch";

export const useCarousel = () => {
    const carouselRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [scrollAmount, setScrollAmount] = useState(220);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const data = await Fetch(Global.url + "product/obtener-productos-carrusel", "GET")

        if (data.status === "success") {
            setProducts(data.products);
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    // Función para calcular el scroll amount basado en el tamaño de pantalla
    const calculateScrollAmount = () => {
        const width = window.innerWidth;
        if (width < 640) { // sm
            return 160; // 1 tarjeta móvil
        } else if (width < 768) { // md
            return 180; // 1 tarjeta tablet
        } else if (width < 1024) { // lg
            return 200; // 1 tarjeta desktop pequeño
        } else if (width < 1280) { // xl
            return 220; // 1 tarjeta desktop
        } else { // 2xl
            return 440; // 2 tarjetas desktop grande
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScrollPosition);
            // Verificar posición inicial
            checkScrollPosition();

            return () => {
                carousel.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setScrollAmount(calculateScrollAmount());
            // Recalcular posición después del resize
            setTimeout(checkScrollPosition, 100);
        };

        window.addEventListener('resize', handleResize);
        setScrollAmount(calculateScrollAmount());

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });

            checkScrollPosition();
        }
    };

    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

            // Mostrar/ocultar botón izquierdo
            setShowLeftButton(scrollLeft > 0);

            // Mostrar/ocultar botón derecho
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };
    return {showLeftButton, showRightButton, products, carouselRef, scroll};
};
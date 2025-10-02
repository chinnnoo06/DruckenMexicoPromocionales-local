import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useHeaderFooter = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const isInicio = location.pathname === '/' || location.pathname === '/inicio';

    useEffect(() => {
        setMenuVisible(false);
    }, [location]);

    useEffect(() => {
        if (!isInicio) return;

        const handleScroll = () => {
            const sections = ['inicio', 'nosotros', 'servicios', 'contacto'];
            const scrollPosition = window.scrollY + 100; // Offset para mejor detección

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Llamar una vez al cargar para establecer el estado inicial

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isInicio]);

    useEffect(() => {
        const handleScroll = () => {
            if (menuVisible) return;

            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowHeader(false); // Ocultar al bajar
            } else {
                setShowHeader(true);  // Mostrar al subir
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, menuVisible]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg: breakpoint de Tailwind
                setMenuVisible(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Llamada inicial para asegurarse de que el estado sea correcto al montar
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuVisible(false);
        }
    };

    const navigateToSection = (sectionId) => {
        navigate('/inicio');
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setMenuVisible(false);
            }
        }, 400);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return {scrollToSection, navigateToSection, toggleMenu, menuVisible, activeSection, showHeader, isInicio};
}
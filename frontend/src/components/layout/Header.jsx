import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import DruckenLogo from '../../assets/logodrucken.png';

export const Header = () => {
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
        }, 100);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    return (
        <div className={`header-container bg-[#f8dcc6] fixed top-0 left-0 w-full z-[9999] transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* Header principal */}
            <header className="max-w-[1500px] mx-auto h-auto flex justify-between items-center px-4 py-4">
                <div className='container-logo-nav flex items-center gap-10'>
                    <div className='logo transition-transform duration-300 hover:scale-105'>
                        <Link to="/" className='no-underline'>
                            <img
                                src={DruckenLogo}
                                alt="Logo de Drucken México"
                                className="h-12 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Menú de navegación para desktop */}
                    <nav className='desktop-nav flex gap-8 items-center'>
                        {isInicio ? (
                            // Enlaces internos cuando estamos en la página de inicio
                            [
                                { id: 'inicio', action: () => scrollToSection('inicio'), text: "Inicio" },
                                { id: 'nosotros', action: () => scrollToSection('nosotros'), text: "Nosotros" },
                                { id: 'servicios', action: () => scrollToSection('servicios'), text: "Servicios" },
                                { id: 'contacto', action: () => scrollToSection('contacto'), text: "Contacto" },
                                { to: "/catalogo", text: "Catálogo" },
                                { to: "/pedido", text: "Pedido" }
                            ]
                                .map((item, index) => (
                                    item.to ? (
                                        <NavLink
                                            key={index}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `relative px-2 py-1 font-[400] text-lg transition-colors duration-300 cursor-pointer
                                            ${isActive ? 'text-[#9F531B]' : 'text-[#1A1615] hover:text-[#9F531B]'}
                                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                            after:bg-[#9F531B] after:transition-all after:duration-300
                                            hover:after:w-full ${isActive ? 'after:w-full' : ''}`
                                            }
                                        >
                                            {item.text}
                                        </NavLink>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={item.action}
                                            className={`relative px-2 py-1 font-[400] text-lg transition-colors duration-300 cursor-pointer
                                        ${activeSection === item.id ? 'text-[#9F531B]' : 'text-[#1A1615] hover:text-[#9F531B]'}
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                        after:bg-[#9F531B] after:transition-all after:duration-300
                                        hover:after:w-full ${activeSection === item.id ? 'after:w-full' : ''}`}
                                        >
                                            {item.text}
                                        </button>
                                    )
                                ))
                        ) : (
                            // Enlaces que redirigen a la página de inicio con scroll a sección
                            [
                                { to: "/inicio", text: "Inicio" },
                                { action: () => navigateToSection('nosotros'), text: "Nosotros" },
                                { action: () => navigateToSection('servicios'), text: "Servicios" },
                                { action: () => navigateToSection('contacto'), text: "Contacto" },
                                { to: "/catalogo", text: "Catálogo" },
                                { to: "/pedido", text: "Pedido" }
                            ].map((item, index) => (
                                item.to ? (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative px-2 py-1 font-[400] text-lg transition-colors duration-300 cursor-pointer
                                            ${isActive ? 'text-[#9F531B]' : 'text-[#1A1615] hover:text-[#9F531B]'}
                                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                            after:bg-[#9F531B] after:transition-all after:duration-300
                                            hover:after:w-full ${isActive ? 'after:w-full' : ''}`
                                        }
                                    >
                                        {item.text}
                                    </NavLink>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={item.action}
                                        className="relative px-2 py-1 font-[400] text-lg transition-colors duration-300 cursor-pointer
                                        text-[#1A1615] hover:text-[#9F531B]
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                        after:bg-[#9F531B] after:transition-all after:duration-300
                                        hover:after:w-full"
                                    >
                                        {item.text}
                                    </button>
                                )
                            ))
                        )}
                    </nav>
                </div>

                {/* Iconos redes sociales */}
                <div className='container-social-media flex gap-8 items-center'>
                    {[
                        { icon: "fab fa-facebook", url: "https://www.facebook.com" },
                        { icon: "fab fa-instagram", url: "https://www.instagram.com" },
                        { icon: "fab fa-whatsapp", url: "https://wa.me/523318237277" }
                    ].map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl text-[#1A1615] hover:text-[#9F531B] transition-colors duration-300 hover:scale-110"
                        >
                            <i className={social.icon}></i>
                        </a>
                    ))}
                </div>

                {/*Boton de menú responsive*/}
                <div
                    className="nav-responsive text-[#9F531B] text-[1.6rem] pr-[0.2rem] cursor-pointer hover:text-[#9F531B]"
                    onClick={toggleMenu}
                >
                    <i className="fa-solid fa-bars"></i>
                </div>
            </header>


            <div className={`menu-lateral fixed top-0 right-0 h-screen bg-[#f8dcc6] w-64 transform ${menuVisible ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out z-[10000] flex flex-col`}>
                <div className="flex justify-between items-center p-4 border-b border-[#9F531B]">
                    <button
                        className="text-[#1A1615] hover:text-[#b03a3a] text-xl"
                        onClick={toggleMenu}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <nav className="flex flex-col p-4 gap-4">
                    {isInicio ? (
                        // Enlaces internos cuando estamos en la página de inicio
                        [
                            { id: 'inicio', action: () => scrollToSection('inicio'), text: "Inicio" },
                            { id: 'nosotros', action: () => scrollToSection('nosotros'), text: "Nosotros" },
                            { id: 'servicios', action: () => scrollToSection('servicios'), text: "Servicios" },
                            { id: 'contacto', action: () => scrollToSection('contacto'), text: "Contacto" },
                            { to: "/catalogo", text: "Catálogo" },
                            { to: "/pedido", text: "Pedido" }
                        ]
                            .map((item, index) => (
                                item.to ? (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative py-2 font-[400] transition-colors duration-300 cursor-pointer text-left
                                            ${isActive ? 'text-[#9F531B]' : 'text-[#1A1615] hover:text-[#9F531B]'}
                                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                            after:bg-[#9F531B] after:transition-all after:duration-300
                                            hover:after:w-[80px] ${isActive ? 'after:w-[80px]' : ''}`
                                        }
                                    >
                                        {item.text}
                                    </NavLink>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={item.action}
                                        className={`relative py-2 font-[400] transition-colors duration-300 cursor-pointer text-left
                                        ${activeSection === item.id ? 'text-[#9F531B]' : 'text-[#1A1615] hover:text-[#9F531B]'}
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                        after:bg-[#9F531B] after:transition-all after:duration-300
                                        hover:after:w-[80px] ${activeSection === item.id ? 'after:w-[80px]' : ''}`}
                                    >
                                        {item.text}
                                    </button>
                                )
                            ))
                    ) : (
                        // Enlaces que redirigen a la página de inicio con scroll a sección
                        [
                            { to: "/inicio", text: "Inicio" },
                            { action: () => navigateToSection('nosotros'), text: "Nosotros" },
                            { action: () => navigateToSection('servicios'), text: "Servicios" },
                            { action: () => navigateToSection('contacto'), text: "Contacto" },
                            { to: "/catalogo", text: "Catálogo" },
                            { to: "/pedido", text: "Pedido" }
                        ].map((item, index) => (
                            item.to ? (
                                <NavLink
                                    key={index}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `relative py-2 font-[400] transition-colors duration-300 cursor-pointer text-left
                                            ${isActive ? 'text-[#9F531B]' : 'text-[#1A1615] hover:text-[#9F531B]'}
                                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                            after:bg-[#9F531B] after:transition-all after:duration-300
                                            hover:after:w-[80px] ${isActive ? 'after:w-[80px]' : ''}`
                                    }
                                >
                                    {item.text}
                                </NavLink>
                            ) : (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="relative py-2 font-[400] transition-colors duration-300 cursor-pointer text-left
                                        text-[#1A1615] hover:text-[#9F531B]
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                        after:bg-[#9F531B] after:transition-all after:duration-300
                                        hover:after:w-[80px]"
                                >
                                    {item.text}
                                </button>
                            )
                        ))
                    )}
                </nav>

                {/* Redes sociales en menú móvil */}
                <div className='mt-auto p-4 flex justify-center gap-6 border-t border-[#9F531B]'>
                    {[
                        { icon: "fab fa-facebook", url: "https://www.facebook.com" },
                        { icon: "fab fa-instagram", url: "https://www.instagram.com" },
                        { icon: "fab fa-whatsapp", url: "https://wa.me/523318237277" }
                    ].map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-[#1A1615] hover:text-[#9F531B] transition-colors duration-300 hover:scale-110"
                        >
                            <i className={social.icon}></i>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
};

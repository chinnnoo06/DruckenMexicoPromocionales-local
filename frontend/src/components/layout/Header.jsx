import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import DruckenLogo from '../../assets/logodrucken.png';
import { useHeaderFooter } from '../../hooks/useHeaderFooter';

export const Header = () => {
    const { scrollToSection, navigateToSection, toggleMenu, menuVisible, activeSection, showHeader, isInicio } = useHeaderFooter();

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
                                { to: "/catalogo/todos/1", text: "Catálogo" },
                                { to: "/pedido", text: "Pedido" }
                            ]
                                .map((item, index) => (
                                    item.to ? (
                                        <NavLink
                                            key={index}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `relative px-2 py-1 font-[400] text-lg lg:text-xl transition-colors duration-300 cursor-pointer
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
                                            className={`relative px-2 py-1 font-[400] text-lg lg:text-xl transition-colors duration-300 cursor-pointer
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
                                { to: "/catalogo/todos/1", text: "Catálogo" },
                                { to: "/pedido", text: "Pedido" }
                            ].map((item, index) => (
                                item.to ? (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative px-2 py-1 font-[400] text-lg lg:text-xl transition-colors duration-300 cursor-pointer
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
                                        className="relative px-2 py-1 font-[400] text-lg lg:text-xl transition-colors duration-300 cursor-pointer
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
                        { icon: "fab fa-facebook", url: "https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr" },
                        { icon: "fab fa-instagram", url: "https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5" },
                        { icon: "fab fa-whatsapp", url: "https://wa.me/523315876207" }
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
                <div className="flex items-center p-4 border-b border-[#9F531B]/30 bg-white/5 backdrop-blur-sm">
               
                    <button
                        onClick={toggleMenu}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg 
                            border border-[#9F531B]/30
                            text-[#9F531B]
                            hover:bg-gradient-to-r hover:from-[#9F531B] hover:to-[#7C3E13]
                            hover:text-white
                            hover:border-transparent
                            hover:shadow-md
                            active:scale-95
                            transition-all duration-300
                            group"
                    >
                        <i className="fa-solid fa-xmark text-sm transition-transform duration-300 group-hover:rotate-180" />
                        
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
                                            after:bg-[#9F531B] after:transition-all after:duration-300 text-lg
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
                                        after:bg-[#9F531B] after:transition-all after:duration-300 text-lg
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
                                            after:bg-[#9F531B] after:transition-all after:duration-300 text-lg
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
                                        after:bg-[#9F531B] after:transition-all after:duration-300 text-lg
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
                        { icon: "fab fa-facebook", url: "https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr" },
                        { icon: "fab fa-instagram", url: "https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5" },
                        { icon: "fab fa-whatsapp", url: "https://wa.me/523315876207" }
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

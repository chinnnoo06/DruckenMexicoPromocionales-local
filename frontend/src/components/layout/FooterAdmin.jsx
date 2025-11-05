import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import DruckenLogo from '../../assets/logodrucken.png';
import { closeSession } from '../../helpers/CloseSession'; 

export const FooterAdmin = () => {

    return (
        <div className="footer-container bg-[#f8dcc6] border-t border-[#9F531B]/20">
            <footer className="max-w-[1500px] mx-auto py-12 px-6">

                {/* Sección principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Logo y información de la empresa */}
                    <div className="flex flex-col items-center md:items-start gap-4" translate="no">
                        <Link to="/" className='no-underline hover:scale-105 transition-transform duration-300'>
                            <img
                                src={DruckenLogo}
                                alt="Logo de Drucken México"
                                className="h-20 object-contain"
                            />
                        </Link>
                        <div className="text-center md:text-left">
                            <p className="text-[#1A1615] text-sm leading-relaxed">
                                Empresa mexicana dedicada a la distribución de artículos promocionales desde 2016.
                                Calidad, innovación y servicio al cliente.
                            </p>
                        </div>
                    </div>

                    {/* Menú de navegación con los mismos estilos que el primer footer */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h3 className="text-[#9F531B] font-bold uppercase text-lg border-b-2 border-[#9F531B] pb-2">
                            Navegación
                        </h3>
                        <nav className="flex flex-col gap-2 text-center md:text-left">
                            {[
                                { to: "/catalogo-admin", text: "Catálogo" },
                                { to: "/agregar-producto-admin", text: "Agregar Producto" },
                                { to: "/categorias-admin", text: "Administrar Categorias" },
                                { action: closeSession, text: "Cerrar Sesión" },
                            ].map((item, index) => (
                                item.to ? (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative py-1 font-medium text-sm transition-all duration-300 hover:translate-x-1 block text-left
                                            ${isActive ? 'text-[#9F531B] font-semibold' : 'text-[#1A1615] hover:text-[#9F531B]'}
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
                                        className="relative py-1 font-medium text-sm transition-all duration-300 hover:translate-x-1 block text-left w-full
                                        text-[#1A1615] hover:text-[#9F531B]
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                                        after:bg-[#9F531B] after:transition-all after:duration-300
                                        hover:after:w-full"
                                    >
                                        {item.text}
                                    </button>
                                )
                            ))}
                        </nav>
                    </div>

                    {/* Servicios */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h3 className="text-[#9F531B] font-bold uppercase text-lg border-b-2 border-[#9F531B] pb-2">
                            Nuestros Servicios
                        </h3>
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            {[
                                "Serigrafía",
                                "Tampografía",
                                "Subliminado",
                                "Resinado",
                                "Grabado Laser",
                                "Bordado",
                                "Rótulos Publicitarios",
                                "Diseños Especiales 3D",
                                "Impresion DTF Textil"
                            ].map((service) => (
                                <span key={service} className="text-[#1A1615] text-sm hover:text-[#9F531B] transition-colors duration-300 cursor-pointer">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contacto y redes sociales */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h3 className="text-[#9F531B] font-bold uppercase text-lg border-b-2 border-[#9F531B] pb-2">
                            Conocenos
                        </h3>
                        <div className="flex gap-4">
                            {[
                                { icon: "fab fa-facebook", url: "https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr", name: "Facebook" },
                                { icon: "fab fa-instagram", url: "https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5", name: "Instagram" },
                                { icon: "fab fa-whatsapp", url: "https://wa.me/523315876207", name: "WhatsApp" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-[#1A1615] hover:text-[#9F531B] transition-all duration-300 hover:scale-110 hover:rotate-3"
                                    title={social.name}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-[#1A1615] text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <i className="fa-solid fa-phone text-[#9F531B]"></i>
                                <span>+52 33 1587 6207</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <i className="fa-solid fa-envelope text-[#9F531B]"></i>
                                <span>drucken2016@hotmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <i className="fa-solid fa-location-dot text-[#9F531B]"></i>
                                <span>Ramón corona 454<br />Unidad República Zapopan Jalisco 45146</span>
                            </div>
                            <div className="w-full h-[200px]">
                                <iframe
                                    title="Mapa"
                                    src="https://www.google.com/maps/embed?pb=!4v1758817539392!6m8!1m7!1s6MUCFHMBMFJ0acuw4n5Dfw!2m2!1d20.72459020010015!2d-103.3990178222977!3f24.92747185429691!4f-13.11299517827375!5f0.8173988424383203"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="origin"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección inferior */}
                <div className="border-t border-[#9F531B]/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        {/* Derechos de autor */}
                        <div className="text-center md:text-left">
                            <p className="text-[#1A1615] text-sm">
                                &copy; {new Date().getFullYear()} Drucken México Promocionales. Todos los derechos reservados.
                            </p>
                        </div>

                        {/* Enlaces legales */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link to="/terminos" className="text-[#1A1615] hover:text-[#9F531B] transition-colors duration-300">
                                Términos y Condiciones
                            </Link>
                            <Link to="/privacidad" className="text-[#1A1615] hover:text-[#9F531B] transition-colors duration-300">
                                Política de Privacidad
                            </Link>
                        </div>

                        {/* Información adicional */}
                        <div className="text-center md:text-right">
                            <p className="text-[#1A1615] text-sm">
                                <i className="fa-solid fa-shield-halved text-[#9F531B] mr-1"></i>
                                Sitio web seguro
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
import React from 'react'
import DruckenLogo from '../../assets/logodrucken.png';
import { Link } from 'react-router-dom';

export const HeaderLogin = () => {
    return (
        <div className="header-container bg-[#f8dcc6] fixed top-0 left-0 w-full z-[9999] transition-transform duration-300 ">
            <header className="max-w-[1500px] mx-auto h-auto flex justify-center items-center px-4 py-4">
                <div className='logo transition-transform duration-300 hover:scale-105'>
                    <Link to="/" className='no-underline'>
                        <img
                            src={DruckenLogo}
                            alt="Logo de Drucken México"
                            className="h-12 object-contain"
                        />
                    </Link>

                </div>
            </header>
        </div>
    )
}

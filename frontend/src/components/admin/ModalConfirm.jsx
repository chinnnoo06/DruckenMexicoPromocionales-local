// src/components/admin/ModalConfirm.js
import React from 'react';
import ReactDOM from 'react-dom'; 

export const ModalConfirm = ({ showModal, setShowModal, deleteProduct }) => {
    if (!showModal) return null; 

    return ReactDOM.createPortal( // Usa createPortal aquí
        <div className="modal-overlay bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button btn hover:scale-110" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <div className='container-modal flex flex-col text-center'>
                    <h3 className="text-[#9F531B] font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] mb-4">
                        ¿Realmente quieres eliminar este producto?
                    </h3>
                    <div className="flex gap-3 justify-center">
                        <button
                            className="px-16 py-1.5 text-sm md:px-20 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                            text-[#9F531B] bg-transparent hover:bg-[#9F531B]/10 border-2 border-[#9F531B]"
                            onClick={() => setShowModal(false)}
                        >
                            No
                        </button>
                        <button
                            className='px-16 py-1.5 text-sm md:px-20 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                            text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13] hover:shadow-md shadow-sm flex items-center justify-center gap-3'
                            onClick={() => deleteProduct()}
                        >
                            Sí
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') 
    );
}
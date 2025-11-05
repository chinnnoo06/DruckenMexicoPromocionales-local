import React, { useState } from 'react'
import LoadingSpinner from '../layout/LoadingSpinner';
import { FormCategory } from './FormCategory';
import { ModalConfirmCategory } from './ModalConfirmCategory';


export const MapCategory = ({ categories, loading, adding, setAdding, saveCategory, formErrors, setFormErrors, loadingAction, setEditing, setCategoryEdit, setIdCategoryEdit, removeCategory }) => {
    const [showModal, setShowModal] = useState(false);
    const [idCategoryDeleted, setIdCategoryDeleted] = useState(false);
    const [count, setCount] = useState(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    const manageShowModal = (category) => {
        setShowModal(true);
        setIdCategoryDeleted(category._id);
        setCount(category.productCount)
    }

    const editing = (category) => {
        setEditing(true)
        setIdCategoryEdit(category._id)
        setCategoryEdit(category.name)
        setAdding(false);
        setFormErrors([])
    }

    return (
        <>
            <div className='flex flex-col md:items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="relative bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >

                            <div className="bg-gradient-to-r from-[#9F531B] to-[#7C3E13] p-2 text-center">
                                <h3 className="text-[#EEEEEF] font-bold text-xl lg:text-2xl tracking-wide">
                                    {category.name}
                                </h3>

                                <span className="text-[#EEEEEF] font-semibold text-sm lg:text-base tracking-wide">
                                    {category.productCount} Productos de esta categoría
                                </span>

                            </div>

                            <div className="p-4 flex  justify-between gap-5 items-center">

                                <button
                                    className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                        border border-[#9F531B] text-[#9F531B] hover:bg-[#9F531B] hover:text-[#EEEEEF] flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                                    onClick={() => editing(category)}
                                >
                                    <i className="fas fa-edit"></i>
                                    Editar
                                </button>
                                <button
                                    className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                        border border-[#9F531B] text-[#9F531B] hover:bg-[#9F531B] hover:text-[#EEEEEF] flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                                    onClick={() => manageShowModal(category)}
                                >
                                    <i className="fas fa-trash w-4 h-4"></i>
                                    Eliminar
                                </button>
                            </div>

                        </div>
                    ))}

                    {adding && (
                        <FormCategory setAdding={setAdding} saveCategory={saveCategory} formErrors={formErrors} loadingAction={loadingAction} />
                    )}

                </div>

                {!adding && (
                    <button
                        className='mt-10 w-full md:w-40 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                text-[#EEEEEF] bg-[#9F531B] flex items-center justify-center gap-2 hover:bg-[#7C3E13] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                        onClick={() => setAdding(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Agregar
                    </button>
                )}

                <ModalConfirmCategory showModal={showModal} setShowModal={setShowModal} removeCategory={removeCategory} idCategoryDeleted={idCategoryDeleted} count={count} />

            </div>

        </>

    )
}

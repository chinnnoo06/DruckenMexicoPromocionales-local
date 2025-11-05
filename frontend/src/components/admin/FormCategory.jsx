import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm';

export const FormCategory = ({ setAdding, setEditing, saveCategory, formErrors, loadingAction, categoryEdit, idCategoryEdit, removeCategory }) => {

    const { formData, setFormData, manageChange } = useForm({
        name: '',
    })

    useEffect(() => {
        if (categoryEdit) {
            setFormData({ name: categoryEdit }); // <-- así se actualiza correctamente el formData
        }
    }, [categoryEdit]);

    return (
        <div className={`${setEditing ? 'flex justify-center mt-10' : ''} `}>
            <div className="animate-scaleIn bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-center gap-5">

                <div className='form-group'>
                    <input
                        onChange={manageChange}
                        value={formData.name}
                        name='name'
                        placeholder="Nombre de la categoría"
                        className="w-full px-4 py-2 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                    />
                    {formErrors.name && (
                        <span className="text-red-500 text-xs flex items-center mt-1">
                            <i className="fas fa-exclamation-circle mr-1"></i>
                            {formErrors.name}
                        </span>
                    )}
                </div>


                <div className="flex justify-between gap-5">

                    {setAdding ? (
                        <>
                            <button
                                className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                        text-[#EEEEEF] bg-[#9F531B] flex items-center justify-center gap-2 hover:bg-[#7C3E13] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                                onClick={(e) => saveCategory(e, formData, setAdding, setEditing, false)}
                            >
                                {loadingAction ? 'Cargando...' : 'Guardar'}
                            </button>
                            <button
                                className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                        text-[#EEEEEF] bg-[#9F531B] flex items-center justify-center gap-2 hover:bg-[#7C3E13] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                                onClick={() => setAdding(false)}
                            >
                                Cancelar
                            </button>
                        </>

                    ) : (
                        <>
                            <button
                                className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                        text-[#EEEEEF] bg-[#9F531B] flex items-center justify-center gap-2 hover:bg-[#7C3E13] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                                onClick={(e) => saveCategory(e, formData, setAdding, setEditing, true, idCategoryEdit)}
                            >
                                {loadingAction ? 'Cargando...' : 'Guardar'}
                            </button>
                            <button
                                className='w-full md:w-56 px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-xl font-semibold 
                                        text-[#EEEEEF] bg-[#9F531B] flex items-center justify-center gap-2 hover:bg-[#7C3E13] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                                onClick={() => setEditing(false)}
                            >
                                Cancelar
                            </button>
                        </>

                    )}


                </div>
            </div>
        </div>

    )
}

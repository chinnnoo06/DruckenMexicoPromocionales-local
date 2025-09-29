import React from 'react'

export const FormActionProduct = ({ handleAddColor, handleRemoveColor, handleColorChange, handleImageChange, sendProduct, formErrors, loading, formData, manageChange, colors, isEdit = false }) => {
    return (
        <div className='form-container flex flex-col justify-center items-center'>
            <div className='bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-2xl p-4 sm:p-6 w-full md:w-3/4'>
                <div className="text-center mb-8">
                    <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-2 flex items-center justify-center gap-2">
                        {isEdit ? (
                            <>
                                <i className="fa-solid fa-pencil"></i>
                                Actualizar Producto
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-circle-plus"></i>
                                Crear Producto
                            </>
                        )}

                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                        {isEdit ? ' Ingrese los datos del producto a actualizar' : 'Ingrese los datos del producto a agregar'}
                    </p>
                </div>

                <form className='space-y-6 flex-1 flex flex-col' onSubmit={sendProduct}>
                    <div className="flex-1 space-y-6">
                        {/* --- Campos generales --- */}
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
                            <div className="form-group flex-1">
                                <label htmlFor="name" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fas fa-tag mr-2"></i>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Ingresa el nombre"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.name}
                                />
                                {formErrors.name && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.name}
                                    </span>
                                )}
                            </div>

                            <div className="form-group flex-1">
                                <label htmlFor="key" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fa-solid fa-key mr-2"></i>
                                    Clave
                                </label>
                                <input
                                    type="text"
                                    id="key"
                                    name="key"
                                    placeholder="Ingresa la clave"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.key}
                                />
                                {formErrors.key && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.key}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                <i className="fas fa-align-left mr-2"></i>
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                placeholder="Ingresa la descripción del producto..."
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                onChange={manageChange}
                                value={formData.description}
                            />
                            {formErrors.description && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.description}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="printingTechnique" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                <i className="fa-solid fa-paintbrush mr-2"></i>
                                Técnica(s) de Impresión
                            </label>
                            <input
                                type="text"
                                id="printingTechnique"
                                name="printingTechnique"
                                placeholder="Ingresa la(s) técnica(s) de impresión"
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                onChange={manageChange}
                                value={formData.printingTechnique}
                            />
                            {formErrors.printingTechnique && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.printingTechnique}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
                            <div className="form-group flex-1">
                                <label htmlFor="category" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fa-solid fa-list mr-2"></i>
                                    Categoria
                                </label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        name="category"
                                        className="text-sm md:text-base w-full px-4 py-3 pr-10 rounded-lg bg-white text-[#9F531B] border-2 border-[#9F531B]/30 focus:outline-none focus:ring-2 focus:ring-[#9F531B]/50 focus:border-[#9F531B] transition-all duration-300 hover:border-[#9F531B]/50 appearance-none"
                                        onChange={manageChange}
                                        value={formData.category}
                                    >
                                        <option>Selecciona una</option>
                                        <option value="Bebidas">Bebidas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#9F531B]">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                                {formErrors.category && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.category}
                                    </span>
                                )}
                            </div>

                            <div className="form-group flex-1">
                                <label htmlFor="material" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fas fa-box mr-2"></i>
                                    Material
                                </label>
                                <input
                                    type="text"
                                    id="material"
                                    name="material"
                                    placeholder="Ingresa el material"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.material}
                                />
                                {formErrors.material && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.material}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
                            <div className="form-group flex-1">
                                <label htmlFor="measures" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fa-solid fa-ruler-vertical mr-2"></i>
                                    Medidas
                                </label>
                                <input
                                    type="text"
                                    id="measures"
                                    name="measures"
                                    placeholder="Ingresa las medidas del producto"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.measures}
                                />
                                {formErrors.measures && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.measures}
                                    </span>
                                )}
                            </div>

                            <div className="form-group flex-1">
                                <label htmlFor="printingMeasures" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fa-solid fa-ruler-combined mr-2"></i>
                                    Medidas de Impresión
                                </label>
                                <input
                                    type="text"
                                    id="printingMeasures"
                                    name="printingMeasures"
                                    placeholder="Ingresa las medidas del producto"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.printingMeasures}
                                />
                                {formErrors.printingMeasures && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.printingMeasures}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
                            {/* Precio */}
                            <div className="form-group flex-1">
                                <label htmlFor="price" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fa-solid fa-hand-holding-dollar mr-2"></i>
                                    Precio
                                </label>
                                <input
                                    name='price'
                                    type="number"
                                    min="0"
                                    placeholder="Ingresa el precio"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                    focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                    text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.price}
                                />
                                {formErrors.price && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.price}
                                    </span>
                                )}
                            </div>

                            {/* Cantidad mínima */}
                            <div className="form-group flex-1">
                                <label htmlFor="minQuantity" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                    <i className="fa-solid fa-layer-group mr-2"></i>
                                    Cantidad mínima
                                </label>
                                <input
                                    name='minQuantity'
                                    type="number"
                                    min="1"
                                    placeholder="Cantidad mínima"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                    focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                    text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.minQuantity}
                                />
                                {formErrors.minQuantity && (
                                    <span className="text-red-500 text-xs flex items-center mt-1">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {formErrors.minQuantity}
                                    </span>
                                )}
                            </div>
                        </div>


                        {/* --- Sección de colores dinámicos --- */}
                        <div className="colors-section">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block font-semibold text-[#9F531B] text-sm sm:text-base">
                                    <i className="fas fa-palette mr-2"></i>
                                    Colores del producto
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddColor}
                                    className="px-3 py-1 text-xs md:px-4 md:py-1 md:text-sm rounded-lg font-semibold transition-all duration-300
                                    text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]
                                    shadow hover:shadow-md flex items-center gap-1"
                                >
                                    <i className="fa-solid fa-plus"></i>
                                    Agregar
                                </button>
                            </div>

                            {colors.map((colorGroup, index) => (
                                <div key={index} className="color-group mt-4 p-4 bg-[#9F531B]/5 rounded-lg border border-[#9F531B]/20">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-[#9F531B] font-medium">Color {index + 1}</h4>
                                        {colors.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveColor(index)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                <i className="fa-solid fa-trash"></i> Eliminar
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#9F531B] mb-1">Nombre del color</label>
                                            <input
                                                type="text"
                                                name={`colors[${index}][color]`}
                                                value={colorGroup.color}
                                                onChange={(e) => handleColorChange(index, 'color', e.target.value)}
                                                placeholder="Ej: Blanco"
                                                className="w-full px-3 py-2 rounded-lg bg-white text-gray-700 border border-[#9F531B]/30 
                                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9F531B] 
                                                focus:border-[#9F531B] text-xs sm:text-sm"
                                            />
                                            {formErrors[`colors[${index}].color`] && (
                                                <span className="text-red-500 text-xs flex items-center mt-1">
                                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                                    {formErrors[`colors[${index}].color`]}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#9F531B] mb-1">Código HEX</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    name={`colors[${index}][hex]`}
                                                    value={colorGroup.hex}
                                                    onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                                                    placeholder="#FFFFFF"
                                                    className="w-full px-3 py-2 rounded-lg bg-white text-gray-700 border border-[#9F531B]/30 
                                                    placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9F531B] 
                                                    focus:border-[#9F531B] text-xs sm:text-sm"
                                                />
                                                {colorGroup.hex && (
                                                    <div
                                                        className="ml-2 w-8 h-8 rounded border border-gray-300"
                                                        style={{ backgroundColor: colorGroup.hex }}
                                                        title="Previsualización del color"
                                                    />
                                                )}
                                            </div>
                                            {formErrors[`colors[${index}].hex`] && (
                                                <span className="text-red-500 text-xs flex items-center mt-1">
                                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                                    {formErrors[`colors[${index}].hex`]}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#9F531B] mb-1">Imagen</label>
                                            <input
                                                type="file"
                                                name={`colors[${index}][image]`}
                                                onChange={(e) => handleColorChange(index, 'image', e.target.files[0])}
                                                className="w-full px-3 py-2 rounded-lg bg-white text-gray-700 border border-[#9F531B]/30 
                                                placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9F531B] 
                                                focus:border-[#9F531B] text-xs "
                                                accept=".jpg, .jpeg"
                                            />


                                            {colorGroup.image && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Archivo actual: <span className="font-medium">
                                                        {typeof colorGroup.image === 'string' ? colorGroup.image : colorGroup.image.name}
                                                    </span>
                                                </p>
                                            )}

                                            {formErrors[`colors[${index}].image`] && (
                                                <span className="text-red-500 text-xs flex items-center mt-1">
                                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                                    {formErrors[`colors[${index}].image`]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {formData.colors.length > 1 && (
                        <div className="form-group">
                            <label htmlFor="minQuantity" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                <i className="fa-solid fa-image mr-2"></i>
                                Imagen general de todos los colores
                            </label>
                            <input
                                type="file"
                                name='generalImage'
                                onChange={(e) => handleImageChange(e.target.files[0])}
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30 
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                accept=".jpg, .jpeg"
                            />
                            {formData.generalImage && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Archivo actual: <span className="font-medium">
                                        {/* Aquí está el cambio */}
                                        {typeof formData.generalImage === 'string' ? formData.generalImage : formData.generalImage.name}
                                    </span>
                                </p>
                            )}
                            {formErrors.generalImage && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.generalImage}
                                </span>
                            )}
                        </div>
                    )}

                    <div className='flex justify-center pt-4'>
                        <button
                            className={`px-7 py-1 text-sm md:px-10 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                            text-[#EEEEEF] ${loading ? 'bg-[#8e8e92] cursor-not-allowed hover:-translate-y-1' : 'bg-[#9F531B] hover:bg-[#7C3E13] hover:-translate-y-1'}
                            shadow-lg hover:shadow-xl flex items-center gap-2`}
                            type="submit"
                            disabled={loading}
                        >

                            {isEdit ? (
                                <>
                                    <i className="fa-solid fa-pencil"></i>
                                    {loading ? 'Cargando...' : 'Actualizar Producto'}
                                </>

                            ) : (
                                <>
                                    <i className="fa-solid fa-circle-plus"></i>
                                    {loading ? 'Cargando...' : 'Crear Producto'}
                                </>
                            )}

                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

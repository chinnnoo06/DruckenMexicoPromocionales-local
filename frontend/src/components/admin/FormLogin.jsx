import { useForm } from '../../hooks/useForm';
import { useFormLogin } from '../../hooks/useFormLogin';

export const FormLogin = () => {
    const { formData, manageChange } = useForm({
        username: '',
        password: ''
    })

    const {passwordVisibility, sendForm, message, showPassword, formErrors, loading} = useFormLogin(formData);

    return (
        <div className='form-container flex flex-col justify-center items-center'>
            <div className=' bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-2xl p-4 sm:p-6  w-full md:w-1/2'>

                <div className="text-center mb-8">
                    <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-2 flex items-center justify-center gap-2">
                        <i className="fa-solid fa-circle-user"></i>
                        Iniciar Sesión
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                        Ingresa tus credenciales correctamente para poder iniciar sesión
                    </p>
                    {message && <p className="mt-2 text-red-600 text-center text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">{message}</p>}

                </div>

                <form className='space-y-6 flex-1 flex flex-col' onSubmit={sendForm}>

                    <div className="flex-1 space-y-6">
                        <div className="form-group">
                            <label htmlFor="username" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base ">
                                <i className="fas fa-user mr-2"></i>
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Escribe tu usuario"
                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                onChange={manageChange}
                                value={formData.username}
                            />
                            {formErrors.username && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.username}
                                </span>
                            )}

                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="block font-semibold text-[#9F531B] mb-2 text-sm sm:text-base">
                                <i className="fas fa-lock mr-2"></i>
                                Contraseña
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Escribe tu contraseña"
                                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 border-2 border-[#9F531B]/30
                                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9F531B] 
                                    focus:border-[#9F531B] focus:bg-white transition-all duration-300 
                                    text-xs sm:text-sm md:text-base hover:border-[#9F531B]/50"
                                    onChange={manageChange}
                                    value={formData.password}
                                />

                                <span
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#9F531B] hover:text-[#7C3E13]"
                                    onClick={passwordVisibility}
                                >
                                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </span>
                            </div>
                            {formErrors.password && (
                                <span className="text-red-500 text-xs flex items-center mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {formErrors.password}
                                </span>
                            )}
                        </div>


                    </div>

                    <div className='flex justify-center pt-4'>
                        <button
                            className={`px-7 py-1 text-sm md:px-10 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                            text-[#EEEEEF] ${loading ? 'bg-[#8e8e92] cursor-not-allowed hover:-translate-y-1' : 'bg-[#9F531B] hover:bg-[#7C3E13] hover:-translate-y-1'}
                            shadow-lg hover:shadow-xl flex items-center gap-2`}
                            type="submit"
                            disabled={loading}
                        >
                            <i className="fa-solid fa-right-to-bracket"></i>
                            {loading ? 'Cargando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

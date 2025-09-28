import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';

export const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWrapper className='container-main-content flex flex-col pt-32 pb-20 gap-5 mx-auto max-w-[1300px]'>

      <div className="text-center mb-8">
        <h1 className='text-[#9F531B] titulo-seccion font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
          Política de Privacidad
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
        </h1>
        <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
          Información sobre cómo recopilamos, usamos y protegemos tus datos personales.
        </p>
      </div>

      <div className=" bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg p-8 space-y-6">

        {/* Responsable */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">1. Responsable del Tratamiento</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            <strong className='text-[#9F531B]'>Drucken México Promocionales</strong><br />
            Empresa mexicana dedicada a la distribución de artículos promocionales desde 2016.<br />
            <strong className='text-[#9F531B]'>Email:</strong> drucken2016@hotmail.com<br />
            <strong className='text-[#9F531B]'>Teléfono:</strong> +52 33 1587 6207
          </p>
        </section>

        {/* Datos Recopilados */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">2. Datos que Recopilamos</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Solo recopilamos la información que nos proporcionas voluntariamente a través de nuestro formulario de contacto:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li><strong className='text-[#9F531B]'>Nombre:</strong> Para identificarte y personalizar nuestra comunicación</li>
            <li><strong className='text-[#9F531B]'>Título del mensaje:</strong> Para entender el tema de tu consulta</li>
            <li><strong className='text-[#9F531B]'>Contenido del mensaje:</strong> Para atender tu solicitud específica</li>
          </ul>
        </section>

        {/* Propósito */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">3. Propósito del Tratamiento</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Utilizamos tus datos personales únicamente para:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Responder a tu consulta o solicitud</li>
            <li>Proporcionarte información sobre nuestros productos y servicios</li>
            <li>Enviarte cotizaciones y propuestas comerciales</li>
            <li>Mantener comunicación contigo por email y WhatsApp</li>
          </ul>
        </section>

        {/* Base Legal */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">4. Base Legal</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            El tratamiento de tus datos personales se basa en:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li><strong className='text-[#9F531B]'>Consentimiento:</strong> Al enviar el formulario, consientes el tratamiento de tus datos</li>
            <li><strong className='text-[#9F531B]'>Interés legítimo:</strong> Para brindarte el mejor servicio y atención</li>
          </ul>
        </section>

        {/* Almacenamiento */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">5. Almacenamiento y Seguridad</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            <strong className='text-[#9F531B]'>Tiempo de retención:</strong> Tus datos se conservan únicamente el tiempo necesario para atender tu consulta y mantener comunicación contigo.<br /><br />
            <strong className='text-[#9F531B]'>Medidas de seguridad:</strong> Implementamos medidas técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.
          </p>
        </section>

        {/* Compartir Datos */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">6. Compartir Información</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            <strong className='text-[#9F531B]'>No vendemos, alquilamos o compartimos</strong> tus datos personales con terceros, excepto:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Cuando sea requerido por ley o autoridad competente</li>
            <li>Con tu consentimiento expreso</li>
            <li>Para procesar tu solicitud (proveedores de servicios necesarios)</li>
          </ul>
        </section>

        {/* Derechos */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">7. Tus Derechos</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Tienes derecho a:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li><strong className='text-[#9F531B]'>Acceso:</strong> Solicitar información sobre los datos que tenemos de ti</li>
            <li><strong className='text-[#9F531B]'>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
            <li><strong className='text-[#9F531B]'>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
            <li><strong className='text-[#9F531B]'>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
            <li><strong className='text-[#9F531B]'>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
          </ul>
        </section>

        {/* Contacto */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">8. Contacto para Privacidad</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Para ejercer tus derechos o realizar consultas sobre esta política, contáctanos en:<br /><br />
            <strong className='text-[#9F531B]'>Email:</strong> drucken2016@hotmail.com<br />
            <strong className='text-[#9F531B]'>Teléfono:</strong> +52 33 1587 6207<br />
            <strong className='text-[#9F531B]'>WhatsApp:</strong> +52 33 1587 6207<br /><br />
          </p>
        </section>

        {/* Cambios */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">9. Cambios en la Política</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio web. Te recomendamos revisar esta política periódicamente.
          </p>
        </section>

        {/* Autoridades */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">10. Autoridades Supervisoras</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Si consideras que tus derechos han sido vulnerados, puedes presentar una denuncia ante el <strong>INAI</strong> (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).
          </p>
        </section>

        {/* Fecha */}
        <section className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm">
            <strong className='text-[#9F531B]'>Última actualización:</strong> Septiembre 2025<br />
          </p>
        </section>

      </div>

    </SectionWrapper>
  );
};

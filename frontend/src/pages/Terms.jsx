import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';

export const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWrapper className='container-main-content flex flex-col pt-32 pb-20 gap-5 mx-auto max-w-[1300px]'>

      <div className="text-center mb-8">
        <h1 className='text-[#9F531B] titulo-seccion font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
          Términos y Condiciones
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
        </h1>
        <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
          Condiciones de uso de nuestro sitio web y servicios.
        </p>
      </div>

      <div className=" bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg p-8 space-y-6">

        {/* Aceptación */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">1. Aceptación de Términos</h3>
          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le recomendamos no usar nuestro sitio.
          </p>
        </section>

        {/* Uso del Sitio */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">2. Uso del Sitio Web</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Este sitio web es propiedad de <strong className='text-[#9F531B]'>Drucken México Promocionales</strong></li>
            <li>El contenido está destinado únicamente para uso informativo y comercial</li>
            <li>Se prohíbe el uso no autorizado, reproducción o distribución del contenido</li>
            <li>Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento</li>
          </ul>
        </section>

        {/* Información y Contacto */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">3. Información y Contacto</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>La información proporcionada en el sitio web es para fines informativos</li>
            <li>Los precios y disponibilidad están sujetos a cambios sin previo aviso</li>
            <li>Las imágenes son representativas y pueden variar del producto final</li>
            <li>Para información actualizada, contáctenos directamente</li>
          </ul>
        </section>

        {/* Formulario de Contacto */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">4. Formulario de Contacto</h3>
          <p className="text-gray-700 leading-relaxed">
            Al enviar información a través de nuestro formulario de contacto, usted:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Proporciona información verdadera y precisa</li>
            <li>Consiente el tratamiento de sus datos personales</li>
            <li>Autoriza que nos comuniquemos con usted por email y WhatsApp</li>
            <li>Acepta recibir información comercial relacionada con nuestros servicios</li>
          </ul>
        </section>

        {/* Comunicaciones */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">5. Comunicaciones</h3>
          <p className="text-gray-700 leading-relaxed text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
            Nos comunicaremos con usted a través de:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li><strong className='text-[#9F531B]'>Email:</strong> Para respuestas a consultas y cotizaciones</li>
            <li><strong className='text-[#9F531B]'>WhatsApp:</strong> Para respuestas a consultas y cotizaciones de forma más rápida</li>
          </ul>
          <p className="text-gray-700 leading-relaxed text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] mt-4">
            Puede solicitar la cancelación de comunicaciones en cualquier momento. Respetamos su privacidad y no compartimos su información con terceros.
          </p>
        </section>

        {/* Propiedad Intelectual */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">6. Propiedad Intelectual</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Todo el contenido del sitio web es propiedad de <strong className='text-[#9F531B]'>Drucken México Promocionales</strong></li>
            <li>El logo esta protegido por derechos de autor</li>
            <li>Se prohíbe la reproducción sin autorización expresa</li>
            <li>Las imágenes de productos son propiedad de sus respectivos fabricantes</li>
          </ul>
        </section>

        {/* Limitación de Responsabilidad */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">7. Limitación de Responsabilidad</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>La información proporcionada es "tal como está" sin garantías</li>
            <li>No nos hacemos responsables por daños indirectos o consecuenciales</li>
            <li>No garantizamos la disponibilidad ininterrumpida del sitio web</li>
            <li>La responsabilidad máxima se limita al valor de los servicios contratados</li>
          </ul>
        </section>

        {/* Enlaces Externos */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">8. Enlaces Externos</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Nuestro sitio puede contener enlaces a sitios web de terceros</li>
            <li>No somos responsables del contenido de sitios web externos</li>
            <li>Los enlaces se proporcionan únicamente para su conveniencia</li>
            <li>El uso de sitios externos está sujeto a sus propios términos</li>
          </ul>
        </section>

        {/* Modificaciones */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">9. Modificaciones</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Nos reservamos el derecho de modificar estos términos en cualquier momento</li>
            <li>Los cambios entrarán en vigor inmediatamente después de su publicación</li>
            <li>Continuar usando el sitio después de los cambios constituye aceptación</li>
            <li>Notificaremos cambios importantes cuando sea posible</li>
          </ul>
        </section>

        {/* Ley Aplicable */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">10. Ley Aplicable</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li>Estos términos se rigen por las leyes mexicanas</li>
            <li>Cualquier disputa se resolverá en los tribunales competentes de México</li>
            <li>Los términos están sujetos a cambios sin previo aviso</li>
            <li>La versión en español prevalece sobre cualquier traducción</li>
          </ul>
        </section>

        {/* Contacto */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">11. Contacto</h3>
          <p className="text-gray-700 leading-relaxed text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
            Para consultas sobre estos términos, contáctenos a través de:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li><strong className='text-[#9F531B]'>Email:</strong> ventas@druckenmexico.com</li>
            <li><strong className='text-[#9F531B]'>Teléfono:</strong> +52 33 1823 7277</li>
            <li><strong className='text-[#9F531B]'>WhatsApp:</strong> +52 33 1823 7277</li>
          </ul>
        </section>

        {/* Información de la Empresa */}
        <section>
          <h3 className="text-[#9F531B] font-bold text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] mb-4">12. Información de la Empresa</h3>
          <ul className="list-disc list-inside text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] ml-4 space-y-2">
            <li><strong className='text-[#9F531B]'>Nombre:</strong> Drucken México Promocionales</li>
            <li><strong className='text-[#9F531B]'>Servicios:</strong> Artículos promocionales y servicios de impresión</li>
            <li><strong className='text-[#9F531B]'>Años de experiencia:</strong> Desde 2016</li>
            <li><strong className='text-[#9F531B]'>Cobertura:</strong> México</li>
          </ul>
        </section>

        {/* Fecha */}
        <section className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm">
            <strong className='text-[#9F531B]'>Última actualización:</strong> Agosto 2025<br />
          </p>
        </section>

      </div>

    </SectionWrapper>
  );
};

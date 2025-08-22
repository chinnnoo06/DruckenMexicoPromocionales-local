import React, { useEffect } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';

export const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWrapper className='container-main-content flex flex-col pt-32 pb-20 gap-5 mx-auto max-w-[1300px]'>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className='text-[#9F531B] font-bold text-4xl md:text-5xl lg:text-6xl mb-6 relative inline-block'>
            Política de Privacidad
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Información sobre cómo recopilamos, usamos y protegemos tus datos personales.
          </p>
        </div>

        <div className=" bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg p-8 space-y-6">
          
          {/* Responsable */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Drucken México Promocionales</strong><br />
              Empresa mexicana dedicada a la distribución de artículos promocionales desde 2016.<br />
              <strong>Email:</strong> ventas@druckenmexico.com<br />
              <strong>Teléfono:</strong> +52 33 1823 7277
            </p>
          </section>

          {/* Datos Recopilados */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">2. Datos que Recopilamos</h2>
            <p className="text-gray-700 leading-relaxed">
              Solo recopilamos la información que nos proporcionas voluntariamente a través de nuestro formulario de contacto:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li><strong>Nombre:</strong> Para identificarte y personalizar nuestra comunicación</li>
              <li><strong>Email:</strong> Para responder a tu consulta y enviarte información</li>
              <li><strong>Título del correo:</strong> Para entender el tema de tu consulta</li>
              <li><strong>Contenido del mensaje:</strong> Para atender tu solicitud específica</li>
            </ul>
          </section>

          {/* Propósito */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">3. Propósito del Tratamiento</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos tus datos personales únicamente para:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li>Responder a tu consulta o solicitud</li>
              <li>Proporcionarte información sobre nuestros productos y servicios</li>
              <li>Enviarte cotizaciones y propuestas comerciales</li>
              <li>Mantener comunicación contigo por email y WhatsApp</li>
            </ul>
          </section>

          {/* Base Legal */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">4. Base Legal</h2>
            <p className="text-gray-700 leading-relaxed">
              El tratamiento de tus datos personales se basa en:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li><strong>Consentimiento:</strong> Al enviar el formulario, consientes el tratamiento de tus datos</li>
              <li><strong>Interés legítimo:</strong> Para brindarte el mejor servicio y atención</li>
            </ul>
          </section>

          {/* Almacenamiento */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">5. Almacenamiento y Seguridad</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Tiempo de retención:</strong> Tus datos se conservan únicamente el tiempo necesario para atender tu consulta y mantener comunicación contigo.<br /><br />
              <strong>Medidas de seguridad:</strong> Implementamos medidas técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          {/* Compartir Datos */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">6. Compartir Información</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>No vendemos, alquilamos o compartimos</strong> tus datos personales con terceros, excepto:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li>Cuando sea requerido por ley o autoridad competente</li>
              <li>Con tu consentimiento expreso</li>
              <li>Para procesar tu solicitud (proveedores de servicios necesarios)</li>
            </ul>
          </section>

          {/* Derechos */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">7. Tus Derechos</h2>
            <p className="text-gray-700 leading-relaxed">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos de ti</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
              <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
            </ul>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">8. Contacto para Privacidad</h2>
            <p className="text-gray-700 leading-relaxed">
              Para ejercer tus derechos o realizar consultas sobre esta política, contáctanos en:<br /><br />
              <strong>Email:</strong> ventas@druckenmexico.com<br />
              <strong>Teléfono:</strong> +52 33 1823 7277<br />
              <strong>WhatsApp:</strong> +52 33 1823 7277<br /><br />
            </p>
          </section>

          {/* Cambios */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">9. Cambios en la Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio web. Te recomendamos revisar esta política periódicamente.
            </p>
          </section>

          {/* Autoridades */}
          <section>
            <h2 className="text-[#9F531B] font-bold text-2xl mb-4">10. Autoridades Supervisoras</h2>
            <p className="text-gray-700 leading-relaxed">
              Si consideras que tus derechos han sido vulnerados, puedes presentar una denuncia ante el <strong>INAI</strong> (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).
            </p>
          </section>

          {/* Fecha */}
          <section className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-sm">
              <strong>Última actualización:</strong> Agosto 2024<br />
            </p>
          </section>

        </div>
      </div>
    </SectionWrapper>
  );
};

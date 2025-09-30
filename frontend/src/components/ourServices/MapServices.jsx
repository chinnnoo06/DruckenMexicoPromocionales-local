import React, { useState, useEffect } from 'react';

export const MapServices = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

// Componente separado para manejar rotación de imágenes
const ServiceCard = ({ service }) => {
  const [currentImage, setCurrentImage] = useState(
    service.images ? service.images[0] : service.image
  );

  useEffect(() => {
    if (!service.images || service.images.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % service.images.length;
      setCurrentImage(service.images[index]);
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [service.images]);

  return (
    <div className="bg-gradient-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-60 overflow-hidden">
        <img
          src={currentImage}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[#9F531B] font-semibold text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] mb-3">
          {service.name}
        </h3>
        <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
};

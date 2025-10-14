import React, { useState } from 'react';

const CategoryDropdown = ({ searchCategory, selectCategory }) => {
  const [open, setOpen] = useState(false);

  const categories = [
    { value: "all", label: "Todos" },
    { value: "Bebidas", label: "Bebidas" },
    { value: "Arte", label: "Arte" },
    { value: "Bic", label: "Bic" },
    { value: "Bolígrafos Metálicos", label: "Bolígrafos Metálicos" },
    { value: "Bolígrafos Multifuncionales", label: "Bolígrafos Multifuncionales" },
    { value: "Bolígrafos de Plástico", label: "Bolígrafos de Plástico" },
    { value: "Oficina", label: "Oficina" },
    { value: "Agendas", label: "Agendas" },

  ];

  const selected = categories.find(c => c.value === searchCategory) || categories[0];

  // Función para truncar solo en el botón principal
  const truncateLabel = (label, maxLength = 15) => {
    return label.length > maxLength ? label.slice(0, maxLength) + "..." : label;
  };

  return (
    <div className="relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/6">
      {/* Botón principal */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-4 py-2 text-xs sm:text-sm md:text-base 
                  rounded-lg border-2  bg-white text-[#9F531B] border-[#9F531B]/30 focus:outline-none focus:ring-2 focus:ring-[#9F531B]/50 focus:border-[#9F531B] transition-all duration-300 hover:border-[#9F531B]/50"
      >
        <span>{truncateLabel(selected.label)}</span>
        <svg
          className={`w-4 h-4 text-[#9F531B] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-[#9F531B]/30 rounded-lg shadow-lg overflow-hidden animate-fadeIn max-h-72  overflow-y-auto ">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                selectCategory(category.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm md:text-base 
                         transition-colors duration-200
                ${searchCategory === category.value
                  ? "bg-[#FFD8A8] text-[#9F531B] font-semibold"
                  : "text-gray-700 hover:bg-[#FBE8D3] hover:text-[#9F531B]"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

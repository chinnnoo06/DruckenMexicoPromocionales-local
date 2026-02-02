import { SectionWrapper } from '../components/layout/SectionWrapper';
import { MapCatalog } from '../components/catalog/MapCatalog';
import { PaginationButtons } from '../components/catalog/PaginationButtons';
import { useCatalog } from '../hooks/useCatalog';
import CategoryDropdown from '../components/catalog/CategoryDropdown ';
import { useScrollElementFromLocation } from '../hooks/useScrollElementFromLocation';
import { catalogs } from '../data';

export const Catalog = () => {
  const isAdmin = location.pathname.startsWith('/catalogo-admin')
  const { products, totalPages, currentPage, setPage, loading, setLoading, searchQuery, setSearchQuery, currentCategory, selectCategory} = useCatalog(isAdmin);

  useScrollElementFromLocation({ products })

  return (
    <SectionWrapper className='container-main-content flex flex-col pt-32 pb-20 gap-5 mx-auto max-w-[1300px]'>
      <div className="text-center">
        <h1 className='text-[#9F531B] titulo-seccion font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
          Catálogo
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
        </h1>
        <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
          Explora nuestros productos promocionales y revisa los catálogos completos en los siguientes enlaces.
        </p>

        {/* Enlaces de catálogos - Minimalista compacto */}
        <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 px-2'>
          {catalogs.map((catalog, index) => (
            <a
              key={index}
              href={catalog.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
              group flex items-center gap-2 sm:gap-3
              bg-white border-2 border-[#9F531B] 
              rounded-lg sm:rounded-xl px-2 py-1 sm:px-3 
              transition-all duration-300 
              hover:shadow-md
              min-w-[130px] sm:min-w-[140px] flex-1 max-w-[160px] sm:max-w-[180px]
              hover:scale-105 transform-gpu
              hover:border-[#D9773B] hover:bg-gradient-to-r hover:from-[#FBE8D3] hover:to-[#FFD8A8]
            `}
            >
              <div className={`text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                {catalog.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-[#9F531B] text-xs sm:text-sm leading-tight truncate`}>
                  {catalog.title}
                </h3>
              </div>

              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9F531B] flex items-center justify-center text-white text-[10px] sm:text-xs transform transition-transform duration-300 group-hover:translate-x-0.5 flex-shrink-0`}>
                <i className="fa-solid fa-square-up-right"></i>
              </div>
            </a>
          ))}
        </div>


      </div>

      {/* Barra de búsqueda */}
      <div className='flex flex-col md:flex-row w-full gap-2 items-stretch'>
        <div className="relative flex-grow">
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            name="query"
            placeholder="Buscar por nombre o clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm md:text-base w-full pl-10 pr-4 py-2 rounded-lg border-2 border-[#9F531B]/30 focus:outline-none focus:ring-2 focus:ring-[#9F531B]/50 focus:border-[#9F531B] transition-all duration-300 hover:border-[#9F531B]/50"
          />
        </div>

        <CategoryDropdown currentCategory={currentCategory} selectCategory={selectCategory} />

      </div>

      <MapCatalog products={products} loading={loading} currentPage={currentPage} currentCategory={currentCategory} isAdmin={isAdmin} />

      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={(p) => {
          setPage(p);
        }}
        bool={products.length > 0 && !loading}
      />
    </SectionWrapper>
  );
};
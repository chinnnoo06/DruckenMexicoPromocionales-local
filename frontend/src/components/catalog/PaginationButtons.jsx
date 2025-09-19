import React from 'react'

export const PaginationButtons = ({ totalPages, page, setPage, bool, setLoading }) => {

    const goToPage = (pageNumber) => {
        if (pageNumber < 1) pageNumber = 1;
        else if (pageNumber > totalPages) pageNumber = totalPages;
        setPage(pageNumber);
        
        setTimeout(() => {
             window.scrollTo(0, 0);
        }, 500)
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage, endPage;

        if (totalPages <= 5) {
            // Si hay 5 páginas o menos, mostrar todas
            startPage = 1;
            endPage = totalPages;
        } else {
            // Más de 5 páginas → mover el rango
            if (page <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (page + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = page - 2;
                endPage = page + 2;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-2 py-1 sm:px-2 sm:py-1 md:px-4 md-py-2 lg:px-4 lg:py-2 text-sm md:text-base font-bold rounded ${page === i
                        ? 'bg-[#9F531B] text-[#EEEEEF] hover:bg-[#7C3E13]'
                        : 'bg-[#f8dcc6] border border-[#9F531B] text-[#1A1615]/70 hover:bg-[#9F531B] hover:text-[#EEEEEF] transition'
                        }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            {bool && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    {/* Botón anterior */}
                    <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        className={`px-2 py-1 md:px-4 md-py-1 text-xs md:text-base font-bold rounded ${page === 1 ? 'bg-[#9F531B]/50 text-[#EEEEEF]/40 cursor-not-allowed' : 'bg-[#9F531B] text-[#EEEEEF] hover:bg-[#7C3E13]'}`}
                    >
                        &lt;
                    </button>

                    {/* Botones de página */}
                    {renderPageNumbers()}

                    {/* Botón siguiente */}
                    <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        className={`px-2 py-1 md:px-4 md-py-1 text-xs md:text-base font-bold rounded ${page === totalPages ? 'bg-[#9F531B]/50 text-[#EEEEEF]/40 cursor-not-allowed' : 'bg-[#9F531B] text-[#EEEEEF] hover:bg-[#7C3E13]'}`}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </>

    )
}

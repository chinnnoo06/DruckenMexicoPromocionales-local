import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Fetch } from "../helpers/Fetch";
import { Global } from "../helpers/Global";

export const useCatalog = () => {
    const { category = "todos", page = "1" } = useParams();
    const navigate = useNavigate();

    const currentPage = Number(page);
    const currentCategory = category

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const pendingScrollY = useRef(0);

    const fetchProducts = async () => {
        setProducts([])
        setLoading(true);

        let data;

        if (searchQuery.trim() === '') {
            data = await Fetch(`${Global.url}product/obtener-productos/${currentCategory}/${currentPage}`, "GET");
        } else {
            data = await Fetch(`${Global.url}product/buscar-productos/${currentCategory}/${searchQuery}/${currentPage}`, "GET");
        }

        if (data.status === "success") {
            setProducts(data.products);
            setTotalPages(data.pages);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        window.scrollTo(0, pendingScrollY.current);
        pendingScrollY.current = 0;
    }, [currentCategory, currentPage]);

    // Fetch cuando cambia el search (estado)
    useEffect(() => {
        if (searchQuery.trim() === "") return;

        const timeout = setTimeout(() => {
            pendingScrollY.current = 0;
            navigate(`/catalogo/${currentCategory}/1`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    // Hacer scroll después de que los productos se carguen
    useEffect(() => {
        if (!loading) {
            window.scrollTo(0, pendingScrollY.current);
            pendingScrollY.current = 0;
        }
    }, [loading]);


    // Cambiar categoría → URL
    const selectCategory = (newCategory) => {
        pendingScrollY.current = window.scrollY;
        navigate(`/catalogo/${newCategory}/1`);
    };

    // Cambiar página → URL
    const setPage = (newPage) => {
        pendingScrollY.current = window.scrollY;
        navigate(`/catalogo/${currentCategory}/${newPage}`);
    };

    return { products, totalPages, currentPage, setPage, loading, setLoading, currentCategory, setSearchQuery, selectCategory, pendingScrollY };
};

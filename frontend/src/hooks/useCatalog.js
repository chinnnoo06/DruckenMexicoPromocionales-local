import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Fetch } from "../helpers/Fetch";
import { Global } from "../helpers/Global";

export const useCatalog = (isAdmin) => {

    const { category = "todos", page = "1" } = useParams();
    const navigate = useNavigate();

    const currentPage = Number(page);
    const currentCategory = category

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentCategory, currentPage, searchQuery]);

    // Cambiar categoría → URL
    const selectCategory = (newCategory) => {
        if (isAdmin) {
            navigate(`/catalogo-admin/${newCategory}/1`);
        } else {
            navigate(`/catalogo/${newCategory}/1`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Cambiar página → URL
    const setPage = (newPage) => {
        if (isAdmin) {
            navigate(`/catalogo-admin/${currentCategory}/${newPage}`);
        } else {
            navigate(`/catalogo/${currentCategory}/${newPage}`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { products, totalPages, currentPage, setPage, loading, setLoading, currentCategory, setSearchQuery, selectCategory };
};

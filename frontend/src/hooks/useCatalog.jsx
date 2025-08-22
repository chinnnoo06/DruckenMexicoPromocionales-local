import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { getProducts, findProducts, selectCategory as selectCategoryHelper } from '../helpers/CatalogHelpers';

export const useCatalog = (isAdmin = false) => {
    const [searchCategory, setSearchCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const pendingScrollY = useRef(0);
    const location = useLocation();

    const fetchProducts = async (p = page) => {
        setLoading(true);
        let data;
        if (searchQuery.trim() === '') {
            data = await getProducts(searchCategory, p, isAdmin);
        } else {
            data = await findProducts(searchCategory, searchQuery, p, isAdmin);
        }
        if (data.status === "success") {
            setProducts(data.products);
            setTotalPages(data.pages);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (location.state?.page) {
            setPage(location.state.page);
            pendingScrollY.current = location.state.scrollY || 0;
        } else {
            window.scrollTo(0, 0);
            setPage(1);
            pendingScrollY.current = 0;
        }
    }, [location.state]);

    // Cada vez que cambian searchCategory o page, se llama fetchProducts.
    useEffect(() => {
        if (page === null) return;
        fetchProducts(page);
    }, [searchCategory, page]);

    // Hacer scroll después de que los productos se carguen
    useEffect(() => {
        if (!loading) {
            window.scrollTo(0, pendingScrollY.current);
            pendingScrollY.current = 0;
        }
    }, [loading]);

    useEffect(() => {
        if (page === null) return;
        const delayDebounceFn = setTimeout(() => {
            setPage(1);
            fetchProducts(1);
            pendingScrollY.current = 0;
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const selectCategory = selectCategoryHelper(setSearchCategory);

    return { products, totalPages, page, setPage, loading, setLoading, searchCategory, setSearchQuery, selectCategory, pendingScrollY };
};

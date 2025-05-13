import axios from "axios";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../lib/utils";
import { Category } from "../types/Category";


/**
 * useCategories
 * 
 * @description
 * Custom React hook to fetch all categories from the backend.
 * 
 * ✅ Used to get all categories.
 */
export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/categories`, {
                withCredentials: true,
            })
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories");
            })
            .finally(() => setLoading(false));
    }, []);

    return { categories, loading, error };
}

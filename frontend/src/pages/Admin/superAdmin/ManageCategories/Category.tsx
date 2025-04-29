import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const Category = () => {
  const [categories, setCategories] = useState<CategoryColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/category/all-categories`);
        const data = res.data;

        const formatted: CategoryColumn[] = data.map((item: {
          id: string;
          name: string;
          videos?: any[];
          createdAt?: string;
        }) => ({
          id: item.id,
          categoryName: item.name,
          videos: item.videos?.length || 0,
          createdAt: item.createdAt ? format(new Date(item.createdAt), "MMMM do yyyy") : "Unknown"
        }));

        setCategories(formatted);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <CategoryClient data={categories} />
    </>
  );
};

export default Category;

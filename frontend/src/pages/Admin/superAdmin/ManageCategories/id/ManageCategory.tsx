import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddCategoryForm from "./components/AddCategoryForm";
import { BACKEND_URL } from "../../../../../lib/utils";





const ManageCategory = () => {
    const { id } = useParams<{ id: string }>();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (!id || id === "new") return;


        const fetchCategory = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/api/category/get-category/id/${id}`);
                setInitialData(res.data);
            } catch (err: any) {
                // console.error("Failed to fetch category:", err);
                setInitialData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    if (loading) {
        return <div className="p-4 text-gray-500">Loading category...</div>;
    }


    return (
        <section className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <AddCategoryForm initialData={initialData} />
            </div>
        </section>
    );
};

export default ManageCategory;

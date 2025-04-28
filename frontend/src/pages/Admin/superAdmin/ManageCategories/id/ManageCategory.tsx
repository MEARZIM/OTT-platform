import { useParams } from "react-router-dom";

import AddCategoryForm from "./components/AddCategoryForm"

const ManageCategory = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    return (
        <>
            <section className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    <AddCategoryForm initialData={null}/>
                </div>
            </section>
        </>
    )
}

export default ManageCategory

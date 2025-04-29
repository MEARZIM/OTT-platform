
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

import Heading from "../../../../../components/ui/heading"
import { Button } from "../../../../../components/ui/button"
import { Separator } from "../../../../../components/ui/separator"
import { AdminTable } from "../../../../../components/ui/admin-table"
import { CategoryColumn, columns } from "./columns"
import { ApiList } from "../../../../../components/ui/api-list"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient = ({
    data
}: CategoryClientProps) => {


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage Category of PrimeView"
                />
                <Button >
                    <Link to={"/super-admin/manage-categories/new"} className="flex gap-1 items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Category
                    </Link>
                </Button>
            </div>

            <Separator />
            <AdminTable columns={columns} data={data} searchKey="categoryName" />


            <Heading
                title={"API"}
                description={"API calls for Categories."}
            />
            <Separator />
            <ApiList entityName="category" entityIdName="categoryId"/>
        </>
    )
}
"use client"

import { Plus } from "lucide-react"

import Heading from "../../../../../components/ui/heading"
import { Button } from "../../../../../components/ui/button"
import { Separator } from "../../../../../components/ui/separator"
import { AdminTable } from "../../../../../components/ui/admin-table"
import { CategoryColumn, columns } from "./columns"
import { ApiList } from "../../../../../components/ui/api-list"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const AdminClient = ({
    data
}: CategoryClientProps) => {


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Admins (${data.length})`}
                    description="Manage Admin of PrimeView"
                />
                <Button >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Admin
                </Button>
            </div>

            <Separator />
            <AdminTable columns={columns} data={data} searchKey="name" />


            <Heading
                title={"API"}
                description={"API calls for Admins."}
            />
            <Separator />
            <ApiList entityName="admin" entityIdName="adminId"/>
        </>
    )
}
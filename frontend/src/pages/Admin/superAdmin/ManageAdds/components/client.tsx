"use client"

import { Plus } from "lucide-react"

import Heading from "../../../../../components/ui/heading"
import { Button } from "../../../../../components/ui/button"
import { Separator } from "../../../../../components/ui/separator"
import { AdminTable } from "../../../../../components/ui/admin-table"
import { Column, columns } from "./columns"
import { ApiList } from "../../../../../components/ui/api-list"
import { Link } from "react-router-dom"

interface ClientProps {
    data: Column[]
}

export const AddsClient = ({
    data
}: ClientProps) => {


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Manage Adds (${data.length})`}
                    description="Manage your Adds of PrimeView"
                />
                <Button >
                    <Link to={"/super-admin/manage-adds/new"} className="flex gap-1 items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Video
                    </Link>
                </Button>
            </div>

            <Separator />
            <AdminTable columns={columns} data={data} searchKey="status" />


            <Heading
                title={"API"}
                description={"API calls for Admins."}
            />
            <Separator />
            <ApiList entityName="contents/adds" entityIdName="addId"/>
        </>
    )
}
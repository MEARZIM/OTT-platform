"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type CategoryColumn
    = {
        id: string
        admin: string
        email: string
        video: number;
        createdAt: string
    }

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "admin",
        header: "Admin",
        cell: ({row}) => row.original.admin
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => row.original.email
    },
    {
        accessorKey: "videos",
        header: "Videos",
        cell: ({row}) => row.original.video
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original}/>
    }
]
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"



export type Column
    = {
        id: string
        title: string
        description: string
        status: string
        createdAt: string
    }

export const columns: ColumnDef<Column>[] = [
    {
        accessorKey: "title",
        header: "Add Title",
        cell: ({ row }) => row.original.title
    },
    {
        accessorKey: "description",
        header: "Add Description",
        cell: ({ row }) => row.original.description
    },
    {
        accessorKey: "status",
        header: "Add Status",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
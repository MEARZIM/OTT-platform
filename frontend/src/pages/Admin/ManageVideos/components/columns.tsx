"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"



export type Column
    = {
        id: string
        title: string
        description: string
        rating: number
        status: string
        createdAt: string
    }

export const columns: ColumnDef<Column>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => row.original.title
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description
    },
    {
        accessorKey: "videos",
        header: "Videos",
        cell: ({ row }) => row.original.rating
    },
    {
        accessorKey: "status",
        header: "Status",
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
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type CategoryColumn
    = {
        id: string
        categoryName: string
        video: number;
        createdAt: string
    }

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "Category Name",
        header: "Category Name",
        cell: ({row}) => row.original.categoryName
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
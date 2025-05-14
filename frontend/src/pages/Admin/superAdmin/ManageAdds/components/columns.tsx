"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"



export type Column
    = {
        id: string
        title: string
        description: string
        status: string
        type: string
        video: number
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
        cell: ({ row }) => row.original.description.slice(0,20)+"..."
    },
    {
        accessorKey: "type",
        header: "Add Type",
        cell: ({ row }) => row.original.type
    },
    {
        accessorKey: "addInUse",
        header: "Add In Use",
        cell: ({ row }) => row.original.video
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => row.original.createdAt
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
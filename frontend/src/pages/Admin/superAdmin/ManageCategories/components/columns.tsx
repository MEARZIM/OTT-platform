
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type CategoryColumn
    = {
        id: string
        categoryName: string
        videos: number;
        createdAt: string
    }

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "categoryName",
        header: "Category Name",
        cell: ({row}) => row.original.categoryName
    },
    {
        accessorKey: "videos",
        header: "Videos",
        cell: ({row}) => row.original.videos
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
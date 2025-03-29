"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import { CategoryColumn } from "./columns";
// import axios from "axios";
import { useState } from "react";
import { useToast } from "../../../../../hooks/use-toast";
import AlertModal from "../../../../../components/modals/alert-modal";
import { Link } from "react-router-dom";
// import AlertModal from "../../../../../components/modals/alert-modal";


interface CellActionProps {
    data: CategoryColumn;
}


export const CellAction = ({ data }: CellActionProps) => {


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            title: "Copied!",
            description: "The Admin ID has been copied to your clipboard.",
        });
    }

    const onDelete = async () => {
        try {

            setLoading(true);
            // TODO:: DELETE ADMIN

            toast({ title: "Admin Deleted." });

        } catch (error) {
            toast({
                title: "Error",
                description: "Internal Error",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                        <span className="sr-only">
                            Open Menu
                        </span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <Link
                            to={`/super-admin/manage-admins/${data.id}`}
                            className="flex gap-2 items-center"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Update
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
};
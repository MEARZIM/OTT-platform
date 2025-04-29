"use client"

// import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import { Button } from "../../../../../components/ui/button";
import { Column } from "./columns";
import { useToast } from "../../../../../hooks/use-toast";
import AlertModal from "../../../../../components/modals/alert-modal";


interface CellActionProps {
    data: Column;
}


export const CellAction = ({ data }: CellActionProps) => {


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            title: "Copied!",
            description: "The Add ID has been copied to your clipboard.",
        });
    }

    const onDelete = async () => {
        try {

            setLoading(true);
            // TODO:: DELETE ADMIN

            toast({ title: "Add Deleted." });

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
                            to={`/super-admin/manage-adds/${data.id}`}
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
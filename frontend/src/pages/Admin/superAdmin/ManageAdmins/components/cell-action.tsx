import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import { AdminColumn } from "./columns";

import { useToast } from "../../../../../hooks/use-toast";
import { Link } from "react-router-dom";


interface CellActionProps {
    data: AdminColumn;
}


export const CellAction = ({ data }: CellActionProps) => {

    const { toast } = useToast()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            title: "Copied!",
            description: "The Admin ID has been copied to your clipboard.",
        });
    }


    return (
        <>

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
                    
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
};
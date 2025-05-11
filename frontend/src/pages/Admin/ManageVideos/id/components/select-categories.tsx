import { Label } from "../../../../../components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "../../../../../components/ui/select";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../../components/ui/popover";

import { Checkbox } from "../../../../../components/ui/checkbox";
import { useEffect, useState } from "react";

interface Category {
    id: string;
    name: string;
}

interface SelectCategoryProps {
    categories: Category[] | null;
    selectedCategories: string[];
    setSelectedCategories: (prev: any) => void;
    loading: boolean
}

const SelectCategory = ({
    categories,
    selectedCategories,
    setSelectedCategories,
    loading
}: SelectCategoryProps) => {

    const [categoriesName, setCategoriesName] = useState("Select Categories");

    const toggleCategory = (category: Category) => {
        setSelectedCategories((prev: string[]) =>
            prev.includes(category.id)
                ? prev.filter((id) => id !== category.id)
                : [...prev, category.id]
        );
    };

    useEffect(() => {
        const getSelectedNames = () => {
            return categories
                ?.filter((cat) => selectedCategories.includes(cat.id))
                .map((cat) => cat.name)
                .join(", ") || "Select Categories";
        };
        setCategoriesName(getSelectedNames());
    }, [selectedCategories, categories])


    return (
        <div className="flex flex-col gap-2 my-4 w-full">
            <Label>Categories</Label>
            <Select disabled={loading}>
                <Popover>
                    <PopoverTrigger asChild>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={categoriesName}></SelectValue>
                        </SelectTrigger>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        {categories?.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
                            >
                                <Checkbox
                                    id={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onCheckedChange={() => toggleCategory(category)}
                                />
                                <Label htmlFor={category.id} className="text-sm">
                                    {category.name}
                                </Label>
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </Select>
        </div>
    );
};

export default SelectCategory;

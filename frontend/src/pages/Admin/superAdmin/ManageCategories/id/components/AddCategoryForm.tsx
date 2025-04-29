import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../../../components/ui/form";
import Heading from "../../../../../../components/ui/heading";
import { Input } from "../../../../../../components/ui/input";
import { useToast } from "../../../../../../hooks/use-toast";
import { BACKEND_URL } from "../../../../../../lib/utils";


interface AddCategoryFormProps {
    initialData: {
        name: string;
    } | null
}

const formSchema = z.object({
    categoryName: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
});


type FormValues = z.infer<typeof formSchema>;



const AddCategoryForm = ({ initialData }: AddCategoryFormProps) => {
    const { toast } = useToast()
    
    const [loading, setLoading] = useState(false);
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? { categoryName: initialData.name } : {
            categoryName: "",
        },
    });
    
    const action = initialData ? "Save Changes" : "Create";
    
    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData ? "Edit this Category" : "Add a new Category";

    
    
    const onSubmit = async (values: FormValues) => {
        const data = {
            "names":[values.categoryName]
        };
        try {
            setLoading(true);
            await axios.post(`${BACKEND_URL}/api/category/create-categories`, data);
            
            toast({
                title: "Category Created",
                description: "Your category has been created.",
                variant: "default", 
            });
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something went wrong",
                description: error.response.data.error,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            form.reset();
        }
    };

    return (
        <>
            <Heading
                title={title}
                description={description}
            />
            <div className="w-full space-y-4 rounded-lg border bg-white p-6 shadow-sm mx-4 my-5 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the category name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading} className="cursor-pointer">{action}</Button>
                    </form>
                </Form>

            </div>
        </>
    );
};

export default AddCategoryForm;

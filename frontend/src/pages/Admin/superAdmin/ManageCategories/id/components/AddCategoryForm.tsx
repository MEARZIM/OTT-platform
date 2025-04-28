import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../../../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../../../components/ui/form";
import Heading from "../../../../../../components/ui/heading";
import { Input } from "../../../../../../components/ui/input";

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

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryName: "",
        },
    });

    const action = initialData ? "Save Changes" : "Create";

    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData ? "Edit this Category" : "Add a new Category";


    const onSubmit = (values: FormValues) => {
        console.log(values);
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
                        <Button type="submit" className="cursor-pointer">{action}</Button>
                    </form>
                </Form>

            </div>
        </>
    );
};

export default AddCategoryForm;

import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../../../../components/ui/form"
import Heading from '../../../../../../components/ui/heading';
import { Button } from '../../../../../../components/ui/button';
import { Separator } from '../../../../../../components/ui/separator';
import { toast } from '../../../../../../hooks/use-toast';
import { Input } from '../../../../../../components/ui/input';
import { BACKEND_URL } from '../../../../../../lib/utils';

interface UpdateAdminFormProps {
    initialData: {
        name: string;
        email: string;
        password: string;
    } | null
}

const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(50, { message: "Name must be less than 50 characters." }),
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z
        .string()
        .min(1, { message: "This field has to be filled." }),
})

type AdminFormValues = z.infer<typeof formSchema>

const UpdateAdminForm = ({ initialData }: UpdateAdminFormProps) => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const action = initialData ? "Save Changes" : "Create";

    const title = initialData ? "Edit Admin" : "Create Admin";
    const description = initialData ? "Edit this Admin" : "Add a new Admin";
    const toastTitle = initialData ? "Admin updated." : "Admin created.";
    const toastDesc = initialData ? "Admin details updated." : "Admin is now active.";


    const form = useForm<AdminFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? { name: initialData.name ,email: initialData.email, password: "" }
            : { name:"" ,email: "", password: "" }
    });



    const onSubmit = async (data: AdminFormValues) => {
        try {

            setLoading(true);
            if (initialData) {
                await axios.patch(`${BACKEND_URL}/api/admin/update/${id}`, data)
            } else {
                await axios.post(`${BACKEND_URL}/api/admin/create`, data)
            }
            console.log(data);

            toast({
                title: toastTitle,
                description: toastDesc,
                variant: "default",
            })

            form.reset();
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
           
            <div className="flex justify-between items-center">
                <Heading
                    title={title}
                    description={description}
                />
            </div>
            <Separator />

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Name' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is admin{`'`}s Name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is admin{`'`}s email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is admin{`'`}s password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="ml-auto"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />


        </>
    )
}

export default UpdateAdminForm

import { z } from 'zod';
import { useState } from 'react'
import { Trash } from 'lucide-react';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../../../../components/ui/form"
import AlertModal from '../../../../../../components/modals/alert-modal'
import Heading from '../../../../../../components/ui/heading';
import { Button } from '../../../../../../components/ui/button';
import { Separator } from '../../../../../../components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../../../../../../hooks/use-toast';
import { Input } from '../../../../../../components/ui/input';

interface UpdateAdminFormProps {
    initialData: {
        email: string;
        password: string;
    } | null
}

const formSchema = z.object({
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
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const action = initialData ? "Save Changes" : "Create";

    const title = initialData ? "Edit Admin" : "Create Admin";
    const description = initialData ? "Edit this Admin" : "Add a new Admin";


    const form = useForm<AdminFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            email: '',
            password: ''
        }
    });


    const onDelete = async () => {
        try {

            setLoading(true);

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


    const onSubmit = async (data: AdminFormValues) => {
        try {

            setLoading(true);
            console.log(data);


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
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex justify-between items-center">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => { setOpen(true) }}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="password"
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
                            name="email"
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

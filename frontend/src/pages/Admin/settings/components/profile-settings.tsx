import { z } from "zod"
import { useState } from "react"
import { User, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import Loading from "../../../../components/Loading"

const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileSettings({ admin }: {
    admin: {
        name: string,
        email: string
    }
}) {
    const [isLoading, setIsLoading] = useState(false)

    const defaultValues: Partial<ProfileFormValues> = {
        name: admin.name,
        email: admin.email,
    }


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    })

    // useEffect(() => {
    //     if (admin) {
    //         form.reset({
    //             name: admin.name || "",
    //             email: admin.email || "",
    //         })
    //     }
    // }, [admin, form])

    function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)


        setTimeout(() => {
            console.log(data)
            setIsLoading(false)
        }, 1000)
    }

    if (isLoading) {
        return <>
            <div className=" min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        </>
    }



    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                    <AvatarFallback>{admin.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Your Profile</h2>
                    <div className="flex gap-2">
                        <span>
                            {admin.name}
                        </span>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your profile information. This information will be displayed publicly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-10" placeholder="Your name" {...field} />
                                            </div>
                                        </FormControl>
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
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="Your email"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>This email will be used for notifications and account recovery.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Save changes"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

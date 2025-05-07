import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../../../../components/ui/form";
import { BACKEND_URL } from "../../../../lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/use-toast";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters"),
});

export function LoginForm() {
    const { toast } = useToast();
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);



    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
       
        try {
            
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/admin/auth/login`, values, {
                withCredentials: true,
            })
    
            const { role } = res.data;
            if (role === "ADMIN") {
                navigator("/admin/dashboard");
                toast({
                    title: "Login Successful",
                    description: "Welcome back, Admin!",
                    variant: "default",
                    duration: 3000,
                })
            } else if (role === "SUPER_ADMIN") {
                navigator("/super-admin/dashboard");
                toast({
                    title: "Login Successful",
                    description: "Welcome back, Super Admin!",
                    variant: "default",
                    duration: 3000,
                })
            } else {
                navigator("/admin/login");
                toast({
                    title: "Login Failed",
                    description: "Invalid credentials",
                    variant: "destructive",
                    duration: 3000,
                })
    
            }
            //console.log(role);
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "An error occurred during login",
                variant: "destructive",
                duration: 3000,
            });
            return;
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-center">Welcome back, Admin!</h1>
                    <p className="text-center text-muted-foreground mb-6">Login to your account</p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Email</Label>
                                        <FormControl>
                                            <Input type="email" placeholder="m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Password</Label>
                                        <FormControl>
                                            <Input type="password" {...field}
                                                placeholder="Enter your password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={loading}>Login</Button>
                        </form>
                    </Form>

                </CardContent>

            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}

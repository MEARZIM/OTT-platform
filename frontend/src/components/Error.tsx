import { ArrowLeft, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";

interface ErrorProps {
    statusCode?: number;
    title?: string;
    description?: string;
    message?: string;
    showLogin?: boolean;
}

export default function Error({
    statusCode = 404,
    title = "Page Not Found",
    description = "The page you're looking for doesn't exist.",
    message = "It might have been moved, deleted, or the URL could be incorrect.",
    showLogin = false,
}: ErrorProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <Card className="mx-auto max-w-md w-full shadow-lg">
                <CardHeader className="space-y-1 text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-red-100 p-3">
                            <span className="text-red-600 font-bold text-xl">
                                {statusCode}
                            </span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-6">
                    <p className="mb-4 text-gray-600">{message}</p>
                    <div className="h-px bg-gray-200 my-6" aria-hidden="true" />
                    <p className="text-sm text-gray-500">
                        If you believe this is a mistake, please contact the administrator.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                    {showLogin && (
                        <Button className="w-full" asChild>
                            <Link to="/admin-login">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Link>
                        </Button>
                    )}
                    <Button variant="outline" className="w-full" asChild>
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

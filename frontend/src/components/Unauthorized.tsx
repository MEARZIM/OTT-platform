
import { ArrowLeft, Lock, LogIn } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from "react-router-dom"

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <Card className="mx-auto max-w-md w-full shadow-lg">
                <CardHeader className="space-y-1 text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-red-100 p-3">
                            <Lock className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Unauthorized Access</CardTitle>
                    <CardDescription className="text-gray-500">You don't have permission to access this page</CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-6">
                    <p className="mb-4 text-gray-600">
                        This page requires authentication or additional permissions that you don't currently have.
                    </p>
                    <div className="h-px bg-gray-200 my-6" aria-hidden="true" />
                    <p className="text-sm text-gray-500">
                        If you believe this is an error, please contact the administrator or try logging in with a different
                        account.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                    <Button className="w-full" asChild>
                        <Link to="/admin-login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

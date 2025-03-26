import { cn } from "../../../lib/utils"
import { Button, buttonVariants } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Link } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-black/20 border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-100">Login</CardTitle>
          <CardDescription className="text-amber-50">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-amber-100">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-amber-100">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-amber-50"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="********" required />
              </div>
              <Button type="submit" className="w-full bg-amber-100 hover:bg-amber-200 text-black">
                Login
              </Button>
              <Button variant="secondary" className="w-full bg-amber-100 hover:bg-amber-200">
                <img src="/assets/google-icon.png" alt="Google logo" className="w-5 h-5 mr-2" />
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-amber-50">
              Don&apos;t have an account?{" "}
              <Link to={"/signup"} className={cn(buttonVariants({
                variant: "link"
                }), "text-amber-200 hover:text-amber-100")}>
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

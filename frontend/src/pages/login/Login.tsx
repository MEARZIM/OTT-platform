// import { Link } from "react-router-dom";
// import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { BACKEND_URL } from "../../lib/utils";

export default function LoginPage() {

  const handelGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-primary text-secondary">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <img
            src="/assets/LoginThumbnail.jpg"
            alt="Decorative bird illustration"
            width={500}
            height={500}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium">PrimeView</h2>
          <p className="text-sm text-secondary/80 flex-wrap">
            PrimeView is your ultimate destination for premium entertainment. Stream the latest movies, binge-worthy series, and exclusive originals—all in one seamless, ad-free experience. Anytime, anywhere.
          </p>

        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-script mb-6">Welcome to PrimeView</h1>
            <h2 className="text-xl text-gray-600">Prime Entertainment, On Demand.</h2>
          </div>

          <form className="space-y-6">
            {/* <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Email
              </label>
              <Input id="email" defaultValue="m@example.com" className="w-full p-2 border rounded" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" defaultValue="password" className="w-full p-2 border rounded" />
              <div className="text-right">
                <Link to="#" className="text-sm text-gray-500 hover:text-gray-700">
                  Forget password?
                </Link>
              </div>
            </div>

            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">Sign in</Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div> */}

            <Button
              variant="outline"
              className="w-full border-gray-300"
              onClick={handelGoogleLogin}
            >
              <img src="/assets/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
              Sign in with Google
            </Button>

            {/* <p className="text-center text-sm text-gray-500">
              New to Prime View?{" "}
              <Link to="/signup" className="text-gray-600 hover:text-gray-800">
                Create Account
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  )
}


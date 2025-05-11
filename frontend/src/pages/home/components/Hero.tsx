import { Link } from "react-router-dom";
import { WaitlistSignup } from "./waitlist-signup";
import { Toaster } from "../../../components/ui/toaster";
import { useUser } from "../../../session/auth-context";


const Logo = "/assets/PrimeViewLogo.png";

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`;

const Hero = () => {
  const { user } = useUser(); // Access current user

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: backgroundStyle,
        }}
      />
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <header className="max-w-screen-lg mx-auto flex items-center justify-between p-6 w-full h-1/4">
          <img src={Logo} alt="PrimeView Logo" className="h-12 w-20" />
          {user ? (
            <Link
              to="/dashboard"
              className="bg-white text-black font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-black text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Sign In
            </Link>
          )}
        </header>
        <WaitlistSignup />
      </div>
      <Toaster />
    </main>
  );
};

export default Hero;

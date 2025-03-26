import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Logo = "/assets/PrimeViewLogo.png";
const heroBG = "/assets/hero.png.jpeg";
const strangerThingslg = "/assets/stranger-things-lg.png.jpeg";
const strangerThingssm = "/assets/stranger-things-sm.png";
const downloadIcon = "/assets/download-icon.gif";
const devicePile = "/assets/device-pile.png";
const heroVid = "/video1.m4v";
const videoDevices = "/video2.m4v";
const kids = "/assets/kids.png";
const tv = "/assets/tv.png";

const AuthScreen = () => {
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  return (
    <div>
      <div className="relative flex flex-col min-h-screen bg-no-repeat bg-black">
        <div
          className="h-[100dvh]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroBG}) `,
            backgroundSize: "cover", // Prevents zooming
            backgroundPosition: "center top", // Ensures full visibility
            backgroundRepeat: "no-repeat",
            backgroundColor: "#000", // Fills any empty space
          }}
        >
          {/* Navbar */}
          <header className="max-w-screen-lg mx-auto flex items-center justify-between p-6 w-full h-1/4">
            <img src={Logo} alt="Netflix Logo" className="size-15" />
            <Link
              to={"/login"}
              className="bg-[#EEF207] text-xl px-6 py-3 rounded flex items-center justify-center font-semibold hover:bg-[#EDFB14] hover:scale-105 transition transform duration-200 text-black"
            >
              Sign In
            </Link>
          </header>

          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center text-white flex-grow px-10 h-3/4">
            <h1 className="text-3xl md:text-5xl font-extrabold max-w-2xl leading-tight">Unlimited movies, TV shows, and more.</h1>
            <p className="text-lg md:text-xl mt-4">Watch anywhere. Cancel anytime.</p>
            <p className="mt-4 text-lg">Ready to watch? Enter your email to create or restart your membership.</p>

            {/* Email form */}
            <form className="mt-6 flex flex-col md:flex-row gap-4 w-full max-w-lg" onSubmit={handleFormSubmit}>
              <input type="email" placeholder="Email address" className="p-3 rounded bg-black/80 border border-gray-500 text-white flex-1 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="bg-[#EEF207] text-xl px-6 py-3 rounded flex items-center justify-center font-semibold hover:bg-[#EDFB14] hover:scale-105 transition transform duration-200 text-black">
                Get Started <ChevronRight className="size-8 ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/* separator */}
        <div className="h-2 w-full bg-[#232323] mt-16" aria-hidden="true" />

        {/* 1st section */}
        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
            {/* left side */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Enjoy on your TV
              </h2>
              <p className="text-lg md:text-xl">
                Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
            </div>
            {/* right side */}
            <div className="flex-1 relative">
              <img src={tv} alt="Tv image" className="mt-4 z-20 relative" />
              <video
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
                playsInline
                autoPlay={true}
                muted
                loop
              >
                <source src={heroVid} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        {/* 2nd section */}
        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
            {/* left side */}
            <div className="flex-1 relative">
              <div className="relative">
                <img
                  src={strangerThingslg}
                  alt="Stranger Things img"
                  className="mt-4"
                />

                <div
                  className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
        w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2
        "
                >
                  <img src={strangerThingssm} alt="image" className="h-full" />
                  <div className=" flex justify-between items-center w-full">
                    <div className="flex flex-col gap-0">
                      <span className="text-md lg:text-lg font-bold">
                        Stranger Things
                      </span>
                      <span className="text-sm text-blue-500">
                        Downloading...
                      </span>
                    </div>

                    <img src={downloadIcon} alt="" className="h-12" />
                  </div>
                </div>
              </div>
            </div>
            {/* right side */}

            <div className="flex-1 md:text-left text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                Download your shows to watch offline
              </h2>
              <p className="text-lg md:text-xl">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>

        {/* separator */}

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        {/* 3rd section */}
        <div className="py-10 bg-black text-white">
          <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
            {/* left side */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Watch everywhere
              </h2>
              <p className="text-lg md:text-xl">
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </p>
            </div>

            {/* right side */}
            <div className="flex-1 relative overflow-hidden">
              <img
                src={devicePile}
                alt="Device image"
                className="mt-4 z-20 relative"
              />
              <video
                className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
         max-w-[63%] 
        "
                playsInline
                autoPlay={true}
                muted
                loop
              >
                <source src={videoDevices} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

        {/* 4th section*/}
        <div className="py-10 bg-black text-white">
          <div
            className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
     px-4 md:px-2
  "
          >
            {/* left */}
            <div className="flex-1 relative">
              <img src={kids} alt="Enjoy on your TV" className="mt-4" />
            </div>
            {/* right */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Create profiles for kids
              </h2>
              <p className="text-lg md:text-xl">
                Send kids on adventures with their favorite characters in a
                space made just for them—free with your membership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
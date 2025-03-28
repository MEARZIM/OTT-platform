import Hero from "./Hero";

const AuthScreen = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Background */}
      <div
        className="relative flex flex-col min-h-screen"
        style={{
          background: "radial-gradient(circle at center, #1E40AF, #000000)",
        }}
      >
        {/* Hero Section */}
        <Hero />

        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" />

        {/* Sections */}
        <section className="max-w-6xl mx-auto px-6 space-y-16 mt-16">
          {/* 1st Section - TV (Image on Right) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold">Enjoy on your TV</h2>
              <p className="mt-3 text-lg md:text-xl">
                Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="relative flex-1">
              <img src="/assets/tv.png" alt="TV image" className="relative z-10" />
              <video
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/5"
                playsInline autoPlay muted loop
              >
                <source src="/video1.m4v" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* 2nd Section - Download (Image on Left) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold">Download your shows to watch offline</h2>
              <p className="mt-3 text-lg md:text-xl">Save your favorites easily and always have something to watch.</p>
            </div>

            <div className="relative flex-1">
              <img src="/assets/stranger-things-lg.png.jpeg" alt="Stranger Things" className="relative z-10" />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-gray-700 rounded-md px-4 flex items-center">
                <img src="/assets/stranger-things-sm.png" alt="Stranger Things" className="h-full" />
                <div className="flex-grow pl-4">
                  <h3 className="font-bold text-lg">Stranger Things</h3>
                  <p className="text-sm text-blue-500">Downloading...</p>
                </div>
                <img src="/assets/download-icon.gif" alt="Download Icon" className="h-10" />
              </div>
            </div>
          </div>

          {/* 3rd Section - Multi-device Streaming (Image on Right) */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold">Watch everywhere</h2>
              <p className="mt-3 text-lg md:text-xl">
                Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="relative flex-1">
              <img src="/assets/device-pile.png" alt="Device image" className="relative z-10" />
              <video
                className="absolute top-2 left-1/2 transform -translate-x-1/2 h-4/6 max-w-[63%]"
                playsInline autoPlay muted loop
              >
                <source src="/video2.m4v" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* 4th Section - Kids (Image on Left) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold">Create profiles for kids</h2>
              <p className="mt-3 text-lg md:text-xl">
                Send kids on adventures with their favorite characters in a space made just for them—free with your membership.
              </p>
            </div>

            <div className="relative flex-1">
              <img src="/assets/kids.png" alt="Kids section" className="relative z-10" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="h-2 w-full bg-[#232323] mt-16" />
      </div>
    </div>
  );
};

export default AuthScreen;

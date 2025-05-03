"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Heart, } from "lucide-react"
import { Link } from "react-router-dom"

export default function MyStuffPage() {
  const [activeTab, setActiveTab] = useState("watchlist")

  const watchlist = [
    {
      title: "Lovely Runner",
      type: "TV Show",
      image: "/assets/lovely-runner.jpg"
    },
    {
      title: "When The Phone Rings",
      type: "TV Show",
      image: "/assets/when-the-phone-rings.jpg"
    },
    {
      title: "Train to Busan",
      type: "Movie",
      image: "/assets/train-to-busan.jpg"
    },
    {
      title: "Parasite",
      type: "Movie",
      image: "/assets/parasite.jpg"
    },
    {
      title: "Marry My Husband",
      type: "TV Show",
      image: "/assets/marry-my-husband.jpg"
    },
    {
      title: "Peninsula",
      type: "Movie",
      image: "/assets/peninsula.jpg"
    },
    {
      title: "Minari",
      type: "Movie",
      image: "/assets/minari.jpg"
    },
  ]

  const watched = [
    {
      title: "When The Phone Rings",
      progress: 70,
      image: "/assets/when-the-phone-rings.jpg"
    },
    {
      title: "Parasite",
      progress: 45,
      image: "/assets/parasite.jpg"
    },
    {
      title: "Peninsula",
      progress: 90,
      image: "/assets/peninsula.jpg"
    },
  ]

  return (
    <div className="flex h-screen bg-[#0f171e] text-white overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">My Stuff</h1>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`px-4 py-2 mr-4 text-m font-medium ${
                activeTab === "watchlist" ? "text-white border-b-2 border-[#00a8e1]" : "text-gray-400"
              }`}
            >
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Watchlist
              </div>
            </button>

            <button
              onClick={() => setActiveTab("recently-watched")}
              className={`px-4 py-2 mr-4 text-m font-medium ${
                activeTab === "recently-watched" ? "text-white border-b-2 border-[#00a8e1]" : "text-gray-400"
              }`}
            >
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recently Watched
              </div>
            </button>
          </div>

          {/* View Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center ml-auto">
              <select className="bg-[#1a242f] border border-gray-700 rounded px-2 py-1 text-sm">
                <option>All</option>
                <option>Movies</option>
                <option>TV Shows</option>
              </select>

              <select className="bg-[#1a242f] border border-gray-700 rounded px-2 py-1 text-sm ml-2">
                <option>Recently Added</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
            </div>
          </div>

          {/* Content */}
          {activeTab === "watchlist" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {watchlist.map((item, index) => (
                <div key={index} className="group relative">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-black/70 rounded-full p-1">
                      <Heart className="h-4 w-4 text-white fill-[#00a8e1]" />
                    </button>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={150}
                    height={225}
                    className="w-full rounded-sm transition-opacity group-hover:opacity-70"
                  />
                  <h3 className="mt-2 text-lg font-medium truncate">{item.title}</h3>
                  <p className="text-s text-gray-400">{item.type}</p>
                </div>
              ))}
            </div>
          )}


          {activeTab === "recently-watched" && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Continue Watching</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {watched.map((item, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={150}
                      height={225}
                      className="w-full rounded-sm transition-opacity group-hover:opacity-70"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-16">
                      <div className="absolute bottom-0 left-0 right-0 px-2 pb-1">
                        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                          <div className="bg-[#00a8e1] h-1 rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-5 text-m font-medium truncate mb-4">{item.title}</h3>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


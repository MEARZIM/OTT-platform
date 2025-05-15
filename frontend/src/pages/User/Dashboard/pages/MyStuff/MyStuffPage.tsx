import axios from "axios"
import { useEffect, useState } from "react"
import { ArrowLeft, Clock, Heart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { useUser } from "../../../../../hooks/use-user"
import { BACKEND_URL } from "../../../../../lib/utils"
import { WatchVideo } from "../../../../../types/Watchvideo"
import { SidebarProvider } from "../../../../../components/ui/sidebar"
import Sidebar from "../../components/Sidebar"


export default function MyStuffPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const defaultTab = queryParams.get("tab") || "watchlist"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [watchlist, setWatchList] = useState<WatchVideo[]>([])
  const [watched, setWatched] = useState<WatchVideo[]>([])
  const [loadingWatchlist, setLoadingWatchlist] = useState(true)
  const [loadingWatched, setLoadingWatched] = useState(true)
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const fetchWatchList = async () => {
      setLoadingWatchlist(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/content/watchlist/`, {
          withCredentials: true
        });
        setWatchList(res.data.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingWatchlist(false);
      }
    }
    fetchWatchList();
  }, [user])

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      setLoadingWatched(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/content/history/`, {
          withCredentials: true
        });
        setWatched(res.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingWatched(false);
      }
    }
    fetchHistory();
  }, [user])

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <SidebarProvider>

        {user && <Sidebar
          user={user}
        />}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-black dark:text-white">My Stuff</h1>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("watchlist")}
                className={`px-4 py-2 mr-4 text-m font-medium ${activeTab === "watchlist" ? "text-black dark:text-white border-b-2 border-[#00a8e1]" : "text-zinc-400"
                  }`}
              >
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Watchlist
                </div>
              </button>

              <button
                onClick={() => setActiveTab("recently-watched")}
                className={`px-4 py-2 mr-4 text-m font-medium ${activeTab === "recently-watched" ? "text-black dark:text-white border-b-2 border-[#00a8e1]" : "text-zinc-400"
                  }`}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recently Watched
                </div>
              </button>
            </div>

            {/* View Controls */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center ml-auto">
                <select className="bg-zinc-100 dark:bg-zinc-900 border border-gray-700 rounded px-2 py-1 text-sm">
                  <option>All</option>
                  <option>Movies</option>
                </select>
              </div>
            </div>

            {/* Watchlist Content */}
            <div className="px-6">
              {activeTab === "watchlist" && (
                <>
                  {loadingWatchlist ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {Array(10).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse space-y-2">
                          <div className="bg-zinc-300 dark:bg-zinc-800 h-[225px] w-full rounded" />
                          <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-3/4" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {watchlist.map((item, index) => (
                        <div key={index} className="group relative">
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-white/70 dark:bg-black/70 rounded-full p-1">
                              <Heart className="h-4 w-4 text-black dark:text-white fill-[#00a8e1]" />
                            </button>
                          </div>
                          <img
                            src={item.video.thumbnail}
                            alt={item.video.title}
                            width={100}
                            height={100}
                            className="w-full rounded-sm transition-opacity group-hover:opacity-70"
                          />
                          <h3 className="mt-2 text-lg font-medium truncate">{item.video.title}</h3>
                          <p className="text-s text-zinc-800 dark:text-zinc-400">{"Movie"}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Recently Watched Content */}
              {activeTab === "recently-watched" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium">Continue Watching</h2>
                  {loadingWatched ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {Array(10).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse space-y-2">
                          <div className="bg-zinc-300 dark:bg-zinc-800 h-[225px] w-full rounded" />
                          <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-3/4" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {watched.map((item, index) => (
                        <div key={index} className="group relative">
                          <img
                            src={item.video.thumbnail}
                            alt={item.video.title}
                            width={100}
                            height={100}
                            className="w-full rounded-sm transition-opacity group-hover:opacity-70"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 dark:from-black/80 to-transparent h-16">
                            <div className="absolute bottom-0 left-0 right-0 px-2 pb-1">
                              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1 rounded-full overflow-hidden">
                                <div className="bg-[#00a8e1] h-1 rounded-full" style={{ width: `90%` }}></div>
                              </div>
                            </div>
                          </div>
                          <h3 className="mt-5 text-m font-medium truncate mb-4">{item.video.title}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

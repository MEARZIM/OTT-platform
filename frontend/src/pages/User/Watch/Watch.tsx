"use client"

import { useState } from "react"
import { Play, Download, PlusCircle, Heart, Share2, CircleArrowRight } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Link } from "react-router-dom"
import Player from "./components/Player"
import videoData from "./data/VideoList"
import { useParams } from "react-router-dom"

export default function VideoPlayer() {
    const [isLiked, setIsLiked] = useState(false)
    const [isInWatchlist, setIsInWatchlist] = useState(false)

    const { id } = useParams()
    const videoId = parseInt(id || "", 10)
    const currentVideo = videoData.find(video => video.id === videoId)
    const suggestedVideos = videoData.filter(video => video.id !== videoId).slice(0, 6)

    return (
        <div className="bg-black min-h-screen">
            <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
                <div className='flex items-center gap-10 z-50'>
                    <Link to='/'>
                        <img src='/assets/PrimeViewLogo.png' alt='Logo' className='size-15' />
                    </Link>
                </div>
            </header>
            <div className="w-full max-w-6xl mx-auto p-4 bg-black text-blue-400">
                {/* Main Player */}
                <Player />

                {/* Title and Description */}
                <Card className="mb-4 bg-black border-none">
                    <CardContent className="p-4 md:p-6">
                        <h1 className="text-xl md:text-2xl font-bold text-[#068fff] mb-2">
                            {currentVideo?.title || "Video Not Found"}
                        </h1>
                        <p className="text-[#48cbff] mb-4">
                            {currentVideo?.description || "No description available for this video."}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-[#1eadff] hover:bg-[#068fff] text-[#d6f2ff] font-bold">
                                <Play className="mr-2 h-4 w-4" /> Play
                            </Button>
                            <Button variant="outline" className="border-[#068fff] text-[#007bff] hover:bg-[#085ec5] hover:text-[#edfaff]">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="mb-4 bg-black border-none">
                    <CardContent className="p-4 flex flex-wrap justify-around gap-2">
                        <Button
                            variant="ghost"
                            className={`flex items-center text-xl ${isInWatchlist ? "text-[#1eadff]" : "text-[#068fff]"} hover:bg-[#0e315d] hover:text-[#d6f2ff]`}
                            onClick={() => setIsInWatchlist(!isInWatchlist)}
                        >
                            <PlusCircle className="mr-2 size-7" /> Watchlist
                        </Button>
                        <Button
                            variant="ghost"
                            className={`flex items-center text-xl ${isLiked ? "text-[#1eadff]" : "text-[#068fff]"} hover:bg-[#0e315d] hover:text-[#d6f2ff]`}
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <Heart className={`mr-2 size-7 ${isLiked ? "fill-[#83dfff]" : ""}`} /> Like
                        </Button>
                        <Button variant="ghost" className="flex items-center text-xl text-[#068fff] hover:bg-[#0e315d] hover:text-[#d6f2ff]">
                            <Share2 className="mr-2 size-7" /> Share
                        </Button>
                    </CardContent>
                </Card>

                {/* Suggested Content */}
                <Card className="bg-black border-none">
                    <CardContent className="p-4">
                        <h2 className="text-lg md:text-xl font-bold text-[#83dfff] mb-6">Suggested Content</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                            {suggestedVideos.map((video) => (
                                <Link to={`/player/${video.id}`} key={video.id}>
                                    <div className="relative aspect-[2/3] rounded-lg hover:bg-[#0d519b] cursor-pointer transition-colors">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d519b] to-transparent opacity-80"></div>
                                        <div className="absolute bottom-4 right-4 z-10">
                                            <CircleArrowRight className="w-6 h-6 text-[#83dfff]" />
                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}


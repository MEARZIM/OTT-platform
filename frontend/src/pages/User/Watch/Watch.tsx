import { useEffect, useState } from "react"
import { Play, PlusCircle, Heart, Share2, CircleArrowRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import Player from "./components/Player"
import ShareModal from "./components/ShareModal"
import { useVideo } from "../../../hooks/use-video"
import UnauthorizedPage from "../../../components/Unauthorized"
import Error from "../../../components/Error"
import Loading from "../../../components/Loading"
import { useLikeStatus } from "../../../hooks/use-likeStatus"
import { useToast } from "../../../hooks/use-toast"
import { useUser } from "../../../hooks/use-user"
import { useVideosCategory } from "../../../hooks/use-videosCategory"
import { useWatchlistStatus } from "../../../hooks/use-watchlistStatus"
import RateVideo from "../../../components/RateVideo"
import { useVideoRating } from "../../../hooks/use-videoRating"


export default function VideoPlayer() {
    const { id } = useParams<{ id: string }>();
    const { toast } = useToast();

    const [open, setOpen] = useState(false);
    const { video, loading } = useVideo(id);
    const { user } = useUser();
    const { rating: initialRating, loading: loadingRating } = useVideoRating(id);
    
    const categoryId = video?.categories?.map((cat) => cat.categoryId) || [];
    const { videos, videoCategoryLoading } = useVideosCategory(categoryId[0]);


    const {
        isLiked,
        toggleLike,
        likeLoading,
        lastAction
    } = useLikeStatus(video?.id)

    const {
        isInWatchlist,
        toggleWatchlist,
        watchlistLoading,
        watchlistLastAction,
    } = useWatchlistStatus(video?.id);

    useEffect(() => {
        if (lastAction === "liked") {
            toast({
                title: "Liked! 😍",
                description: "Video added to your liked content.🥳",
                variant: "success",
            })
        } else if (lastAction === "unliked") {
            toast({
                title: "Unliked🤕",
                description: "Video removed from your liked content. 🤒",
                variant: "destructive",
            })
        }
    }, [lastAction])

    useEffect(() => {
        if (watchlistLastAction === "added") {
            toast({
                title: "Added to Watchlist 🎬",
                description: "Video saved for later viewing. 🍿",
                variant: "success",
            });
        } else if (watchlistLastAction === "removed") {
            toast({
                title: "Removed from Watchlist 😢",
                description: "Video removed from your saved list.",
                variant: "destructive",
            });
        }
    }, [watchlistLastAction]);



    if (!id) {
        return <UnauthorizedPage />
    }



    if (loading || videoCategoryLoading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <Loading />
                </div>
            </>
        )
    }

    if (video === null || !video ) {
        return (
            <>
                <Error
                    statusCode={404}
                    title="Not Found"
                    description="Content not found"
                    message="Content not found"
                    showLogin={true}
                />

            </>
        )
    }




    return (
        <div className="dark:bg-black bg-white min-h-screen">
            <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
                <div className='flex items-center gap-10 z-50'>
                    <Link to='/'>
                        <img src="/assets/PrimeViewLogo.png" alt='Logo' className='h-12 w-20' />
                    </Link>
                </div>
            </header>
            <div className="w-full max-w-6xl mx-auto p-4 bg-white dark:bg-black text-black dark:text-white">
                {/* Main Player */}
                <Player />

                {/* Title and Description */}
                <Card className="mb-4 bg-white dark:bg-black border-none shadow-none">
                    <CardContent className="p-4 md:p-6">
                        <h1 className="text-xl md:text-5xl font-bold text-black dark:text-white mb-6">
                            {video.title || "Video Not Found"}
                        </h1>
                        <p className="text-zinc-500 text-sm md:text-xl mb-4">
                            {video?.description || "No description available for this video."}
                        </p>

                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="mb-4 bg-white dark:bg-black border-none shadow-none">
                    <CardContent className="p-4 flex  flex-wrap justify-around gap-2">
                        {user && (
                            <>
                                <Button
                                    variant="ghost"
                                    className={`flex items-center hover:cursor-pointer text-xl ${isInWatchlist ? "text-black dark:text-white" : "text-black dark:text-white"} hover:bg-white dark:hover:bg-black hover:text-zinc-400`}
                                    onClick={toggleWatchlist}
                                    disabled={watchlistLoading}
                                >
                                    <PlusCircle className={`mr-2 size-7 ${isInWatchlist ? "fill-[#07fa27] border-[#07fa27]" : ""}`} /> Watchlist
                                </Button>
                                <Button
                                    variant="ghost"
                                    className={`flex items-center hover:cursor-pointer text-xl ${isLiked ? "text-red-500 dark:text-white" : "text-black dark:text-white"} hover:bg-white dark:hover:bg-black hover:text-red-600`}
                                    onClick={toggleLike}
                                    disabled={likeLoading}
                                >
                                    <Heart className={`mr-2 size-7 ${isLiked ? "fill-[#fa0707]" : ""}`} /> Like
                                </Button>
                            </>
                        )}
                        <ShareModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        />
                        <Button
                            variant="ghost"
                            className="flex items-center text-xl text-black dark:text-white hover:bg-white dark:hover:bg-black hover:text-zinc-400"
                            onClick={() => setOpen(true)}
                        >
                            <Share2 className="mr-2 size-7" /> Share
                        </Button>
                    </CardContent>
                </Card>


                {user &&
                    loadingRating ?
                    <>
                        <div className="animate-pulse space-y-2">
                            <div className="bg-zinc-300 dark:bg-zinc-800 w-[225px] h-[30px] rounded" />
                            <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-3/4" />
                        </div>
                    </>
                    :
                    <Card className="mb-4 bg-white dark:bg-black border-none shadow-none">
                        <CardContent className="p-4 flex flex-wrap justify-around gap-2">
                            <RateVideo
                                title={video.title}
                                videoId={video.id}
                                initialRating={initialRating}
                            />
                        </CardContent>
                    </Card>
                }



                {/* Suggested Content */}
                {videos &&
                    (
                        <Card className="bg-white dark:bg-black border-none shadow-none">
                            <CardContent className="p-4">
                                <h2 className="text-lg md:text-xl font-bold dark:text-zinc-200 mb-6">
                                    Suggested Content
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                                    {videos.map((v) => (
                                        <a href={`/player/${v.id}`} key={v.id}>
                                            <div className="relative aspect-[2/3] rounded-lg hover:bg-[#0d519b] cursor-pointer transition-colors">
                                                <img
                                                    src={v.thumbnail}
                                                    alt={v.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 rounded-lg"></div>
                                                <div className="absolute bottom-4 right-4 z-10">
                                                    <CircleArrowRight className="w-6 h-6 text-[#b0b0b0]" />
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}


            </div >
        </div >

    )
}


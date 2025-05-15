import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../../components/ui/carousel";
import { useMostLikedVideos } from "../../../../hooks/use-mostLikedVideo";


const MostLikedContent = () => {
    const { mostLikedvideos, loading } = useMostLikedVideos();

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array(10).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                        <div className="bg-zinc-300 dark:bg-zinc-800 h-[225px] w-full rounded" />
                        <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-3/4" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="relative w-full px-4 overflow-hidden mb-6">
            <div className="flex items-center mb-4 px-8">
                <h2 className="text-lg sm:text-3xl font-extrabold">Most Liked Videos</h2>
            </div>

            <Carousel className="relative w-full px-14">
                <CarouselContent className="flex gap-4">
                    {mostLikedvideos.map((video) => (
                        <CarouselItem
                            key={video.id}
                            className="
                                flex-none 
                                w-[85%] 
                                xs:w-[70%] 
                                sm:w-[50%] 
                                md:w-[33.3333%] 
                                lg:w-[20%] 
                                xl:w-[14.2857%]
                            "
                        >
                            <Link to={`/player/${video.id}`}>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="rounded-md object-cover w-full aspect-2/3"
                                />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 size-10 bg-blue-200/50 dark:bg-blue-200/50 border-none p-2 rounded-full text-blue-700 dark:text-blue-700 hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-blue-200/50 dark:bg-blue-200/50 border-none p-2 rounded-full text-blue-700 dark:text-blue-700 hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer" />
            </Carousel>
        </div>
    );
};

export default MostLikedContent;

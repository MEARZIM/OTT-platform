import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../../components/ui/carousel";
import videoData from "../../Watch/data/VideoList";
import { useVideos } from "../../../../hooks/use-videos";

const popular = videoData.slice(0, 8);

const PopularContent = () => {
    const { videos, loading } = useVideos();

    if (loading) {
        return (<>
            loading...
        </>)
    }
    console.log(videos)
    return (
        <div className="relative w-full px-4 overflow-hidden mb-6">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-extrabold">Popular Content</h2>
            </div>
            <Carousel className="relative w-full">
                <CarouselContent className="flex gap-4 flex-nowrap">
                    {videos.map((video) => (
                        <CarouselItem
                            key={video.id}
                            className="flex-none w-[calc(100%/2)] sm:w-[calc(100%/1)] md:w-[calc(100%/3)] lg:w-[calc(100%/5)] xl:w-[calc(100%/7)]"
                        >
                            <Link to={`/player/${video.id}`}>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    width={250}
                                    height={200}
                                    className="rounded-md object-cover"
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

export default PopularContent;

import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../../components/ui/carousel";
import { useVideos } from "../../../../hooks/use-videos";

const PopularContent = () => {
    const { videos, loading } = useVideos();

    if (loading) {
        return <div className="px-4 text-sm text-gray-500">Loading popular content...</div>;
    }

    return (
        <div className="relative w-full px-4 overflow-hidden mb-6">
            <div className="flex items-center mb-4">
                <h2 className="text-lg sm:text-xl font-extrabold">Popular Content</h2>
            </div>

            <Carousel className="relative w-full">
                <CarouselContent className="flex gap-4">
                    {videos.map((video) => (
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

export default PopularContent;

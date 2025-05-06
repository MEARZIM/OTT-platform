import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../../components/ui/carousel";
import videoData from "../../Watch/data/VideoList";

const popular = videoData.slice(0,8);

const PopularContent = () => {
    return (
        <div className="relative w-full px-4 overflow-hidden mb-6">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-extrabold">Popular Content</h2>
            </div>
            <Carousel className="relative w-full">
                <CarouselContent className="flex gap-4 flex-nowrap">
                    {popular.map((video) => (
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
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-200/50 p-2 rounded-full text-blue-950 hover:bg-gray-800 hover:text-blue-700 border-none size-10 cursor-pointer" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-200/50 p-2 rounded-full text-blue-950 hover:bg-gray-800 hover:text-blue-700 border-none size-10 cursor-pointer" />
            </Carousel>
        </div>
    );
};

export default PopularContent;

import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import videoData from "../../Watch/data/VideoList";

import { Link } from "react-router-dom";

const Banner = () => {
  const bannerContent = videoData.slice(8, 15);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="relative h-[40vh] md:h-[50vh] mb-7 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none"></div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {bannerContent.map((video) => (
            <CarouselItem
              key={video.id}
              className="w-full h-[40vh] md:h-[50vh] transition-opacity duration-500"
            >
              <Link to={`/player/${video.id}`} className="w-full h-full block">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 size-10 bg-blue-200/50 dark:bg-blue-200/50 border-none p-2 rounded-full text-blue-700 dark:text-blue-700 hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-blue-200/50 dark:bg-blue-200/50 border-none p-2 rounded-full text-blue-700 dark:text-blue-700 hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer" />
      </Carousel>
    </div>

  );
};

export default Banner;

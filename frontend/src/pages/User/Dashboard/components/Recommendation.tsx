import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../../components/ui/carousel";
import { useRecommendation } from "../../../../hooks/use-recommendation";

const RecommendedContent = () => {
    const { videos, loading } = useRecommendation();
    console.log(videos);

    if (loading) {
        return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array(10).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                    <div className="bg-zinc-300 dark:bg-zinc-800 h-[225px] w-full rounded" />
                    <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-3/4" />
                </div>
            ))}
        </div>;
    }

    return (
        
            videos?.length > 0 && (
            <div className="relative w-full px-4 overflow-hidden mb-6">
              <div className="flex items-center mb-4 px-8">
                <h2 className="text-lg sm:text-3xl font-extrabold">Recommended Content</h2>
              </div>
          
              <Carousel aria-label="Recommended videos carousel" className="relative w-full px-14">
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
                          title={video.title}
                          loading="lazy"
                          className="rounded-md object-cover w-full aspect-2/3"
                        />
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
          
                <CarouselPrevious
                  aria-label="Previous"
                  className="absolute left-2 top-1/2 -translate-y-1/2 size-10 bg-blue-200/50 dark:bg-blue-200/50 border-none p-2 rounded-full text-blue-700 dark:text-blue-700 hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer"
                />
                <CarouselNext
                  aria-label="Next"
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-blue-200/50 dark:bg-blue-200/50 border-none p-2 rounded-full text-blue-700 dark:text-blue-700 hover:bg-gray-800 dark:hover:bg-gray-800 cursor-pointer"
                />
              </Carousel>
            </div>
          )
          
        
    );
};

export default RecommendedContent;

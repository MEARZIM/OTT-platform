import { useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "../../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

const Banner = () => {
    const bannerContent = [
        { title: "Undercover High School", image: "/assets/undercover-high-school.jpg" },
        { title: "When Life Gives You Tangerines", image: "/assets/when-life-gives-you-tangerines.jpg" },
        { title: "First Frost", image: "/assets/first-frost.jpg" },
        { title: "The Potato Lab", image: "/assets/the-potato-lab.jpg" },
        { title: "When The Stars Gossip", image: "/assets/when-the-stars-gossip.jpg" },
        { title: "My Dearest Nemesis", image: "/assets/my-dearest-nemesis.jpg" },
        { title: "Melo Movie", image: "/assets/melo-movie.jpg" },
    ];

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div className="relative h-[40vh] md:h-[50vh] mb-7 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {bannerContent.map(({ title, image }, index) => (
                        <CarouselItem
                            key={index}
                            className="w-full h-[40vh] md:h-[50vh] transition-opacity duration-500"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* <CarouselPrevious
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-10 font-extrabold bg-blue-200/50 border-none p-2 rounded-full text-blue-700 hover:bg-gray-800 cursor-pointer"
                />
                <CarouselNext
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-10 font-extrabold bg-blue-200/50 border-none p-2 rounded-full text-blue-700 hover:bg-gray-800 cursor-pointer"
                /> */}
            </Carousel>
        </div>
    );
};

export default Banner;

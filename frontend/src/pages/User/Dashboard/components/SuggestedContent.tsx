import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../../../../components/ui/carousel";

const suggested = [
    { title: "Lovely Runner", image: "/assets/lovely-runner.jpg" },
    { title: "When The Phone Rings", image: "/assets/when-the-phone-rings.jpg" },
    { title: "Marry My Husband", image: "/assets/marry-my-husband.jpg" },
    { title: "Queen of Tears", image: "/assets/queen-of-tears.jpg" },
    { title: "Train to Busan", image: "/assets/train-to-busan.jpg" },
    { title: "Parasite", image: "/assets/parasite.jpg" },
    { title: "Peninsula", image: "/assets/peninsula.jpg" },
    { title: "Minari", image: "/assets/minari.jpg" },
];

const SuggestedContent = () => {
    return (
        <div className="relative w-full px-4 overflow-hidden mb-6">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-extrabold">Content we think you'll like</h2>
            </div>
            <Carousel className="relative w-full">
                <CarouselContent className="flex gap-4 flex-nowrap">
                    {suggested.map(({ title, image }, index) => (
                        <CarouselItem
                            key={index}
                            className="flex-none w-[calc(100%/2)] sm:w-[calc(100%/1)] md:w-[calc(100%/3)] lg:w-[calc(100%/5)] xl:w-[calc(100%/7)]"
                        >
                            <img
                                src={image}
                                alt={title}
                                width={250}
                                height={200}
                                className="rounded-md object-cover"
                            />
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

export default SuggestedContent;

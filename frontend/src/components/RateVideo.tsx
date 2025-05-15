import { Star } from "lucide-react";
import { useState } from "react";
import { rateVideo } from "../lib/actions/rateVideo";
import { toast } from "../hooks/use-toast";

interface RatingVideoProps {
    title: string;
    videoId: string;
    initialRating: number;
}

export default function RateVideo({ title, videoId, initialRating }: RatingVideoProps) {
    const [rating, setRating] = useState(initialRating);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const ratingData = [
        { label: "Poor", color: "#E74C3C" },
        { label: "Bad", color: "#E59866" },
        { label: "Okay", color: "#F7DC6F" },
        { label: "Good", color: "#76D7C4" },
        { label: "Great", color: "#229954" },
    ];

    const handleRate = async (newRating: number) => {
        if (isSubmitting) return;

        if (rating === newRating) {
            toast({
                title: "Already Rated ✅",
                description: "Thanks for your response",
                variant: "default",
            });
            return;
        }

        const prevRating = rating;
        setRating(newRating);
        setIsSubmitting(true);

        try {
            await rateVideo(videoId, newRating);
            toast({
                title: "Rated Successfully ✅",
                description: `You rated this video: ${ratingData[newRating - 1].label}`,
                variant: "success",
            });
        } catch (error) {
            console.error("Rating failed:", error);
            setRating(prevRating);
            toast({
                title: "Rating Failed ❌",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex bg-white flex-col md:flex-row items-center justify-between border border-black rounded-md p-2">
            <div className="p-2 text-base font-semibold">
                {title} <span className="text-gray-400">(Movie)</span>
            </div>

            <div className="flex gap-4 p-2">
                {Array.from({ length: 5 }).map((_, index) => {
                    const filled = index + 1 <= rating;
                    return (
                        <Star
                            key={index}
                            size={25}
                            strokeWidth={0}
                            fill={filled ? "gold" : "#D6DBDF"}
                            cursor={isSubmitting ? "not-allowed" : "pointer"}
                            className="transition duration-150"
                            onClick={() => handleRate(index + 1)}
                        />
                    );
                })}
            </div>

            <div
                className="font-semibold min-w-[60px] p-2"
                style={{ color: rating > 0 ? ratingData[rating - 1]?.color : "#7F8C8D" }}
            >
                {rating > 0 ? ratingData[rating - 1]?.label : "No rating"}
            </div>
        </div>
    );
}

import { Ad } from "./Ad";
import { VideoCategory } from "./VideoCategory";

export type Video = {
    id: string;
    title: string;
    description: string;
    url: string;
    rating: number;
    thumbnail: string;
    uploadedById: string;
    status: "PUBLISHED" | "DRAFT" | string;
    createdAt: string;
    updatedAt: string;
    adId: string | null;
    Ad: Ad | null
    categories?: VideoCategory[];
};
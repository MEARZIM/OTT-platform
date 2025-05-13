import { VideoStatus } from "@prisma/client";

export interface VideoData {
    title: string;
    description: string;
    thumbnail: string | null;
    rating: number;
    status?: VideoStatus;
    uploadedById: string;
    muxAssetId: string;
    playbackId: string;
    adId?: string | null
    categoryIds: string[]
    updatedAt: Data
}
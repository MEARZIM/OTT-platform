export interface VideoData {
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    rating: number;
    status?: VideoStatus;
    uploadedById: string;
    muxAssetId: string;
    playbackId: string;
}
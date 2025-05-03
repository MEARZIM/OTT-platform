import { AdType } from "@prisma/client";


export interface CreateAdDto {
    title: string;
    description: string;
    muxAssetId: string;
    playbackId: string;
    type: AdType;
    offsetSeconds?: number;
}
 
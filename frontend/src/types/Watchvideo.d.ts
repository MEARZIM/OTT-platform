import { Video } from "./Video"

export interface WatchVideo {
    id: string
    userId: string
    videoId: string
    video: Video
}
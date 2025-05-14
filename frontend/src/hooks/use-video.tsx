import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";
import { Video } from "../types/Video";

/**
 * useVideo
 * 
 * @description
 * Custom React hook to fetch a single the video from the backend.
 * 
 * ✅ Used to get a Video by video id.
 */


export function useVideo(videoId: string | undefined) {
    const [video, setVideo] = useState<Video | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!videoId) {
            return
        }
        axios
            .get(`${BACKEND_URL}/api/content/video/${videoId}`)
            .then((res) => {
                setVideo(res.data);
            })
            .catch((err) => {
                console.error(`Error fetching all videos:`, err);
                setVideo(null);
            })
            .finally(() => setLoading(false));
    }, [videoId]);

    return { video, loading };
}

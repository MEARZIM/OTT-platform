import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";
import { Video } from "../types/Video";

/**
 * useMostLikedVideos
 * 
 * @description
 * Custom React hook to fetch all the most liked videos from the backend.
 * 
 * ✅ Used to get most liked Videos.
 */


export function useMostLikedVideos() {
    const [mostLikedvideos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/content/video/most-liked`)
            .then((res) => {
                setVideos(res.data);
            })
            .catch((err) => {
                console.error(`Error fetching all videos:`, err);
                setVideos([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return { mostLikedvideos, loading };
}

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";
import { Video } from "../types/Video";

/**
 * useVideos
 * 
 * @description
 * Custom React hook to fetch all the videos from the backend.
 * 
 * ✅ Used to get all Videos.
 */


export function useVideos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/content/video`)
            .then((res) => {
                setVideos(res.data);
            })
            .catch((err) => {
                console.error(`Error fetching all videos:`, err);
                setVideos([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return { videos, loading };
}

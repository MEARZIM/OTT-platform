import axios from "axios";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../lib/utils";
import { Video } from "../types/Video";



/**
 * useVideosCategories
 * 
 * @description
 * Custom React hook to fetch all video by category id from the backend.
 * 
 * ✅ Used to get all videos by category.
 */

export function useVideosCategory(categoryId: string) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/content/videos/category/:${categoryId}`, {
                withCredentials: true,
            })
            .then((res) => setVideos(res.data.videos))
            .catch((err) => {
                console.error("Error fetching videos:", err);
                setVideos([]);
            })
            .finally(() => setLoading(false));
    }, [categoryId]);

    return { videos, loading };
}


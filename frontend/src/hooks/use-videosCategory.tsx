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
    // console.log(categoryId)
    const [videos, setVideos] = useState<Video[]>([]);
    const [videoCategoryLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!categoryId || !BACKEND_URL) return;
        axios
            .get(`${BACKEND_URL}/api/content/video/category/${categoryId}`)
            .then((res) => {
                setVideos(res.data)
            })
            .catch((err) => {
                console.error("Error fetching videos:", err);
                setVideos([]);
            })
            .finally(() => setLoading(false));
    }, [categoryId]);

    return { videos, videoCategoryLoading };
}


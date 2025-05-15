import { useEffect, useState } from "react";
import axios from "axios";
import { VITE_BACKEND_FLASK_URL } from "../lib/utils";
import { Video } from "../types/Video";
import { fetchToken } from "../lib/actions/fetchToken";

/**
 * useRecommendation
 * 
 * @description
 * Custom React hook to fetch all the recommended videos from the flask backend.
 */
export function useRecommendation() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = await fetchToken(); // ✅ Move inside useEffect
                const res = await axios.get(`${VITE_BACKEND_FLASK_URL}/recommend-videos`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setVideos(res.data);
            } catch (err) {
                console.error("Error fetching recommended videos:", err);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return { videos, loading };
}

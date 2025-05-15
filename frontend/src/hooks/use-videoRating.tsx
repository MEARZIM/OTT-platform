import axios from "axios";
import { useState, useEffect } from "react";

import { BACKEND_URL } from "../lib/utils";

export function useVideoRating(videoId: string | undefined) {
    const [rating, setRating] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!videoId) return;

        async function loadRating() {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(`${BACKEND_URL}/api/content/rating/${videoId}`, {
                    withCredentials: true
                });

                if (res.data !== undefined) {
                    setRating(res.data.data.rating);
                } else {
                    setRating(0);
                }
            } catch (err) {
                setError("Failed to fetch rating");
            } finally {
                setLoading(false);
            }
        }

        loadRating();
    }, [videoId]);

    return { rating, loading, error };
}

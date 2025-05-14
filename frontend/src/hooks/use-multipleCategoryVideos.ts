import { useEffect, useState } from "react";
import { Video } from "../types/Video";
import { fetchVideosByCategory } from "../lib/fetchVideosByCategory";

/**
 * useMultipleCategoryVideos
 * Fetches and merges videos from multiple categories.
 */
export function useMultipleCategoryVideos(categoryIds: string[]) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (categoryIds.length === 0) {
            setVideos([]);
            setIsLoading(false);
            return;
        }

        const fetchAll = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const results = await Promise.all(
                    categoryIds.map(async (id) => await fetchVideosByCategory(id))
                );

                const allVideos = results.flat();
                const uniqueVideos = Array.from(
                    new Map(allVideos.map((v) => [v.id, v])).values()
                );

                setVideos(uniqueVideos);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch videos");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAll();
    }, [categoryIds]);

    return { videos, isLoading, error };
}

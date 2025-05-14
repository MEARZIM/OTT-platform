// hooks/useMultipleCategoryVideos.ts
import { useEffect, useState } from "react";
import { useVideosCategory } from "./use-videosCategory";
import { Video } from "../types/Video";


/**
 * useMultipleCategoryVideos
 * 
 * @description
 * Custom React hook to fetch and combine videos from multiple category IDs.
 * 
 * ✅ Used to get all videos that belong to a set of categories (e.g., categories of a specific video).
 * ✅ Automatically deduplicates videos by ID.
 * ✅ Handles loading and error state for combined fetches.
 * 
 * @param categoryIds - An array of category IDs to fetch videos for.
 * 
 * @returns An object containing:
 *  - `videos`: Array of unique videos from all categories.
 *  - `isLoading`: Boolean indicating loading state.
 *  - `error`: Error message string if any fetch fails, otherwise `null`.
 * 
 * @example
 * const { videos, isLoading, error } = useMultipleCategoryVideos(['cat1', 'cat2']);
 */


export function useMultipleCategoryVideos(categoryIds: string[]) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (categoryIds.length === 0) return;

        const fetchAll = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const results = await Promise.all(
                    categoryIds.map((id) => useVideosCategory(id))
                );

                const allVideos = results.flatMap((res) => res.videos || []);
                const uniqueVideos = Array.from(
                    new Map(allVideos.map((v) => [v.id, v])).values()
                );

                setVideos(uniqueVideos);
            } catch (err) {
                setError("Failed to fetch videos");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAll();
    }, [categoryIds]);

    return { videos, isLoading, error };
}

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/utils";

interface UseWatchlistStatusResult {
  isInWatchlist: boolean;
  toggleWatchlist: () => Promise<void>;
  watchlistLoading: boolean;
  watchlistError: string | null;
  watchlistLastAction: "added" | "removed" | null;
}

export function useWatchlistStatus(videoId: string | undefined): UseWatchlistStatusResult {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(true);
  const [watchlistError, setWatchlistError] = useState<string | null>(null);
  const [watchlistLastAction, setLastAction] = useState<"added" | "removed" | null>(null);

  useEffect(() => {
    if (!videoId || !BACKEND_URL) return;

    const fetchWatchlistStatus = async () => {
      setWatchlistLoading(true)
      try {
        const url = `${BACKEND_URL}/api/content/watchlist/${videoId}`;
        // console.log("Requesting:", url);
        const { data } = await axios.get(url, { withCredentials: true });
        setIsInWatchlist(data.success);
      } catch (err) {
        console.error("Error fetching watchlist status", err);
        setWatchlistError("Could not fetch watchlist status");
      } finally {
        setWatchlistLoading(false);
      }
    };

    fetchWatchlistStatus();
  }, [videoId]);


  const toggleWatchlist = async () => {
    if (!videoId) return;

    try {
      if (isInWatchlist) {
        await axios.delete(`${BACKEND_URL}/api/content/watchlist/${videoId}`, {
          withCredentials: true,
        });
        setIsInWatchlist(false);
        setLastAction("removed");
      } else {
        await axios.post(`${BACKEND_URL}/api/content/watchlist/${videoId}`, {}, {
          withCredentials: true,
        });
        setIsInWatchlist(true);
        setLastAction("added");
      }
    } catch (err) {
      console.error("Error toggling watchlist status", err);
      setWatchlistError("Could not update watchlist status");
    }
  };

  return {
    isInWatchlist,
    toggleWatchlist,
    watchlistLoading,
    watchlistError,
    watchlistLastAction,
  };
}

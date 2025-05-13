import axios from "axios";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../lib/utils";
import { Subscription } from "../types/Subscription";

/**
 * useSubscription
 * 
 * @description
 * Custom React hook to fetch user subscription from the backend.
 * 
 * ✅ Used to get current user subscription categories.
 */

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/subscription/subscribed-user`, {
        withCredentials: true,
      })
      .then((res) => {
        setSubscription(res.data);
      })
      .catch((err) => {
        console.error("Error fetching subscription:", err);
        setSubscription(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { subscription, loading };
}

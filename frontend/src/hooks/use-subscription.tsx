// src/hooks/use-GetSubscription.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";

export type Subscription = {
  id: string;  // Unique identifier for the subscription
  userId: string;  // User ID associated with the subscription
  stripeCustomerId: string;  // Stripe customer ID
  stripeSubscriptionId: string;  // Stripe subscription ID
  stripePriceId: string;  // Stripe price ID
  stripeCurrentPeriodEnd: string;  // End date of the current billing period
  createdAt: string;  // Timestamp of when the subscription was created
  updatedAt: string;  // Timestamp of when the subscription was last updated
};

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/subscription/subscribed-user`, {  // Updated the endpoint to fetch subscription data
        withCredentials: true,  // ✅ Important: sends cookies
      })
      .then((res) => {
        setSubscription(res.data);  // Set the subscription data
      })
      .catch((err) => {
        console.error("Error fetching subscription:", err);
        setSubscription(null);  // Set subscription to null if error occurs
      })
      .finally(() => setLoading(false));
  }, []);

  return { subscription, loading };  // Return subscription data and loading state
}

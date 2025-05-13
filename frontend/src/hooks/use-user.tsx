// src/hooks/use-GetUser.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib/utils";

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/users`, {
        withCredentials: true, // ✅ Important: sends cookies
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}

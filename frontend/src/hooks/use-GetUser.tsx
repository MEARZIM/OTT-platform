// src/hooks/use-GetUser.tsx
import { useEffect, useState } from "react";
import axios from "axios";

export type User = {
  id: string;
  name: string | null;
  email: string;
  profileImage: string | null;
};

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users", {
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

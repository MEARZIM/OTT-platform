import axios from "axios";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../lib/utils";

export type Admin = {
    id: string;
    name: string | null;
    email: string;
};

export function useAdmin() {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/admin/current-admin`, {
                withCredentials: true,
            })
            .then((res) => {
                setAdmin(res.data);
            })
            .catch((err) => {
                console.error("Error fetching admin:", err);
                setAdmin(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return { admin, loading };
}

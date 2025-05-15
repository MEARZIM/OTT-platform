import axios from "axios";

import { BACKEND_URL } from "../utils";

export async function fetchToken() {
    const res = await axios.get(`${BACKEND_URL}/api/auth/token`,{
        withCredentials: true
    });
    if (!res.data) {
        throw new Error(`Failed to fetch token`);
    }
    const data = res.data;
    return data;
}

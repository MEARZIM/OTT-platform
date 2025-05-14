import axios from "axios";

import { Video } from "../types/Video";
import { BACKEND_URL } from "./utils";

export async function fetchVideosByCategory(categoryId: string): Promise<Video[]> {
    const res = await axios.get(`${BACKEND_URL}/api/content/video/category/${categoryId}`);
    if (!res.data) {
        throw new Error(`Failed to fetch videos for category ${categoryId}`);
    }
    const data = res.data;
    return data;
}

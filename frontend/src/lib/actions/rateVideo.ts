import axios from "axios";
import { BACKEND_URL } from "../utils";

export async function rateVideo(videoId: string, rating: number) {
    const response = await axios.post(`${BACKEND_URL}/api/content/rating/${videoId}`, {
        rating,
    },{
        withCredentials: true
    });
    return response.data;
}

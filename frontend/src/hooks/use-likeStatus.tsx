import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../lib/utils"

interface UseLikeStatusResult {
    isLiked: boolean
    toggleLike: () => Promise<void>
    likeLoading: boolean
    likeError: string | null
    lastAction: "liked" | "unliked" | null
}

export function useLikeStatus(videoId: string | undefined): UseLikeStatusResult {
    const [isLiked, setIsLiked] = useState(false)
    const [likeLoading, setLoading] = useState(true)
    const [likeError, setError] = useState<string | null>(null)
    const [lastAction, setLastAction] = useState<"liked" | "unliked" | null>(null)

    useEffect(() => {
        if (!videoId) return

        const fetchStatus = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/api/content/like/${videoId}`, {
                    withCredentials: true,
                })
                setIsLiked(data.success)
            } catch (err) {
                console.error("Error fetching like status", err)
                setError("Could not fetch like status")
            } finally {
                setLoading(false)
            }
        }

        fetchStatus()
    }, [videoId])

    const toggleLike = async () => {
        if (!videoId) return

        try {
            if (isLiked) {
                await axios.delete(`${BACKEND_URL}/api/content/like/${videoId}`, {
                    withCredentials: true,
                })
                setIsLiked(false)
                setLastAction("unliked")
            } else {
                await axios.post(`${BACKEND_URL}/api/content/like/${videoId}`, {}, {
                    withCredentials: true,
                })
                setIsLiked(true)
                setLastAction("liked")
            }
        } catch (err) {
            console.error("Error toggling like", err)
            setError("Could not update like status")
        }
    }

    return { isLiked, toggleLike, likeLoading, likeError, lastAction }
}

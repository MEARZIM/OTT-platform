import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../../components/ui/button"
import { LogOut } from "lucide-react"
import { BACKEND_URL } from "../../../../lib/utils"

const SignOut = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async () => {
        setIsLoading(true)
        try {
            await axios.get(`${BACKEND_URL}/api/admin/logout`, {
                withCredentials: true,
            })

            navigate("/admin-login");
        } catch (error) {
            console.error("Error during sign out:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="destructive"
            size="lg"
            className="my-2 mx-4 hover:cursor-pointer"
            onClick={handleSignOut}
            disabled={isLoading}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                        ></path>
                    </svg>
                    Signing out...
                </span>
            ) : (
                <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </>
            )}
        </Button>
    )
}

export default SignOut

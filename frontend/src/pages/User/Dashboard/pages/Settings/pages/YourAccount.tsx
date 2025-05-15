import { ArrowLeft, Crown } from "lucide-react"
import { Link } from "react-router-dom"

import { useUser } from "../../../../../../hooks/use-user"
import { useSubscription } from "../../../../../../hooks/use-subscription";
import Sidebar from "../../../components/Sidebar";
import { SidebarProvider } from "../../../../../../components/ui/sidebar";

export default function YourAccountPage() {
    const { user } = useUser();
    const { subscription } = useSubscription();

    return (
        <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
            <SidebarProvider>
            {user &&
                <Sidebar
                    user={user}
                />
            }
            <div className="flex-1 overflow-y-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center mb-10">
                    <Link to="/settings" className="mr-4 hover:opacity-80 transition">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Your Account</h1>
                </div>

                {/* Account Info Form */}
                <div className="max-w-xl mx-auto bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl shadow-md">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={user?.profileImage || "/assets/avatar.png"}
                                alt="Profile"
                                onError={(e) => {
                                    e.currentTarget.src = "/assets/avatar.png";
                                }}
                                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                            />
                            {subscription && (
                                <Crown className="absolute -bottom-1 -right-1 text-yellow-400 fill-amber-400 rounded-full p-1 w-10 h-10" />
                            )}
                        </div>


                    </div>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                value={user?.name || ""}
                                className="w-full px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-800 border border-gray-700 text-black dark:text-white"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                className="w-full px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-800 border border-gray-700 text-black dark:text-white"
                                disabled
                            />
                        </div>
                    </form>
                </div>
            </div>
        </SidebarProvider>
        </div >
    );
}

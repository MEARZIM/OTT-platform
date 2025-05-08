import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function YourAccountPage() {
    return (
        <div className="flex h-screen bg-[#0f171e] text-white">
            <div className="flex-1 overflow-y-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center mb-10">
                    <Link to="/settings" className="mr-4 hover:opacity-80 transition">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Your Account</h1>
                </div>

                {/* Account Info */}
                <div className="max-w-3xl mx-auto bg-[#1a242f] p-6 rounded-xl shadow-md space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Account Information</h2>
                        <p className="text-gray-400 text-sm">Update your personal details and preferences.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value="user@example.com"
                                className="w-full px-3 py-2 rounded bg-[#252e39] border border-gray-700 text-white"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                value="dreamerArmyst07"
                                className="w-full px-3 py-2 rounded bg-[#252e39] border border-gray-700 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Change Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-3 py-2 rounded bg-[#252e39] border border-gray-700 text-white"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-[#00a8e1] px-4 py-2 rounded text-white font-semibold hover:bg-[#0090c7] transition">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

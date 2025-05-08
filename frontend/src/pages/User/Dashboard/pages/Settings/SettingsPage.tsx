import { ArrowLeft, LogOut, History, User } from "lucide-react"
import { Link } from "react-router-dom"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#0f171e] text-white">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-10">
          <Link to="/dashboard" className="mr-4 hover:opacity-80 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Settings Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl space-y-8">
            {/* Account & Settings */}
            <div className="bg-[#1a242f] rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#252e39] px-6 py-4 font-semibold text-lg border-b border-gray-700">
                Account & Settings
              </div>

              <div className="divide-y divide-gray-700">
                {/* Your Account */}
                <Link to="/settings/account">
                  <div className="flex items-center justify-between px-6 py-4 hover:bg-[#2a3440] transition rounded-t-md cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-medium">
                        <User className="h-4 w-4 text-[#00a8e1]" />
                        <span>Your Account</span>
                      </div>
                      <p className="text-sm text-gray-400">Manage your Prime View account</p>
                    </div>
                    <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
                  </div>
                </Link>

                {/* Watch History */}
                <Link to="/settings/watch-history">
                  <div className="flex items-center justify-between px-6 py-4 hover:bg-[#2a3440] transition cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-medium">
                        <History className="h-4 w-4 text-[#00a8e1]" />
                        <span>Watch History</span>
                      </div>
                      <p className="text-sm text-gray-400">View or manage your watch history</p>
                    </div>
                    <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
                  </div>
                </Link>

                {/* Sign Out */}
                <div className="flex items-center justify-between px-6 py-4 hover:bg-[#2a3440] transition rounded-b-md cursor-pointer">
                  <div className="flex items-center gap-2 text-[#00a8e1] font-semibold">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



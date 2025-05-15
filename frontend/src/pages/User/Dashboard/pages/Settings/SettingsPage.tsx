import { ArrowLeft, LogOut, History, User } from "lucide-react"
import { Link } from "react-router-dom"
import { BACKEND_URL } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { SidebarProvider } from "../../../../../components/ui/sidebar";
import { useUser } from "../../../../../hooks/use-user";
import Sidebar from "../../components/Sidebar";

export default function SettingsPage() {

  const { user } = useUser();
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.location.href = `${BACKEND_URL}/api/auth/logout`
  }

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
      <SidebarProvider>
        {user &&
          <Sidebar
            user={user}
          />
        }
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center mb-10">
            <Link to="/dashboard" className="mr-4 hover:opacity-80 transition">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>
          </div>

          {/* Settings Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl space-y-8">
              {/* Account & Settings */}
              <div className="bg-zinc-200 dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden">
                <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-4 font-semibold text-lg border-b border-gray-700 text-black dark:text-white">
                  Account & Settings
                </div>

                <div className="divide-y divide-gray-700">
                  {/* Your Account */}
                  <Link to="/settings/account">
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition rounded-t-md cursor-pointer">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-medium">
                          <User className="h-4 w-4 text-[#028fbe]" />
                          <span>Your Account</span>
                        </div>
                        <p className="text-sm text-gray-400">Manage your Prime View account</p>
                      </div>
                      <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
                    </div>
                  </Link>

                  {/* Watch History */}
                  <Link to="/settings/watch-history">
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition cursor-pointer">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-medium">
                          <History className="h-4 w-4 text-[#028fbe]" />
                          <span>Watch History</span>
                        </div>
                        <p className="text-sm text-gray-400">View or manage your watch history</p>
                      </div>
                      <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
                    </div>
                  </Link>

                  {/* Sign Out */}
                  <div className="flex items-center justify-between px-6 py-4 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition rounded-b-md ">
                    <div className="flex items-center gap-2 text-[#028fbe] font-semibold">
                      <Button
                        className="bg-inherit text-inherit hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:cursor-pointer"
                        onClick={handleLogout}
                        size={"lg"}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}



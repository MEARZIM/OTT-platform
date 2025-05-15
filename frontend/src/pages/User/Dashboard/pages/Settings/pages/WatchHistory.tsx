import { ArrowLeft, Eye, Pause, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../../../../../../components/ui/alert-dialog"
import Sidebar from "../../../components/Sidebar";
import { useUser } from "../../../../../../hooks/use-user";
import { SidebarProvider } from "../../../../../../components/ui/sidebar";

export default function WatchHistoryPage() {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-8 px-4">
      <SidebarProvider>
        {user &&
          <Sidebar
            user={user}
          />
        }

        {/* Header */}
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/settings" className="hover:opacity-80 transition">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">Watch History</h1>
          </div>
          <div className="max-w-3xl mt-10 flex items-center justify-center mx-auto">
            <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg p-6 shadow-md space-y-6">

              {/* Section Title */}
              <h2 className="text-lg font-semibold">Manage your Watch History</h2>

              {/* View Full History */}
              <Link to="/mystuff?tab=recently-watched">
                <button className="w-full flex items-center gap-3 px-4 py-3 mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">
                  <Eye className="h-5 w-5 text-[#00a8e1]" />
                  <span>View Full History</span>
                </button>
              </Link>

              {/* Clear History Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">
                    <Trash2 className="h-5 w-5 text-[#00a8e1]" />
                    <span>Clear Watch History</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-200 dark:bg-zinc-900 text-black dark:text-white border border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Watch History?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-500">
                      This action cannot be undone. It will permanently delete your Prime View watch history and reset video recommendations.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-black dark:text-white bg-gray-200 hover:bg-gray-300">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Pause History Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">
                    <Pause className="h-5 w-5 text-[#00a8e1]" />
                    <span>Pause Watch History</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-200 dark:bg-zinc-900 text-black dark:text-white border border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Pause Watch History?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-500">
                      Pausing watch history may affect your ability to find watched videos and reduce recommendation accuracy on Prime View.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-black dark:text-white bg-gray-200 hover:bg-gray-300">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Pause
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </div>

        </div>

      </SidebarProvider>
    </div>
  )
}

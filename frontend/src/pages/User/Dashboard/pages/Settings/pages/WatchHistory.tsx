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

export default function WatchHistoryPage() {
  return (
    <div className="min-h-screen bg-[#0f171e] text-white py-8 px-4">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="hover:opacity-80 transition">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Watch History</h1>
      </div>

      {/* Options Section */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a242f] rounded-lg p-6 shadow-md space-y-6">

          {/* Section Title */}
          <h2 className="text-lg font-semibold">Manage your Watch History</h2>

          {/* View Full History */}
          <Link to="/mystuff" className="block">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#252e39] rounded hover:bg-[#2e3947] transition">
              <Eye className="h-5 w-5 text-[#00a8e1]" />
              <span>View Full History</span>
            </button>
          </Link>

          {/* Clear History Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#252e39] rounded hover:bg-[#2e3947] transition">
                <Trash2 className="h-5 w-5 text-[#00a8e1]" />
                <span>Clear Watch History</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0f171e] text-white border border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Watch History?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  This action cannot be undone. It will permanently delete your Prime View watch history and reset video recommendations.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black bg-gray-200 hover:bg-gray-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Clear
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Pause History Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#252e39] rounded hover:bg-[#2e3947] transition">
                <Pause className="h-5 w-5 text-[#00a8e1]" />
                <span>Pause Watch History</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0f171e] text-white border border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle>Pause Watch History?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  Pausing watch history may affect your ability to find watched videos and reduce recommendation accuracy on Prime View.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black bg-gray-200 hover:bg-gray-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700">
                  Pause
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </div>
  )
}

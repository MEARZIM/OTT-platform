import { useParams, Link } from "react-router-dom";
import { useVideosCategory } from "../../../../../hooks/use-videosCategory";
import { ArrowLeft } from "lucide-react";

import { SidebarProvider } from "../../../../../components/ui/sidebar";
import { useUser } from "../../../../../hooks/use-user";
import Sidebar from "../../components/Sidebar";
import { Separator } from "../../../../../components/ui/separator";

const CategoryPage = () => {
  const { user } = useUser()
  const { id: categoryId, name: categoryName } = useParams<{ id: string, name: string }>();
  const { videos, videoCategoryLoading } = useVideosCategory(categoryId || "");

  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      <SidebarProvider>

        {user && <Sidebar
          user={user}
        />}

        <div className="flex flex-col">
          <div className="flex items-center mb-6">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl sm:text-3xl font-bold">
              Content in {categoryName} Category
            </h1>
          </div>

          <Separator className="border-b border-gray-700 mb-6" />

          <div className="px-6">
            {/* Video Grid */}
            {videoCategoryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array(10).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="bg-zinc-300 dark:bg-zinc-800 h-[225px] w-full rounded" />
                    <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : videos.length === 0 ? (
              <p className="text-zinc-500">No videos found for this category.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {videos.map((video) => (
                  <Link
                    key={video.id}
                    to={`/player/${video.id}`}
                    className="block group w-full"
                  >
                    <div className="w-full aspect-2/3 rounded-lg overflow-hidden bg-zinc-300 dark:bg-zinc-700">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition group-hover:opacity-90"
                      />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium line-clamp-2">
                      {video.title}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </SidebarProvider>
    </div>
  );
};

export default CategoryPage;


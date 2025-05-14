import { useParams, Link } from "react-router-dom";
import { useVideosCategory } from "../../../../../hooks/use-videosCategory";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { id: categoryId } = useParams<{ id: string }>();
  const { videos, videoCategoryLoading } = useVideosCategory(categoryId || "");

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Content in this Category</h1>
      </div>

      <div className="border-b border-gray-700 mb-6" />

      {/* Video Grid */}
      {videoCategoryLoading ? (
        <p className="text-zinc-500">Loading videos...</p>
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
              <div className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-zinc-300 dark:bg-zinc-700">
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
  );
};

export default CategoryPage;


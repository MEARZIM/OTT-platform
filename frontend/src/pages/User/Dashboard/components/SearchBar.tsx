import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import videoData from "../../../../lib/data";


type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Video[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (!value.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      const filtered = videoData.filter((video) =>
        video.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setShowDropdown(true);
    }, 2000);
  };

  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <div className="p-4 relative w-full" onBlur={handleClickOutside}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="w-full bg-zinc-100 dark:bg-zinc-900 border border-gray-400 rounded-md py-2 px-4 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a8e1]"
        />
        <div className="absolute right-3 top-2.5">
          <Search className="h-5 w-5 text-black dark:text-white" />
        </div>

        {/* Dropdown Results */}
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
            {results.length > 0 ? (
              results.map((video) => (
                <Link
                  key={video.id}
                  to={`/watch/${video.id}`}
                  className="flex items-start px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                    setShowDropdown(false);
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-16 h-10 object-cover rounded mr-4"
                  />
                  <div>
                    <div className="font-medium text-sm">{video.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {video.description}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                No results found.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBar;

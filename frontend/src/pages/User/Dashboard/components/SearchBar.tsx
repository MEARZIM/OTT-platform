import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../../../lib/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/api/content/video/search`, {
          params: { query: value },
          withCredentials: true,
        });

        setResults(res.data || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setShowDropdown(true);
      }
    }, 500);
  };

  return (
    <div className="p-2 sm:p-4 relative w-full" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="w-full bg-zinc-100 dark:bg-zinc-900 border border-gray-400 rounded-md py-2 px-10 text-sm sm:text-base text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a8e1]"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="h-5 w-5 text-black dark:text-white" />
        </div>

        {/* Dropdown Results */}
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
            {results.length > 0 ? (
              results.map((video) => (
                <a
                  key={video.id}
                  href={`/player/${video.id}`}
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
                    className="w-16 h-10 object-cover rounded mr-3 flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <div className="font-medium text-sm line-clamp-1">{video.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {video.description}
                    </div>
                  </div>
                </a>
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

import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="p-4 relative">
        <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-gray-400 rounded-md py-2 px-4 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a8e1]"
            />
            <div className="absolute right-3 top-2.5">
              <Search className="h-5 w-5 text-black dark:text-white" />
            </div>
        </div>
    </div>
  )
}

export default SearchBar

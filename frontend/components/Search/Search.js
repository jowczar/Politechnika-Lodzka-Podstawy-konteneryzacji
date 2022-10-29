import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export const Search = ({ className }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    return (
        <div className={`flex flex-row bg-white rounded items-center gap-2 border border-gray-300 relative ${className}`}>
            <AiOutlineSearch size={20} className="absolute left-2 text-gray-300"/>
            <input 
                type="text" 
                className="text-xs p-2 px-9 h-full rounded grow focus:ring-gray-400 focus:outline-gray-400" 
                placeholder="Search any channel..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

Search.displayName = "Search"

export default Search;
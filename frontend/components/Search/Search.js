import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export const Search = ({ className }) => {
    const router = useRouter();
    // TODO: change me to actual request to backend searching channels
    const [data, setData] = useState([
        {"id": 1, "name": "Uwaga! Naukowy bełkot"},
        {"id": 2, "name": "TODO: change me"},
        {"id": 3, "name": "Very long youtube channel name"},
    ]);
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const onChannelClick = () => {
        console.log('🫡 TODO: redirect to channel page');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            router.push({
                pathname: '/channel/[search]',
                query: { search },
            });
        }
    }

    return (
        <div className={`flex flex-row bg-white rounded items-center gap-2 border border-gray-300 relative ${className}`}>
            <AiOutlineSearch size={20} className="absolute left-2 text-gray-300"/>
            <input 
                type="text" 
                className="text-xs p-2 px-9 h-full rounded grow focus:ring-gray-400 focus:outline-gray-400" 
                placeholder="Search any channel..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
            />
            <div className={clsx('absolute ease-in-out duration-300 transition top-[105%] w-full rounded-b bg-white text-xs shadow-md', isFocused && "opacity-100", !isFocused && "opacity-0")}>
                {data.map((element, i) => (
                    <div 
                        key={"result_" + i} 
                        className='px-4 py-2 hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all last:rounded-b'
                        onClick={onChannelClick}
                    >
                            {element.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

Search.displayName = "Search"

export default Search;
import { useState } from "react";

import Image from "next/image";

import { SearchIcon, 
        GlobeAltIcon, 
        MenuIcon, 
        UsersIcon 
    } from "@heroicons/react/solid";

function Header() {

    const [searchInput, setSearchInput] = useState("");

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            
            {/* Left */}
            <div className="relative flex items-center h-8 cursor-pointer my-auto">
                <Image 
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                    value={searchInput} 
                    onChange={(e)=> setSearchInput(e.target.value)} 
                    type="text" 
                    placeholder="Start your search" 
                    className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
                />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            {/* Right */}
            <div className="flex items-center md:space-x-3 space-x-4  justify-end text-gray-700">
                <p className=" hidden md:inline cursor-pointer hover:bg-gray-100 p-3 rounded-full">host worden</p>
                <GlobeAltIcon className="h-10 cursor-pointer hover:bg-gray-100 p-2 hover:h-10 rounded-full"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-md cursor-pointer">
                    <MenuIcon className="h-6" />
                    <UsersIcon className="h-6" />
                </div>
            </div>
        </header>
    )
}

export default Header

import { useState } from "react";
import { useRouter } from "next/dist/client/router";

import Image from "next/image";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { SearchIcon, 
        GlobeAltIcon, 
        MenuIcon, 
        UsersIcon 
    } from "@heroicons/react/solid";


function Header({ placeholder }) {

    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const selectionRange = {
        key: "selection",
        startDate: startDate,
        endDate: endDate
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                checkIn: startDate.toJSON(),
                checkOut: endDate.toJSON(),
                noOfGuests
            }
        });
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-3 md:px-10">
            <div 
                className="relative flex items-center h-8 cursor-pointer my-auto"
                onClick={() => router.push("/")}
            >
                <Image 
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                    value={searchInput} 
                    onChange={(e)=> setSearchInput(e.target.value)} 
                    type="text" 
                    placeholder={placeholder || "Start your search"} 
                    className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm"
                />
                <SearchIcon className="hidden md:inline-flex h-8 bg-[#FD5B61] text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            <div className="flex items-center md:space-x-3 space-x-4  justify-end text-gray-700">
                <p className=" hidden md:inline cursor-pointer hover:bg-gray-100 p-3 rounded-full">host worden</p>
                <GlobeAltIcon className="h-10 cursor-pointer hover:bg-gray-100 p-2 hover:h-10 rounded-full"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-md cursor-pointer">
                    <MenuIcon className="h-6" />
                    <UsersIcon className="h-6" />
                </div>
            </div>

            { searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Aantal gasten</h2>
                        <UsersIcon className="h-5" />
                        <input 
                            className="w-12 pl-2 text-lg outline-none text-[#FD5B61]" 
                            type="number" 
                            value={noOfGuests}
                            min="1"
                            onChange={e => setNoOfGuests(e.target.value)}
                            />
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Annuleren</button>
                        <button onClick={search} className="flex-grow text-[#FD5B61]">Zoek</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header

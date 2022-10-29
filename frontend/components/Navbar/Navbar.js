import { useState } from "react";
import Avatar from "../Avatar";
import MenuList from "./MenuList";
import { MdLogout } from 'react-icons/md'

export const Navbar = ({ user: { avatar, email } }) => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleAccountMenu = () => {
        setShowAccountMenu(!showAccountMenu);
    };

    return (
        <div className="flex flex-row w-full items-center bg-reddishWhite py-3 px-5 drop-shadow select-none">
            <MenuList />
            <div className="grow"></div>
            <div className="h-9 w-9 relative">
                <Avatar onClick={handleAccountMenu} link={avatar} className="hover:cursor-pointer hover:scale-110 duration-700" />
                <div style={{ display: showAccountMenu ? 'block' : 'none' }} className="absolute py-1 rounded -translate-x-full bg-white shadow-md text-sm flex flex-col gap-4">
                    <div className="px-4 py-2 flex flex-col">
                        Signed in as: 
                        <div className="font-bold whitespace-nowrap">{email}</div>
                    </div>
                    <div className="px-4 py-2 border-t border-t-gray-100 flex flex-row gap-2 items-center hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all">
                        <MdLogout size={16}/> Sign out
                    </div>
                </div>
            </div>
        </div>
    )
}

Navbar.displayName = "Navbar"

export default Navbar;
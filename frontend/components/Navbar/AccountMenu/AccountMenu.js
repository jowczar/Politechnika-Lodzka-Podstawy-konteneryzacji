import { useEffect, useRef, useState } from "react";
import Avatar from "../../Avatar";
import { MdLogout } from 'react-icons/md'
import { useRouter } from "next/router";
import clsx from 'clsx'
import listenForOutsideClicks from "../../../hooks/OutsideClickHook";
import { useUser } from "../../../contexts/UserProvider";

export const AccountMenu = () => {
    const { email, avatar, logout } = useUser();
    const menuRef = useRef(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [listening, setListening] = useState(false);

    useEffect(listenForOutsideClicks(
        listening,
        setListening,
        menuRef,
        setShowAccountMenu,
    ));

    const handleAccountMenu = () => {
        setShowAccountMenu(!showAccountMenu);
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            <span className="text-sm md:hidden">{email}</span>
            <div className="h-9 w-9 relative z-50" ref={menuRef}>
                <Avatar onClick={handleAccountMenu} link={avatar} className="hover:cursor-pointer hover:scale-110 duration-700" />
                <div className={clsx(
                    "absolute top-[110%] right-0 py-1 rounded bg-white shadow-md text-sm flex flex-col gap-4",
                    "ease-in-out duration-300 transition",
                    showAccountMenu && "opacity-100 block", 
                    !showAccountMenu && "opacity-0 hidden"
                )}>
                    <div className="px-4 py-2 flex flex-col">
                        Signed in as: 
                        <div className="font-bold whitespace-nowrap">{email}</div>
                    </div>
                    <div 
                        onClick={logout}
                        className="px-4 py-2 border-t border-t-gray-100 flex flex-row gap-2 items-center hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all"
                    >
                        <MdLogout size={16}/> Sign out
                    </div>
                </div>
            </div>
        </div>
    )
}

AccountMenu.displayName = "AccountMenu"

export default AccountMenu;
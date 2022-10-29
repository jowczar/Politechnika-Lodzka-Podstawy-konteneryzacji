import MenuList from "./MenuList";
import AccountMenu from "./AccountMenu";
import Search from "../Search";

export const Navbar = ({ user }) => {
    return (
        <div className="flex flex-row w-full items-center bg-reddishWhite py-3 px-5 drop-shadow select-none">
            <MenuList />
            <div className="grow flex justify-center">
                <Search className="w-[50%]"/>
            </div>
            <AccountMenu user={user} />
        </div>
    )
}

Navbar.displayName = "Navbar"

export default Navbar;
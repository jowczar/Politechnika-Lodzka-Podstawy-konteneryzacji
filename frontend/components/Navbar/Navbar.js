import MenuList from "./MenuList";
import AccountMenu from "./AccountMenu";
import Search from "../Search";

export const Navbar = () => {
    return (
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row w-full items-center bg-reddishWhite py-3 px-10 drop-shadow select-none relative z-20">
            <MenuList />
            <div className="grow flex justify-center">
                <Search className="lg:w-[50%]"/>
            </div>
            <AccountMenu />
        </div>
    )
}

Navbar.displayName = "Navbar"

export default Navbar;
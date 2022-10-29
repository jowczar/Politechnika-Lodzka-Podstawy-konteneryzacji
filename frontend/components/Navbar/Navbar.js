import MenuList from "./MenuList";

export const Navbar = () => {
    return (
        <div className="flex flex-row w-full bg-reddishWhite py-3 px-5 drop-shadow">
            <MenuList />
        </div>
    )
}

Navbar.displayName = "Navbar"

export default Navbar;
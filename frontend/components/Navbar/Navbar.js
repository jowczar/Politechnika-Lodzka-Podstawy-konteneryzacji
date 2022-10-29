import Avatar from "../Avatar";
import MenuList from "./MenuList";

export const Navbar = ({ user: { avatar } }) => {
    return (
        <div className="flex flex-row w-full items-center bg-reddishWhite py-3 px-5 drop-shadow">
            <MenuList />
            <div className="grow"></div>
            <div className="h-9 w-9 hover:cursor-pointer hover:scale-125 duration-700">
                <Avatar link={avatar} />
            </div>
        </div>
    )
}

Navbar.displayName = "Navbar"

export default Navbar;
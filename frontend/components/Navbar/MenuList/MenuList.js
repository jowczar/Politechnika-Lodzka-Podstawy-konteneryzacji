import * as React from "react";
import MenuOption from "./MenuOption";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BsListStars } from "react-icons/bs"
import { TbBrandYoutube } from 'react-icons/tb';
import { useRouter } from "next/router";

export const MenuList = () => {
    const router = useRouter();

    return (
        <div className="flex flex-row gap-1">
            <MenuOption isActive={router.asPath === '/channels'} link="/channels">
                <TbBrandYoutube size={24} /><span>Channels</span>
            </MenuOption>
            <MenuOption isActive={router.asPath === '/groups'} link="/groups">
                <HiOutlineLightBulb size={24} /><span>Groups</span>
            </MenuOption>
            <MenuOption isActive={router.asPath === '/lists'} link="/lists">
                <BsListStars size={24} /><span>Lists</span>
            </MenuOption>
        </div>
    )
}

MenuList.displayName = "MenuList"

export default MenuList;

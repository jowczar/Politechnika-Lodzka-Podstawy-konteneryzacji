import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

export const MenuOption = ({ isActive, link = '#', children }) => {
    const router = useRouter();

    const onClick = (e) => {
        e.preventDefault();
        router.push(link);
    }

    return (
        <a 
            href={link}
            onClick={onClick}
            className={clsx(
                "flex flex-row gap-2 items-center text-xs transient-colors duration-300",
                "py-2 px-2 sm:px-5 rounded w-fit hover:cursor-pointer",
                isActive && "text-white bg-primary-lighter hover:bg-primary",
                !isActive && "text-black hover:text-white hover:bg-primary-lighter",
            )}
        >
            {children}
        </a>
    )
}

MenuOption.displayName = "MenuOption"

export default MenuOption;

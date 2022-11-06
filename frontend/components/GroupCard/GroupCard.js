import clsx from 'clsx';
import { getTimeComment } from '../VideoCard/VideoCard.helper';
import { TfiMore } from 'react-icons/tfi';
import { Fragment, useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from '../../hooks/OutsideClickHook';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Menu, Transition } from '@headlessui/react'

export const GroupCard = ({ name, lastUpdate, isSelected, newContent, className, onEdit = () => {}, onDelete = () => {} }) => {
    const menuRef = useRef(null);
    const [showGroupMenu, setShowGroupMenu] = useState(false);
    const [listening, setListening] = useState(false);

    useEffect(listenForOutsideClicks(
        listening,
        setListening,
        menuRef,
        setShowGroupMenu,
    ));

    const markSelected = () => { console.log('TODO: mark selected here')};

    const handleGroupMenu = () => setShowGroupMenu(!showGroupMenu);

    return (
        <div 
            className={clsx(
                'bg-reddishWhite rounded drop-shadow-md select-none flex flex-col justify-center',
                'min-w-[100px] z-10 w-fit h-14 p-2 cursor-pointer transition-all duration-150',
                'hover:bg-primary hover:text-white group',
                isSelected && "bg-primary-lighter text-white",
                className
            )}
            onClick={markSelected}
            ref={menuRef}
        >
            <div className='text-sm font-bold flex flex-row gap-0.5'>
                <span>{name}</span>
                {newContent && <div className={clsx('w-1.5 h-1.5 bg-primary-lighter rounded-full group-hover:bg-white', isSelected && "bg-white")}></div>}
            </div>
            <Menu as="div" className='flex flex-row items-center relative'>
                <div className={clsx('font-light text-xs text-gray-500 grow group-hover:text-white', isSelected && "text-white")}>{lastUpdate ? getTimeComment(lastUpdate) : 'no content'}</div>
                <Menu.Button>
                    <TfiMore size={10} className='rotate-90 hover:scale-125 hover:duration-700' onClick={handleGroupMenu} />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className={clsx(
                        "absolute z-20 top-[125%] right-0 py-1 rounded bg-white shadow-md text-sm flex flex-col",
                        "text-black text-xs",
                        "ring-1 ring-black ring-opacity-5 focus:outline-none",
                        showGroupMenu && "opacity-100 block", 
                        !showGroupMenu && "opacity-0 hidden"
                    )}>
                        <Menu.Item>
                            {({ active }) => (
                                <div 
                                    onClick={onEdit}
                                    className={clsx(
                                        "px-4 py-2 flex flex-row gap-2 items-center hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all",
                                        active && "bg-primary-lighter text-white",
                                    )}
                                >
                                    <MdEdit /> Edit
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div 
                                    onClick={onDelete}
                                    className={clsx(
                                        "text-red-500 px-4 py-2 border-t border-t-gray-100 flex flex-row gap-2 items-center hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all",
                                        active && "bg-primary-lighter !text-white"
                                    )}
                                >
                                    <MdDelete /> Delete
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

GroupCard.displayName = "GroupCard"

export default GroupCard;
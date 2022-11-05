import clsx from 'clsx';
import { getTimeComment } from '../VideoCard/VideoCard.helper';
import { TfiMore } from 'react-icons/tfi';
import { useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from '../../hooks/OutsideClickHook';
import { MdEdit, MdDelete } from 'react-icons/md';

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
                'min-w-[100px] w-fit h-14 p-2 cursor-pointer transition-all duration-150',
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
            <div className='flex flex-row items-center relative'>
                <div className={clsx('font-light text-xs text-gray-500 grow group-hover:text-white', isSelected && "text-white")}>{lastUpdate ? getTimeComment(lastUpdate) : 'no content'}</div>
                <TfiMore size={10} className='rotate-90 hover:scale-125 hover:duration-700' onClick={handleGroupMenu} />
                <div className={clsx(
                    "absolute top-full left-full py-1 rounded bg-white shadow-md text-sm flex flex-col",
                    "ease-in-out duration-300 transition text-black text-xs",
                    showGroupMenu && "opacity-100 block", 
                    !showGroupMenu && "opacity-0 hidden"
                )}>
                    <div 
                        onClick={onEdit}
                        className="px-4 py-2 flex flex-row gap-2 items-center hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all"
                    >
                        <MdEdit /> Edit
                    </div>
                    <div 
                        onClick={onDelete}
                        className="text-red-500 px-4 py-2 border-t border-t-gray-100 flex flex-row gap-2 items-center hover:bg-primary-lighter hover:cursor-pointer hover:text-white transition-all"
                    >
                        <MdDelete /> Delete
                    </div>
                </div>
            </div>
        </div>
    )
}

GroupCard.displayName = "GroupCard"

export default GroupCard;
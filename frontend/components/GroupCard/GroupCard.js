import { IoIosCheckmarkCircle } from 'react-icons/io';
import clsx from 'clsx';
import { getTimeComment } from '../VideoCard/VideoCard.helper';
import { TfiMore } from 'react-icons/tfi';

export const GroupCard = ({ id, name, lastUpdate, isSelected, newContent }) => {

    const showMenu = () => {}

    const markSelected = () => { console.log('TODO: mark selected here')};

    return (
        <div 
            className={clsx(
                'bg-reddishWhite rounded drop-shadow-md select-none flex flex-col justify-center',
                'min-w-[100px] w-fit h-14 p-2 cursor-pointer transition-all duration-150',
                'hover:bg-primary hover:text-white group',
                isSelected && "bg-primary-lighter text-white",
            )}
            onClick={markSelected}
        >
            <div className='text-sm font-bold flex flex-row gap-0.5'>
                <span>{name}</span>
                {newContent && <div className={clsx('w-1.5 h-1.5 bg-primary-lighter rounded-full group-hover:bg-white', isSelected && "bg-white")}></div>}
            </div>
            <div className='flex flex-row items-center'>
                <div className={clsx('font-light text-xs text-gray-500 grow group-hover:text-white', isSelected && "text-white")}>{lastUpdate ? getTimeComment(lastUpdate) : 'no content'}</div>
                <TfiMore size={10} className='rotate-90 hover:scale-125 hover:duration-700' onClick={showMenu} />
            </div>
        </div>
    )
}

GroupCard.displayName = "GroupCard"

export default GroupCard;
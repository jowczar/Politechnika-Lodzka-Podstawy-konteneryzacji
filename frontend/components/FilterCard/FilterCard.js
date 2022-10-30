import { IoIosCheckmarkCircle } from 'react-icons/io';
import clsx from 'clsx';

export const FilterCard = ({ isActive }) => {
    const markActive = () => { console.log('TODO: mark active') }

    return (
        <div 
            className={clsx(
                "w-28 h-14 p-2 pr-3 rounded drop-shadow-md select-none flex flex-row items-center cursor-pointer transition-all duration-150",
                !isActive && "bg-reddishWhite hover:bg-primary hover:text-white",
                isActive && "bg-primary-lighter text-white hover:bg-primary"
            )} 
            onClick={markActive}
        >
            <div className='text-sm leading-tight'>Show watched</div>
            <div className='rounded-full w-6 h-6'>
                <IoIosCheckmarkCircle size={28} />
            </div>
        </div>
    )
}

FilterCard.displayName = "FilterCard"

export default FilterCard;
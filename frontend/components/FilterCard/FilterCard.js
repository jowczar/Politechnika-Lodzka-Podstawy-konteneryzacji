import clsx from 'clsx';

export const FilterCard = ({ isActive, text, icon, onClick = () => {} }) => {

    return (
        <div 
            className={clsx(
                "w-28 h-14 p-2 pr-3 rounded drop-shadow-md select-none flex flex-row items-center cursor-pointer transition-all duration-150",
                !isActive && "bg-reddishWhite hover:bg-primary hover:text-white",
                isActive && "bg-primary-lighter text-white hover:bg-primary"
            )} 
            onClick={() => onClick(!isActive)}
        >
            <div className='text-sm leading-tight'>{text}</div>
            <div className='rounded-full w-6 h-6'>
                {icon}
            </div>
        </div>
    )
}

FilterCard.displayName = "FilterCard"

export default FilterCard;
import { getTimeComment } from './VideoCard.helper'
import { MdOutlineDone, MdOutlineRemoveDone } from 'react-icons/md';
import { IoMdCloseCircle, IoMdRefreshCircle } from 'react-icons/io';
import clsx from 'clsx'

export const VideoCard = ({ video: { thumbnail, title, duration, uploadTime, channelName, channelAvatar, isWatched, isHidden }, className }) => {

    const markDone = () => { console.log('TODO: mark as done'); } 

    const hide = () => { console.log('TODO: mark as hidden'); } 

    const markUndone = () => { console.log('TODO: mark as undone'); } 

    const unHide = () => { console.log('TODO: mark as unhidden'); }

    return (
        <div className={`bg-white w-fit rounded drop-shadow-md ${className}`}>
            <div className={'relative transition-all'}>
                <img src={thumbnail} alt="thumbnail" className={clsx("rounded-t h-[200px] w-[355px]", (isWatched || isHidden) && "opacity-50")} />
                <h5 className='absolute rounded bottom-1 right-1 font-bold text-[8px] text-white bg-black py-px px-1'>{duration}</h5>
                {isWatched && (
                    <div className='absolute opacity-100 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-green-600 rounded-full p-4'>
                        <MdOutlineDone className='text-white' size={50} />
                    </div>
                )}
            </div>
            <div className='flex flex-row px-5 py-4 gap-3'>
                <img src={channelAvatar} alt="channel avatar" className="h-9 w-9 rounded-full" />
                <div className='flex flex-col gap-1'>
                    <h3 className="font-bold text-xs">{title}</h3>
                    <h4 className="text-xs text-gray-600">{channelName}</h4>
                </div>
            </div>
            <div className="flex flex-row h-11 px-5 py-4 bg-grey rounded-b justify-between items-center">
                <h5 className="text-xs text-gray-500">{getTimeComment(uploadTime)}</h5>
                <div className='flex flex-row gap-2'>
                    {!isWatched && !isHidden && (
                        <>
                            <MdOutlineDone onClick={markDone} className='hover:cursor-pointer hover:scale-110 duration-700 hover:text-green-500' size={24} />
                            <IoMdCloseCircle onClick={hide} className='hover:cursor-pointer hover:scale-110 duration-700 hover:text-red-500' size={24} />
                        </>
                    )}
                    {isWatched && !isHidden && <MdOutlineRemoveDone onClick={markUndone} className='hover:cursor-pointer hover:scale-110 duration-700 hover:text-gray-500' size={24} />}
                    {isHidden && <IoMdRefreshCircle onClick={unHide} className='hover:cursor-pointer hover:scale-110 duration-700 hover:text-gray-500' size={24} />}
                </div>
            </div>
        </div>
    )
}

VideoCard.displayName = "VideoCard"

export default VideoCard;
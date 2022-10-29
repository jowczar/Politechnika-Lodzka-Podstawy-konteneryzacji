import { differenceInMinutes, format } from 'date-fns';

const getTimeComment = (date) => {
    const minutes = differenceInMinutes(new Date(), date);

    if (minutes < 1) {
        return 'now';
    }

    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    if (minutes < 24*60) {
        const hours = Math.floor(minutes/60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    if (minutes < 24*60*7) {
        const days = Math.floor(minutes/(60*24));
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    return format(date, 'dd.MM.yyyy'); 
}

export const VideoCard = ({ video: { thumbnail, title, duration, uploadTime, channelName, channelAvatar, isWatched, isHidden }, className }) => {
    return (
        <div className={`bg-white w-fit rounded ${className}`}>
            <div className='relative'>
                <img src={thumbnail} alt="thumbnail" className="rounded-t h-[200px] w-[355px]" />
                <h5 className='absolute rounded bottom-1 right-1 font-bold text-[8px] text-white bg-black py-px px-1'>{duration}</h5>
            </div>
            <div className='flex flex-row px-5 py-4 gap-3'>
                <img src={channelAvatar} alt="channel avatar" className="h-9 w-9 rounded-full" />
                <div className='flex flex-col gap-1'>
                    <h3 className="font-bold text-xs">{title}</h3>
                    <h4 className="text-xs">{channelName}</h4>
                </div>
            </div>
            <div className="flex flex-row h-11 px-5 py-4 bg-grey rounded-b">
                <h5 className="text-xs">{getTimeComment(uploadTime)}</h5>
                <div>Ch</div>
            </div>
        </div>
    )
}

VideoCard.displayName = "VideoCard"

export default VideoCard;
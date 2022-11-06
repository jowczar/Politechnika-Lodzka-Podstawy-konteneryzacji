import Image from "next/image";
import Avatar from "../../components/Avatar/Avatar";
import Button from '../../components/Button';
import VideoCard from "../../components/VideoCard";
import { subMinutes } from "date-fns";
import clsx from 'clsx';

const Channel = ({ isFound, videos, channelAvatar, name, isSubscribed }) => {
    const parsedVideos = JSON.parse(videos);

    const toggleSubscription = () => {
        console.log('TODO: unsubscribe/subscribe to channel 📹');
    } 

    if (!isFound) {
        return (
            <div className='flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <Image 
                    src="/void.svg" 
                    layout='responsive'
                    height={323} 
                    width={309}
                    alt="Not found :("
                    />
                <h1 className="mt-10 font-bold text-3xl">Channel not found</h1>
                <h3 className="mt-1 text-gray-500">Tip: check your spelling!</h3>
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col items-center gap-4 my-24">
                <Avatar link={channelAvatar} className='w-20 h-20' />
                <h1 className="font-bold text-4xl">{name}</h1>
                <Button variant='cta' onClick={toggleSubscription} className={clsx(
                    'font-bold w-48',
                    isSubscribed && "bg-gray-400 hover:bg-gray-500"
                )}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</Button>
            </div>
            <div className="flex w-full flex-wrap gap-8 px-4 pb-10 items-center justify-center">
                {parsedVideos.map(video => (
                    <VideoCard hideInteractions className='shrink-0' video={video} key={"video_" + video.id} />
                ))}
            </div>
        </div>
    );
}

export function getServerSideProps({ params }) {
    const { name } = params;

    //  TODO: ask real API if channel exists & get its data
    if (name === 'i-dont-exist') {
        return {
            props: {
                isFound: false,
                isSubscribed: false,
                videos: [],
                name,
                channelAvatar: null,
            }
        }
    }

    return {
        props: {
            isFound: true,
            isSubscribed: false,
            videos: JSON.stringify([
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 1,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                },
                {
                    id: 2,
                    link: 'https://youtu.be/VaZU37y2T_Q',
                    thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                    title: 'Dlaczego liście tak robią?', 
                    duration: '18:33', 
                    uploadTime: subMinutes(new Date(), 65), 
                    channelName: 'Uwaga! Naukowy bełkot', 
                    channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                    isWatched: false, 
                    isHidden: false 
                }
            ]),
            name,
            channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj'
        }
    }
}

export default Channel;
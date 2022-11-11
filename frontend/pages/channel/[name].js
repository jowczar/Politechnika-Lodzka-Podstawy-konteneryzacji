import Image from "next/image";
import Avatar from "../../components/Avatar/Avatar";
import Button from '../../components/Button';
import VideoCard from "../../components/VideoCard";
import { subMinutes } from "date-fns";
import clsx from 'clsx';
import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { AiOutlineCheck } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { useSpring, animated } from "react-spring";

// TODO: fetch groups from API
// important note: these values (references) should be immutable
const groups = [
    {
        id: 1,
        name: 'Biologia 🌳',
        color: '#19B929',
    },
    {
        id: 2,
        name: 'Kosmos 🚀',
        color: '#4219B9',
    },
    {
        id: 3,
        name: 'Muzyka 🤘',
        color: '#FFBB55',
    },
];

const ChannelNotFound = () => (
    <div className='flex flex-col items-center text-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
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
);

const GroupSelect = () => {
    const [channelGroups, setChannelGroups] = useState([]);

    const updateGroups = (groups) => {
        // TODO: update groups – call API
        setChannelGroups(groups);
    }

    return (
        <div className="w-72 z-20">
            <Listbox value={channelGroups} onChange={updateGroups} multiple>      
                <div className="relative mt-1">
                    <Listbox.Button className="relative border border-gray-300 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className={clsx("block truncate text-xs", channelGroups.length === 0 && "text-gray-500")}>
                            {channelGroups.length === 0 && 'Choose channel groups'}
                            {channelGroups.map((group) => group.name).join(', ')}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {groups.map((group, groupId) => (
                            <Listbox.Option 
                                key={groupId} 
                                value={group} 
                                className={({ active }) =>
                                    `relative group cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-primary-lighter text-white' : 'text-gray-900'
                                }`}>
                                {({ selected }) => (
                                <>
                                    <span
                                    className={`block truncate text-xs ${
                                        selected ? 'font-medium' : 'font-normal'
                                    }`}
                                    >
                                        {group.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-darker group-hover:text-white">
                                            <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                </>
                                )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

const Channel = ({ isFound, videos, channelAvatar, name, isSubscribed }) => {
    const parsedVideos = JSON.parse(videos);
    const [subscribed, setSubscribed] = useState(isSubscribed);
    const springStyle = useSpring({
        opacity: subscribed ? 1 : 0,
        zIndex: 40,
    });

    const toggleSubscription = () => {
        console.log('TODO: unsubscribe/subscribe to channel 📹');
        setSubscribed(!subscribed);
    } 

    if (!isFound) {
        return <ChannelNotFound />
    }

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col items-center gap-4 my-24">
                <Avatar link={channelAvatar} className='w-20 h-20' />
                <h1 className="font-bold text-4xl">{name}</h1>
                <div className="flex flex-col items-center gap-4">
                    <Button variant='cta' onClick={toggleSubscription} className={clsx(
                        "font-bold w-48",
                        subscribed && "!bg-gray-400 hover:!bg-gray-500",
                    )}>{subscribed ? 'Subscribed!' : 'Subscribe'}</Button>
                    <animated.div style={springStyle}>
                        <GroupSelect />
                    </animated.div>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center flex-wrap gap-8 px-10 pb-20">
                {parsedVideos.map(video => (
                    <VideoCard className='shrink-0' video={video} key={"video_" + video.id} />
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
                videos: "[]",
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
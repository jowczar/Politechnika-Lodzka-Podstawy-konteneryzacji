import { useState } from "react";
import { subMinutes } from "date-fns";
import VideoCard from "../components/VideoCard";
import FilterCard from '../components/FilterCard';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BiHide } from 'react-icons/bi';

const Channels = () => {
  // TODO: fetch channels from backend
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'Uwaga! Naukowy bełkot',
      link: 'https://www.youtube.com/c/UwagaNaukowyBe%C5%82kot',
      avatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
      videos: [
        {
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
      ]
    },
    {
      id: 2,
      name: 'Mateusz Socha',
      link: 'https://www.youtube.com/user/Zoohan17',
      avatar: 'https://yt3.ggpht.com/ytc/AMLnZu-ORundEEZh9tQovfx4jRoxmYdR7AxHQ3iK5FQtfw=s88-c-k-c0x00ffffff-no-rj', 
      videos: []
    }
  ]);
  const [filters, setFilters] = useState({
    isWatched: false,
    isHidden: false,
  });
  // TODO: on filters change, filter videos – filter on frontend or send request to backend - it's not yet decided

  return (
    <>
      {/* TODO: optionally add channels management here */}
      <div className="flex flex-row gap-4 w-full px-10 py-4 justify-end">
        <FilterCard text='Show watched' icon={<IoIosCheckmarkCircle size={28} />} isActive={filters.isWatched} onClick={(value) => setFilters({ ...filters, isWatched: value})} />
        <FilterCard text='Show hidden' icon={<BiHide size={24} />} isActive={filters.isHidden} onClick={(value) => setFilters({ ...filters, isHidden: value})} />
      </div>
      {channels.map((channel) => 
        <div key={"channel_" + channel.id} className='mt-4 mb-8'>
          <div className="flex flex-row gap-2 items-center mx-10">
            <a href={channel.link} target="_blank" rel="noreferrer" className="hover:scale-110 duration-700">
              <img className='w-7	h-7 rounded-full' src={channel.avatar} alt={'avatar'} />
            </a>
            <a href={channel.link} target="_blank" rel="noreferrer" className="hover:underline">
              <h2 className="font-bold text-2xl	">
                {channel.name}
              </h2>
            </a>
            {channel.videos.length === 0 && <div className="font-light text-xl text-gray-400"> • you are all caught up ✨</div>}
          </div>
          <div className="flex flex-row gap-8 overflow-auto no-scrollbar py-2.5 px-10">
            {channel.videos.map((video) => <VideoCard className='shrink-0' video={video} key={"video_" + video.id} />)}
          </div>
        </div>
      )}
    </>
  )
}

export default Channels;
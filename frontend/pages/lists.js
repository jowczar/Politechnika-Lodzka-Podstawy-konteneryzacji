import { useState } from "react";
import { subMinutes } from "date-fns";
import VideoCard from "../components/VideoCard";
import { BiLinkExternal } from 'react-icons/bi';

const Lists = () => {
  // TODO: fetch playlists from backend
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Spoko cardio',
      link: 'https://www.youtube.com/playlist?list=RDCLAK5uy_lBNUteBRencHzKelu5iDHwLF6mYqjL-JU&playnext=1&index=1',
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
  ]);
  
  return (
    <div className="mt-14">
      {lists.map((list) => 
        <div key={"list_" + list.id} className='mt-4 mb-8'>
          <div className="flex flex-row gap-2 items-center mx-10">
            <a href={list.link} target="_blank" rel="noreferrer" className="hover:underline flex flex-row items-center">
              <h2 className="font-bold text-2xl	">
                {list.name}
              </h2>
              <BiLinkExternal size={12} className="hover:scale-125 duration-700 ml-1" />
            </a>
            {list.videos.length === 0 && <div className="font-light text-xl text-gray-400"> • no videos</div>}
          </div>
          <div className="flex flex-row gap-8 overflow-auto no-scrollbar py-2.5 px-10">
            {list.videos.map((video) => <VideoCard className='shrink-0' hideInteractions video={video} key={"video_" + video.id} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Lists;
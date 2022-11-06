import { useState } from "react";
import { subMinutes } from "date-fns";
import VideoCard from "../components/VideoCard";
import FilterCard from '../components/FilterCard';
import GroupCard from '../components/GroupCard';
import GroupModal from "../components/GroupModal";
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BiHide } from 'react-icons/bi';
import { MdLabel } from 'react-icons/md';
import clsx from 'clsx';
import { TfiPlus } from 'react-icons/tfi';

const Groups = () => {
  // TODO: fetch groups from backend
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Biologia 🌳',
      color: '#19B929',
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
      ],
      newContent: true,
      lastUpdate: new Date(),
    },
    {
      id: 2,
      name: 'Kosmos 🚀',
      color: '#4219B9',
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
        }
      ],
      newContent: false,
      lastUpdate: subMinutes(new Date(), 20),
    },
    {
      id: 2,
      name: 'Muzyka 🤘',
      color: '#FFBB55',
      videos: [],
      newContent: false,
      lastUpdate: null,
    },
  ]);
  // TODO: on filters change, filter videos – filter on frontend or send request to backend - it's not yet decided
  const [filters, setFilters] = useState({
    isWatched: false,
    isHidden: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editGroup = (id) => { 
    setIsModalOpen(true);
  };

  const deleteGroup = (id, name) => { 
    if (confirm(`Are you sure you want to delete group ${name}?`)) {    
      console.log('TODO: delete group here')
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row gap-4 w-full px-10 py-4 justify-end grow items-center">
          {groups.map((group, i) => 
              <GroupCard 
                  key={"group_card_" + i} 
                  name={group.name} 
                  lastUpdate={group.lastUpdate} 
                  isSelected={false} 
                  onEdit={() => editGroup(group.id)}
                  onDelete={() => deleteGroup(group.id, group.name)}
                  newContent={group.newContent} 
                  className={clsx(
                    'relative',
                    'first:after:absolute first:after:left-[-1.5rem] first:after:border-r first:after:border-dashed first:after:block first:after:w-2 first:after:h-8',
                    'first:after:border-gray-300',
                  )}
              />
          )}
          <div className={clsx(
              "select-none flex flex-row justify-center h-full rounded items-center",
              "text-gray-400 border border-dashed cursor-pointer transition-all duration-150",
              "px-3 py-3 w-[100px]",
              "hover:bg-gray-50 hover:text-gray-500 hover:border-gray-500",
              "relative z-10",
              'last:after:absolute last:after:right-[-1rem] last:after:border-r last:after:border-dashed last:after:block last:after:w-2 last:after:h-8',
              'last:after:border-gray-300',
              )}>
             <h3 className='font-light text-[10px] grow pr-1'>Add new group</h3>
            <TfiPlus size={16} className='flex-none' />
          </div>
        </div>
        <div className="flex flex-row gap-4 w-fit px-10 py-4 justify-end grow-0">
          <FilterCard text='Show watched' icon={<IoIosCheckmarkCircle size={28} />} isActive={filters.isWatched} onClick={(value) => setFilters({ ...filters, isWatched: value})} />
          <FilterCard text='Show hidden' icon={<BiHide size={24} />} isActive={filters.isHidden} onClick={(value) => setFilters({ ...filters, isHidden: value})} />
        </div>
      </div>
      {groups.map((group) => 
        <div key={"group_" + group.id} className='mt-4 mb-8'>
          <div className="flex flex-row gap-2 items-center mx-10">
            <a href={group.link} target="_blank" rel="noreferrer" className="hover:underline flex flex-row gap-1 items-center">
              <h2 className="font-bold text-2xl	">
                {group.name}
              </h2>
              <MdLabel style={{ color: group.color }} className='rotate-180' size={22} />
            </a>
            {group.videos.length === 0 && <div className="font-light text-xl text-gray-400"> • you are all caught up ✨</div>}
          </div>
          <div className="flex flex-row gap-8 overflow-auto no-scrollbar py-2.5 px-10">
            {group.videos.map((video) => <VideoCard className='shrink-0' video={video} key={"video_" + video.id} />)}
          </div>
          <GroupModal isOpen={isModalOpen} setOpen={setIsModalOpen} />
        </div>
      )}
    </>
  )
}

export default Groups;
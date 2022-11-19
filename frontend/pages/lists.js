import { useState, useEffect } from "react";
import { subMinutes } from "date-fns";
import VideoCard from "../components/VideoCard";
import { BiLinkExternal } from 'react-icons/bi';
import Image from "next/image";

const Lists = () => {
  // TODO: fetch playlists from backend
  const [lists, setLists] = useState([]);

  const getLists = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setLists(data);
    }
  }

  useEffect(() => {
    getLists();
  }, []);

  if (lists.length === 0) {
    return (
      <div className='flex text-center flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        <Image
            src="/doggy.svg" 
            layout='responsive'
            height={323} 
            width={309}
            alt="Not found :("
            />
        <h1 className="mt-10 font-bold text-3xl">No lists added</h1>
        <h3 className="mt-1 text-gray-500 text-center leading-tight font-light">Create some lists on <a href="https://www.youtube.com/" className="hover:underline text-yt" target="_blank" rel="noreferrer">YouTube</a> <br/>so we can show them here for you!</h3>
      </div>  
    );
  }
  
  return (
    <div className="mt-14">
      {lists.map((list) => 
        <div key={"list_" + list.id} className='mt-4 mb-8'>
          <div className="flex flex-row gap-2 text-center items-center mx-10">
            <a href={list.link} target="_blank" rel="noreferrer" className="hover:underline flex flex-row items-center">
              <h2 className="font-bold text-2xl	">
                {list.name}
              </h2>
              <BiLinkExternal size={12} className="flex-none hover:scale-125 duration-700 ml-1" />
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
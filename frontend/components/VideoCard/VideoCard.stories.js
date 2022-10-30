import VideoCard from "./VideoCard";
import { subMinutes } from "date-fns";

export default {
  title: "Components/VideoCard",
  component: VideoCard,
};

const Template = (args) => <VideoCard {...args} />;

export const VideoNotWatched = Template.bind({});
VideoNotWatched.args = { 
    video: { 
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
};

export const VideoWatched = Template.bind({});
VideoWatched.args = { 
    video: { 
        link: 'https://youtu.be/VaZU37y2T_Q',
        thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
        title: 'Dlaczego liście tak robią?', 
        duration: '18:33', 
        uploadTime: subMinutes(new Date(), 65), 
        channelName: 'Uwaga! Naukowy bełkot', 
        channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
        isWatched: true, 
        isHidden: false 
    } 
};

export const VideoHidden = Template.bind({});
VideoHidden.args = { 
    video: { 
        link: 'https://youtu.be/VaZU37y2T_Q',
        thumbnail: 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
        title: 'Dlaczego liście tak robią?', 
        duration: '18:33', 
        uploadTime: subMinutes(new Date(), 65), 
        channelName: 'Uwaga! Naukowy bełkot', 
        channelAvatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
        isWatched: false, 
        isHidden: true 
    } 
};
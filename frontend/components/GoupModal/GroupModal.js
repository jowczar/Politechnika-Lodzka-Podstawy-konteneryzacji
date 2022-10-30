import clsx from 'clsx'
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TfiPlus } from 'react-icons/tfi';
import { ChromePicker } from 'react-color';

const Channel = ({ channel: { avatar, name }, onDelete }) => {
    return (
        <div className='flex flex-row px-3 py-4 rounded items-center gap-5 bg-grey'>
            <img className='rounded-full w-6 h-6' src={avatar} alt={'avatar'} />
            <h3 className='font-bold text-xs grow'>{name}</h3>
            <IoMdClose size={16} className='cursor-pointer hover:scale-110' onClick={onDelete} />
        </div>
    );
}

export const GroupModal = ({ setOpen = () => {}}) => {
    // TODO: get actual data from backend API
    const [channels, setChannels] = useState([
        {
            id: 1,
            name: 'Uwaga! Naukowy bełkot',
            avatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj',
        },
        {
            id: 2,
            name: 'Uwaga! Naukowy bełkot',
            avatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj',
        },
        {
            id: 3,
            name: 'Uwaga! Naukowy bełkot',
            avatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj',
        },
        {
            id: 4,
            name: 'Uwaga! Naukowy bełkot',
            avatar: 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj',
        }
    ]);
    const [colors, setColors] = useState([
        '#19B929',
        '#4219B9',
        '#FFBB55',
        '#D92828',
        '#27A3E9',
    ]);
    const [selectedColor, setSelectedColor] = useState('#19B929');
    const [showPicker, setShowPicker] = useState(false);

    const handleShowPicker = () => setShowPicker(!showPicker);

    const deleteChannel = (id) => {
        setChannels(channels.filter(channel => channel.id !== id));
    }

    return (
        <div class="relative z-10" aria-labelledby="modal" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full justify-center text-center items-center">
                    <div class="relative px-8 py-5 text-left transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg flex flex-col gap-8">
                        <h1>Biologia 🌳</h1>

                        <div>
                            <h2 className='font-bold text-base mb-2'>Channels</h2>
                            <div className='flex flex-col gap-1'>
                                {channels.map((channel, i) => <Channel key={"channel_" + i} channel={channel} onDelete={() => deleteChannel(channel.id)} />)}
                                <div className={clsx(
                                    'flex flex-row gap-5 px-3 py-4 rounded items-center text-gray-300 border border-dashed cursor-pointer transition-all duration-150',
                                    'hover:bg-gray-50 hover:text-gray-500 hover:border-gray-500'
                                )}>
                                    <TfiPlus size={16} />
                                    <h3 className='font-bold text-xs'>Add channel</h3>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h2 className='font-bold text-base mb-2'>Color label</h2>
                            <div className='flex flex-row gap-2.5'>
                                {colors.map((color, i) => 
                                    <div 
                                        key={"color_" + i} 
                                        className={clsx(
                                            `w-9 h-9 rounded cursor-pointer bg-[${color}] transition-all duration-300`,
                                            selectedColor == color && 'ring-4 ring-primary'
                                        )} 
                                        onClick={() => setSelectedColor(color)}>
                                    </div>
                                )}
                                <div type="color" className={clsx(
                                    'flex items-center justify-center w-9 h-9 rounded cursor-pointer border border-dashed transition-all duration-150 text-gray-300',
                                    'hover:bg-gray-50 hover:text-gray-500 hover:border-gray-500',
                                )}
                                    onClick={handleShowPicker}
                                >
                                    <TfiPlus size={16} />
                                </div>
                                {showPicker && <ChromePicker color={selectedColor} onChangeComplete={(color) => setSelectedColor(color.hex)} />}
                            </div>
                        </div>

                        <div class="sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Deactivate</button>
                            <button type="button" onClick={() => setOpen(false)} class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

GroupModal.displayName = "GroupModal"

export default GroupModal;
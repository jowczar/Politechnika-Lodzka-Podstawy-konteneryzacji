import clsx from 'clsx'
import { useState, useEffect, useRef, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TfiPlus } from 'react-icons/tfi';
import { MdOutlineDone } from 'react-icons/md';
import { ChromePicker } from 'react-color';
import Button from '../Button';
import listenForOutsideClicks from '../../hooks/OutsideClickHook';
import { Transition } from '@headlessui/react'

const Channel = ({ channel: { avatar, name }, onDelete }) => {
    return (    
        <div className='flex flex-row px-3 py-4 rounded items-center gap-5 bg-grey'>
            <img className='rounded-full w-6 h-6' src={avatar} alt={'avatar'} />
            <h3 className='font-bold text-xs grow'>{name}</h3>
            <IoMdClose size={16} className='cursor-pointer hover:scale-110' onClick={onDelete} />
        </div>
    );
}

export const GroupModal = ({ isOpen = false, setOpen = () => {}}) => {
    // TODO: get actual data from backend API
    const [name, setName] = useState('Biologia 🌳');
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
    const [isLoading, setIsLoading] = useState(false);
    const [pickerListening, setPickerListening] = useState(false);
    const pickerRef = useRef(null);
    const colorRef = useRef(null);
    const allColorsRef = useRef(colors);

    useEffect(() => {
        allColorsRef.current = colors;
    }, [colors]);
    
    const handleShowPicker = (state) => {
        if (!state && colorRef.current && !allColorsRef.current.includes(colorRef.current)) {
            setColors([ ...allColorsRef.current, colorRef.current ]);
        }

        setShowPicker(state);
    }

    const deleteChannel = (id) => {
        setChannels(channels.filter(channel => channel.id !== id));
    }

    // TOOD: backend api request here
    const submit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOpen(false);
        }, 1000);
    }

    useEffect(listenForOutsideClicks(
        pickerListening,
        setPickerListening,
        pickerRef,
        handleShowPicker,
    ));

    return (
        <Transition
            show={isOpen}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="relative z-40" aria-labelledby="modal" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center text-center items-center">
                        <div className="relative px-8 py-5 text-left transform overflow-hidden sm:rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg flex flex-col gap-8">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='font-bold text-4xl leading-relaxed underline decoration-dashed decoration-gray-300 decoration-1 underline-offset-8' />
        
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
                            
                            <div className='relative'>
                                <h2 className='font-bold text-base mb-2'>Color label</h2>
                                <div className='flex flex-row flex-wrap gap-2.5'>
                                    {colors.map((color, i) => 
                                        <div 
                                            key={"color_" + i} 
                                            style={{ background: color }}
                                            className={clsx(
                                                `w-9 h-9 flex-none rounded cursor-pointer transition-all duration-300`,
                                                selectedColor == color && 'ring-4 ring-primary'
                                            )} 
                                            onClick={() => setSelectedColor(color)}>
                                        </div>
                                    )}
                                    <div ref={pickerRef}>
                                        <div  
                                            style={{ background: showPicker ? colorRef.current : 'transparent' }}
                                            className={clsx(
                                                `w-9 h-9 flex items-center justify-center flex-none rounded cursor-pointer transition-none hover:transition-all duration-300`,
                                                showPicker && 'ring-4 ring-primary',
                                                !showPicker && [
                                                    'border border-dashed transition-all duration-150 text-gray-300',
                                                    'hover:bg-gray-50 hover:text-gray-500 hover:border-gray-500',
                                                ]
                                            )}
                                            onClick={() => handleShowPicker(true)}
                                        >
                                            <TfiPlus size={16} className={clsx(
                                                    !showPicker && "opacity-100 block", 
                                                    showPicker && "opacity-0 hidden"
                                                )} />
                                        </div>
                                        <div 
                                            className={clsx(
                                                'absolute bottom-1/2 right-1/2 translate-x-1/2 transition-all duration-300 mt-4',
                                                showPicker && "opacity-100 block", 
                                                !showPicker && "opacity-0 hidden"
                                            )}
                                            >
                                                <ChromePicker disableAlpha color={selectedColor} onChangeComplete={(color) => {
                                                    colorRef.current = color.hex;
                                                    setSelectedColor(color.hex);
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                <Button variant='secondary' onClick={() => setOpen(false)}><IoMdClose size={16} /> Cancel</Button>
                                <Button variant='primary' size='full' isLoading={isLoading} disabled={isLoading} onClick={submit}><MdOutlineDone size={16} /> Save group</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}

GroupModal.displayName = "GroupModal"

export default GroupModal;
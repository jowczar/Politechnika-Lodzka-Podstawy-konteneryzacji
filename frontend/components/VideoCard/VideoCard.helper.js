import { differenceInMinutes } from 'date-fns';

export const getTimeComment = (date) => {
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

    const months = Math.floor(minutes/(60*24*30));
    if (minutes < 4*24*60*7 || months == 0) {
        const weeks = Math.floor(minutes/(60*24*7));
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    if (minutes < 365*24*60) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    const years = Math.floor(minutes/(60*24*365));
    return `${years} year${years > 1 ? 's' : ''} ago`;
}
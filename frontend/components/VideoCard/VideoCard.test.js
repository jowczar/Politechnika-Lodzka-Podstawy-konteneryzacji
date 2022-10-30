import { getTimeComment } from './VideoCard.helper';
import { subMinutes, subHours, subDays, subWeeks, subMonths, subYears } from 'date-fns';

test('should return now if video was uploaded less than 60 seconds ago', () => {
    expect(getTimeComment(new Date())).toBe('now');
});

test('should return 1 minute ago if video was uploaded 1 minute ago', () => {
    expect(getTimeComment(subMinutes(new Date(), 1))).toBe('1 minute ago');
});

test('should return x minutes ago if video was uploaded less than 60 minutes ago', () => {
    expect(getTimeComment(subMinutes(new Date(), 2))).toBe('2 minutes ago');
    expect(getTimeComment(subMinutes(new Date(), 15))).toBe('15 minutes ago');
    expect(getTimeComment(subMinutes(new Date(), 20))).toBe('20 minutes ago');
    expect(getTimeComment(subMinutes(new Date(), 45))).toBe('45 minutes ago');
    expect(getTimeComment(subMinutes(new Date(), 59))).toBe('59 minutes ago');
});

test('should return 1 hour ago if video was uploaded 1 hour ago', () => {
    expect(getTimeComment(subMinutes(new Date(), 60))).toBe('1 hour ago');
});

test('should return x hours ago if video was uploaded less than 24 hours ago', () => {
    expect(getTimeComment(subHours(new Date(), 1))).toBe('1 hour ago');
    expect(getTimeComment(subHours(new Date(), 5))).toBe('5 hours ago');
    expect(getTimeComment(subHours(new Date(), 23))).toBe('23 hours ago');
});

test('should return 1 day ago if video was uploaded 24 hours ago', () => {
    expect(getTimeComment(subHours(new Date(), 24))).toBe('1 day ago');
});

test('should return x days ago if video was uploaded less than 7 days ago', () => {
    expect(getTimeComment(subDays(new Date(), 1))).toBe('1 day ago');
    expect(getTimeComment(subDays(new Date(), 3))).toBe('3 days ago');
    expect(getTimeComment(subDays(new Date(), 6))).toBe('6 days ago');
});

test('should return 1 week ago if video was uploaded 7 days ago', () => {
    expect(getTimeComment(subDays(new Date(), 7))).toBe('1 week ago');
});

test('should return x weeks ago if video was uploaded less than 5 weeks ago', () => {
    expect(getTimeComment(subWeeks(new Date(), 1))).toBe('1 week ago');
    expect(getTimeComment(subWeeks(new Date(), 3))).toBe('3 weeks ago');
});

test('should return 4 weeks ago if video was uploaded 4 weeks ago', () => {
    expect(getTimeComment(subWeeks(new Date(), 4))).toBe('4 weeks ago');
});

test('should return x months ago if video was uploaded less than 365 days ago', () => {
    expect(getTimeComment(subMonths(new Date(), 1))).toBe('1 month ago');
    expect(getTimeComment(subMonths(new Date(), 3))).toBe('3 months ago');
    expect(getTimeComment(subMonths(new Date(), 6))).toBe('6 months ago');
    expect(getTimeComment(subMonths(new Date(), 9))).toBe('9 months ago');
    expect(getTimeComment(subMonths(new Date(), 11))).toBe('11 months ago');
});

test('should return 1 year ago if video was uploaded 12 months ago', () => {
    expect(getTimeComment(subMonths(new Date(), 12))).toBe('1 year ago');
});

test('should return x years ago if video was uploaded more than 365 days ago', () => {
    expect(getTimeComment(subYears(new Date(), 1))).toBe('1 year ago');
    expect(getTimeComment(subYears(new Date(), 3))).toBe('3 years ago');
    expect(getTimeComment(subYears(new Date(), 6))).toBe('6 years ago');
    expect(getTimeComment(subYears(new Date(), 9))).toBe('9 years ago');
    expect(getTimeComment(subYears(new Date(), 11))).toBe('11 years ago');
});
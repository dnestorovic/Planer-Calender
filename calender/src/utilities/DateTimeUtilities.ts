import { Months, WeekDays } from '../models/CalenderModel';

export const getMonthFromNumber = (month: number): Months => {
    return Object.keys(Months)[month] as Months;
};

export const getNextMonthNumber = (currentMonth: number): number => {
    return currentMonth === 11 ? 0 : currentMonth + 1;
};

export const getPreviousMonthNumber = (currentMonth: number): number => {
    return currentMonth === 0 ? 11 : currentMonth - 1;
};

export const getNextDayNumber = (day: number): number => {
    return day === 6 ? 0 : day + 1;
};

export const getPreviousDayNumber = (day: number): number => {
    return day === 0 ? 6 : day - 1;
};

export const getDayFromNumber = (day: number): WeekDays => {
    return Object.keys(WeekDays)[day] as WeekDays;
};

export const getStartingDayOfMonth = (month: number, year: number): number => {
    // add plus 1 to month because I calculate months from 0-11 and Date works with format from 1-12
    // return minus one day to get day in range 0-6 not in range 1-7 as getDay() returns
    return new Date('' + (month + 1) + '/' + 1 + '/' + year).getDay() - 1;
};

export const getEndingDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDay() - 1;
};

export const createDateString = (day: number, month: number, year: number): string => {
    return day + ' . ' + month + ' . ' + year;
};

const DateTimeUtilities = {
    getMonthFromNumber,
    getPreviousMonthNumber,
    getNextMonthNumber,
    getDayFromNumber,
    getNextDayNumber,
    getPreviousDayNumber,
    getStartingDayOfMonth,
    getEndingDayOfMonth,
    createDateString
};

export default DateTimeUtilities;

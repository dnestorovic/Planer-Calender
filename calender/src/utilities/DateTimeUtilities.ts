import {Months} from "../models/CalenderModel";

export const getMonthFromNumber = (month: number): Months => {
    return Object.keys(Months)[month] as Months;
}

export const getPreviousMonth = (currentMonth: number): Months => {
    const month = currentMonth === 0 ? 11 : currentMonth - 1;
    return Object.keys(Months)[month] as Months;
}

export const getNextMonth = (currentMonth: number): Months => {
    const month = currentMonth === 11 ? 0 : currentMonth + 1;
    return Object.keys(Months)[month] as Months;
}

export const getNextMonthNumber = (currentMonth: number): number => {
    return currentMonth === 11 ? 0 : currentMonth + 1;
}

export const getPreviousMonthNumber = (currentMonth: number): number => {
    return currentMonth === 0 ? 11 : currentMonth - 1;
}

const DateTimeUtilities = {
    getMonthFromNumber,
    getPreviousMonth,
    getNextMonth,
    getPreviousMonthNumber,
    getNextMonthNumber
}

export default DateTimeUtilities;

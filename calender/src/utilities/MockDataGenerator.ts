import { Serie } from '@nivo/line';
import { Months } from '../models/CalenderModel';
import { getRandomInt } from './MathsUtility';

export const generateYearsReport = (): Serie[] => {
    const data: { x: any; y: any }[] = [];
    Object.keys(Months).forEach((month) => {
        data.push({
            x: month,
            y: getRandomInt(10, 30)
        });
    });

    return [
        {
            id: 'Tasks',
            color: 'rgb(4, 94, 135)',
            data: data
        }
    ];
};

export const generateMonthData = (month: number) => {
    const data: { x: any; y: any }[] = [];
    let daysArray = [];
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        daysArray = [
            ...Array(31)
                .fill(1, 0, 31)
                .map((el, index) => index)
        ];
    } else if ([4, 6, 9, 11].includes(month)) {
        daysArray = [
            ...Array(30)
                .fill(1, 0, 30)
                .map((el, index) => index)
        ];
    } else {
        daysArray = [
            ...Array(28)
                .fill(1, 0, 28)
                .map((el, index) => index)
        ];
    }

    daysArray.forEach((day) => {
        data.push({
            x: day + 1,
            y: getRandomInt(0, 4)
        });
    });

    return [
        {
            id: 'Tasks',
            color: 'hsl(184, 70%, 50%)',
            data: data
        }
    ];
};

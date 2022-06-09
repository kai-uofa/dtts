import {getDifferentInTime, getDaysFromTime, getConvertedValueFromDays} from './dateTimeCalculator';

function getDifferentDaysBetweenTwoDates(startDate: number, endDate:number, convertUnit: string): object {
    const diffInTime = getDifferentInTime(startDate, endDate);
    const diffInDays = getDaysFromTime(diffInTime);

    const result = {
        days: diffInDays
    }

    const convertedDays = getConvertedValueFromDays(diffInDays, convertUnit);

    return {
        ...result,
        ...convertedDays
    };
}

export { getDifferentDaysBetweenTwoDates };
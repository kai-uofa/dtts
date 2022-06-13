import {getDifferentInTime, getDaysFromTime, getConvertedValueFromDays} from './dateTimeCalculator';

function getDifferentDaysBetweenTwoDates(startDateNum: number, endDateNum: number, convertUnit: string): object {
    const diffInTime = getDifferentInTime(new Date(startDateNum), new Date(endDateNum));
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
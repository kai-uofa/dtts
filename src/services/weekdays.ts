import {getWeekdaysBetweenTwoDates, getConvertedValueFromDays} from './dateTimeCalculator';

function getNumberOfWeekDaysBetweenTwoDates(startDateNum: number, endDateNum: number, convertUnit: string): any {
    const numOfWeekdays = getWeekdaysBetweenTwoDates(startDateNum, endDateNum);

    const result = {
        weekdays: numOfWeekdays
    }

    const convertedDays = getConvertedValueFromDays(numOfWeekdays, convertUnit);

    return {
        ...result,
        ...convertedDays
    };
}

export { getNumberOfWeekDaysBetweenTwoDates };
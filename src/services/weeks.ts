import {getStartSunday, getEndSaturday, getCompleteWeeksFromTime, getDifferentInTime, getConvertedValueFromDays} from './dateTimeCalculator';

function getNumberOfCompleteWeeksBetweenTwoDates(startDateNum: number, endDateNum: number, convertUnit: string): any {
    const startSunday = getStartSunday(startDateNum);
    const endSaturday = getEndSaturday(endDateNum);
    
    const diffInTime = getDifferentInTime(startSunday, endSaturday);
    const completeWeeks = getCompleteWeeksFromTime(diffInTime);

    const result = {
        weeks: completeWeeks
    }

    const convertedDays = getConvertedValueFromDays(completeWeeks * 7, convertUnit);

    return {
        ...result,
        ...convertedDays
    };
}

export { getNumberOfCompleteWeeksBetweenTwoDates };
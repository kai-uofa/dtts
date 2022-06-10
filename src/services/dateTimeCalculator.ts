const SECONDS = "seconds";
const MINUTES = "minutes";
const HOURS = "hours";
const YEARS = "years";

function getDifferentInTime(startTimeNum: number, endTimeNum: number) {
    const startTime: Date = new Date(startTimeNum);
    const endTime: Date = new Date(endTimeNum);

    return endTime.getTime() - startTime.getTime();
}

function getConvertedValueFromDays(dayIn: number, convertUnit: string): object {
    switch (convertUnit) {
        case SECONDS:
            return convertDaysToSeconds(dayIn);
        case MINUTES:
            return convertDaysToMinutes(dayIn);
        case HOURS:
            return convertDaysToHours(dayIn);
        case YEARS:
            return convertDaysToYears(dayIn);
        default:
            return {};
    }
}

function getSecondsFromTime(timeIn: number): number {
    return timeIn / 1000;
}

function getMinutesFromTime(timeIn: number): number {
    return timeIn / (1000 * 60);
}

function getHoursFromTime(timeIn: number): number {
    return timeIn / (1000 * 60 * 60);
}

/* Get days from time. This fuction will round up to 1 day */
function getDaysFromTime(timeIn: number): number {
    return Math.round(timeIn / (1000 * 60 * 60 * 24));
}

function convertDaysToSeconds(dayIn: number): object {
    return {
        seconds: dayIn * 24 * 60 * 60
    }
}

function convertDaysToMinutes(dayIn: number): object {
    return {
        minutes: dayIn * 24 * 60
    };
}

function convertDaysToHours(dayIn: number): object {
    return {
        hours: dayIn * 24
    };
}

function convertDaysToYears(dayIn: number): object {
    const completeYears = Math.floor(dayIn / 365);
    const remainingDays = dayIn % 365;

    const result: {[key: string]: any} = {};
    result.years = completeYears;
    
    if (remainingDays > 0) {
        result.days = remainingDays
    }

    return {
        years: result
    };
}

export { 
    getDifferentInTime,
    getConvertedValueFromDays,
    getSecondsFromTime, 
    getMinutesFromTime, 
    getHoursFromTime, 
    getDaysFromTime,
    convertDaysToSeconds,
    convertDaysToMinutes,
    convertDaysToHours
};
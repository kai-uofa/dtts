import { time } from "console";

const SECONDS = "seconds";
const MINUTES = "minutes";
const HOURS = "hours";
const YEARS = "years";

function getDifferentInTime(startTime: Date, endTime: Date) {
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

// Get complete weeks functions
function getStartSunday(dateInNum: number): Date {
    const startSunday = new Date(dateInNum);

    const dayIn = startSunday.getDay();
    if (dayIn !== 0) {
        startSunday.setDate(startSunday.getDate() + (7 - dayIn));
    }

    startSunday.setHours(0, 0, 0, 0);
    return startSunday;
}

function getEndSaturday(dateInNum: number): Date {
    const endSaturday = new Date(dateInNum);

    const dayIn = endSaturday.getDay();
    if (dayIn !== 6) {
        endSaturday.setDate(endSaturday.getDate() - (dayIn + 1));
    }

    endSaturday.setHours(23, 59, 59, 0);
    return endSaturday;
}

function getCompleteWeeksFromTime(timeIn: number): number {
    const diffInDays = getDaysFromTime(timeIn);

    if (diffInDays < 7) {
        return 0;
    }

    return diffInDays / 7;
}

// Conversion functions
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
    getStartSunday,
    getEndSaturday,
    getCompleteWeeksFromTime,
    convertDaysToSeconds,
    convertDaysToMinutes,
    convertDaysToHours,
    convertDaysToYears
};
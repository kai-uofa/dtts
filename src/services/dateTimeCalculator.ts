function getDifferentTime(startTimeNum: number, endTimeNum: number) {
    const startTime: Date = new Date(startTimeNum);
    const endTime: Date = new Date(endTimeNum);

    return endTime.getTime() - startTime.getTime();
}

function getSecondsFromTime(timeIn: number) : number {
    return Math.floor(timeIn / 1000);
}

function getMinutesFromTime(timeIn: number) : number {
    return Math.floor(timeIn / (1000 * 60));
}

function getHoursFromTime(timeIn: number) : number {
    return Math.floor(timeIn / (1000 * 60 * 60));
}

function getDaysFromTime(timeIn: number) : number {
    return Math.floor(timeIn / (1000 * 60 * 60 * 24));
}
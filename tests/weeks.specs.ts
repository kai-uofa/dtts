import { time } from 'console';
import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../src/app';

const { OK, BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
const expectedError: { [key: string]: any } = {
    bad_request: {
        error: "Bad Request"
    },
    bad_parameter:
    {
        error: "Bad Parameter"
    }
};

function timeToSeconds(timeIn: number) {
    return Math.floor(timeIn / 1000);
}

function timeToMinutes(timeIn: number) {
    return Math.floor(timeIn / (1000 * 60));
}

function timeToHours(timeIn: number) {
    return Math.floor(timeIn / (1000 * 60 * 60));
}

function timeToYears(timeIn: number): object {
    const completeYears = Math.floor(timeIn / (1000 * 60 * 60 * 24 * 365));
    const remainingDays = timeToDays(timeIn) % 365;

    const result: {[key: string]: any} = {};
    result.years = completeYears;
    
    if (remainingDays > 0) {
        result.days = remainingDays
    }

    return result;
}

function timeToDays(timeIn: number): number {
    return Math.round(timeIn / (1000 * 60 * 60 * 24));
}

function getCompleteWeeksBetweenTwoDates(startDate: Date, endDate: Date) : number {
    const diffInDays = timeToDays(getDifferentInTime(startDate, endDate));
    if (diffInDays < 7) {
        return 0;
    }

    return diffInDays / 7;
}

function getNextSun(timeInStr: string) : Date {
    const dateIn = Date.parse(timeInStr);
    const nextSunday = new Date(dateIn);

    console.log(nextSunday.getDay());
    nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));

    return nextSunday;
}

function getLastSat(timeInStr: string) : Date {
    const dateIn = Date.parse(timeInStr);
    const lastSaturday = new Date(dateIn);

    console.log(lastSaturday.getDay());
    lastSaturday.setDate(lastSaturday.getDate() - (lastSaturday.getDay() + 1));

    return lastSaturday;
}

function getDifferentInTime(startDate: Date, endDate: Date) {
    return endDate.getTime() - startDate.getTime();
}

describe("GET /weeks - Test returing the number of complete weeks between 2 dates api endpoint", () => {
    const router: string = "/weeks";

    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct startDate in the past", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = new Date().toISOString();

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request only has correct startDate in the future", async () => {
        const startDateStr = "2030-08-01T00:00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_parameter);
        expect(result.statusCode).toEqual(UNPROCESSABLE_ENTITY);
    });

    it("Request only has incorrect startDate", async () => {
        const startDateStr = "00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct endDate", async () => {
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const result = await request(app).get(router + "?endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct convertUnit", async () => {
        const unitStr = "seconds"

        const result = await request(app).get(router + "?convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has correct startDate & endDate parameters", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has incorrect startDate & correct endDate", async () => {
        const startDateStr = "+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has correct startDate & endDate but startDate is bigger than endDate", async () => {
        const startDateStr = "2030-07-01T00:00:00+07:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_parameter);
        expect(result.statusCode).toEqual(UNPROCESSABLE_ENTITY);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "seconds"

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);
        expected.seconds = timeToSeconds(getDifferentInTime(startSunday, endSaturday));

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "minutes"

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);
        expected.minutes = timeToMinutes(getDifferentInTime(startSunday, endSaturday));

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "hours"

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);
        expected.hours = timeToHours(getDifferentInTime(startSunday, endSaturday));

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "years"

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);
        expected.years = timeToYears(getDifferentInTime(startSunday, endSaturday));

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate but incorrect convertUnit", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "ignore"

        const startSunday = getNextSun(startDateStr);
        const endSaturday = getLastSat(endDateStr);

        const expected: {[key: string]: any} = {};
        expected.weeks = getCompleteWeeksBetweenTwoDates(startSunday, endSaturday);

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });
});
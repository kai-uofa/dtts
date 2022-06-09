import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../app';

const { OK, BAD_REQUEST } = StatusCodes;
var expected: { [key: string]: any } = {
    bad_request: {
        error: "Bad Request"
    },
    bad_parameter:
    {
        error: "Bad Parameter"
    },
    correct_startDate:
    {
        days: -1
    },
    correct_startDate_endDate:
    {
        days: -1
    },
    correct_seconds:
    {
        days: -1,
        seconds: -1
    },
    correct_minutes:
    {
        days: -1,
        minutes: -1
    },
    correct_hours:
    {
        days: -1,
        hours: -1
    },
    correct_years:
    {
        days: -1,
        years: -1
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

function timeToDays(timeIn: number) {
    return Math.floor(timeIn / (1000 * 60 * 60 * 24));
}

function timeToYears(timeIn: number) {
    return Math.floor(timeIn / (1000 * 60 * 60 * 24 * 365));
}

function getDifferentInTime(startTimeStr: string, endTimeStr: string = "") {
    const startTime: Date = new Date(startTimeStr);
    const endTime: Date = new Date(endTimeStr);
    return endTime.getTime() - startTime.getTime();
}

describe("GET /days - Test returing the number of days between 2 dates api endpoint", () => {
    const router: string = "/days";

    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expected.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct startDate in the past", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";

        const diffInTime = getDifferentInTime(startDateStr);
        expected.correct_startDate.days = timeToDays(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_startDate);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request only has correct startDate in the future", async () => {
        const startDateStr = "2030-08-01T00:00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has incorrect startDate", async () => {
        const startDateStr = "00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct endDate", async () => {
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const result = await request(app).get(router + "?endDate=" + endDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct convertUnit", async () => {
        const unitStr = "seconds"

        const result = await request(app).get(router + "?convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has correct startDate & endDate parameters", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const diffInTime = getDifferentInTime(startDateStr, endDateStr);
        expected.correct_startDate_endDate.days = timeToDays(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_startDate_endDate);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has incorrect startDate & correct endDate", async () => {
        const startDateStr = "+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has correct startDate & endDate but startDate is bigger than endDate", async () => {
        const startDateStr = "2030-07-01T00:00:00+07:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr);
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "seconds"

        const diffInTime = getDifferentInTime(startDateStr, endDateStr);
        expected.correct_seconds.days = timeToDays(diffInTime);
        expected.correct_seconds.seconds = timeToSeconds(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_seconds);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "minutes"

        const diffInTime = getDifferentInTime(startDateStr, endDateStr);
        expected.correct_minutes.days = timeToDays(diffInTime);
        expected.correct_minutes.minutes = timeToMinutes(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_minutes);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "hours"

        const diffInTime = getDifferentInTime(startDateStr, endDateStr);
        expected.correct_hours.days = timeToDays(diffInTime);
        expected.correct_hours.hours = timeToHours(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_hours);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "years"

        const diffInTime = getDifferentInTime(startDateStr, endDateStr);
        expected.correct_years.days = timeToDays(diffInTime);
        expected.correct_years.years = timeToYears(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_years);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate but incorrect convertUnit", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "ignore"

        const diffInTime = getDifferentInTime(startDateStr, endDateStr);
        expected.correct_startDate_endDate.days = timeToDays(diffInTime);

        const result = await request(app).get(router + "?startDate=" + startDateStr + "&endDate=" + endDateStr + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected.correct_startDate_endDate);
        expect(result.statusCode).toEqual(OK);
    });
});
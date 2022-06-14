import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../src/app';

const { OK } = StatusCodes;

describe("GET /weekdays - Test returning the number of weekdays between 2 dates api endpoint", () => {
    const router: string = "/weekdays";

    it("Request only has correct startDate in the past", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const startDate = new Date(startDateStr);
        const endDate = new Date();

        // TODO: how to calculate this?
        const expected: {[key: string]: any} = {};
        expected.weekdays = 10;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate parameters", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weekdays = 23;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "seconds"

        const expected: {[key: string]: any} = {};
        expected.weekdays = 23;
        expected.seconds = 23 * 24 * 60 * 60;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "minutes"

        const expected: {[key: string]: any} = {};
        expected.weekdays = 23;
        expected.minutes = 23 * 24 * 60;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "hours"

        const expected: {[key: string]: any} = {};
        expected.weekdays = 23;
        expected.hours = 23 * 24;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "years"

        const expected: {[key: string]: any} = {};
        expected.weekdays = 23;
        expected.years = {
            years: 0,
            days: 23
        };

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate but incorrect convertUnit", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "ignore"

        const expected: {[key: string]: any} = {};
        expected.weekdays = 23;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate on the same weekday", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-06-01T10:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weekdays = 0;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate on weekends of the same week", async () => {
        const startDateStr = "2022-06-04T00:00:00+09:00";
        const endDateStr = "2022-06-05T10:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weekdays = 0;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate on weekends of the different weeks", async () => {
        const startDateStr = "2022-06-04T00:00:00+09:00";
        const endDateStr = "2022-06-12T10:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weekdays = 5;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate on different weekdays of the same week", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-06-03T13:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weekdays = 3;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });
});
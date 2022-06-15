import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../src/app';

const { OK } = StatusCodes;

describe("GET /weeks - Test returning the number of complete weeks between 2 dates api endpoint", () => {
    const router: string = "/weeks";

    it("Request only has correct startDate in the past", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const startDate = new Date(startDateStr);
        const endDate = new Date();

        var counter = 0;
        while(startDate < endDate) {
            if (startDate.getDay() === 0) {
                counter ++;
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        const expected: {[key: string]: any} = {};
        expected.weeks = counter - 1;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate parameters", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weeks = 3;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "seconds"

        const expected: {[key: string]: any} = {};
        expected.weeks = 3;
        expected.seconds = 3 * 7 * 24 * 60 * 60;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "minutes"

        const expected: {[key: string]: any} = {};
        expected.weeks = 3;
        expected.minutes = 3 * 7 * 24 * 60;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "hours"

        const expected: {[key: string]: any} = {};
        expected.weeks = 3;
        expected.hours = 3 * 7 * 24;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "years"

        const expected: {[key: string]: any} = {};
        expected.weeks = 3;
        expected.years = {
            years: 0,
            days: 3 * 7
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
        expected.weeks = 3;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate on Saturday & endDate on Sunday", async () => {
        const startDateStr = "2022-06-04T04:00:00+09:00";
        const endDateStr = "2022-07-03T00:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weeks = 4;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate on Sunday & endDate on Saturday", async () => {
        const startDateStr = "2022-06-05T15:00:00+09:00";
        const endDateStr = "2022-07-02T10:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weeks = 4;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate on Saturday & endDate on Saturday", async () => {
        const startDateStr = "2022-06-04T20:00:00+09:00";
        const endDateStr = "2022-06-11T01:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weeks = 1;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate on Sunday & endDate on Sunday", async () => {
        const startDateStr = "2022-06-05T00:00:00+09:00";
        const endDateStr = "2022-06-19T00:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.weeks = 2;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });
});
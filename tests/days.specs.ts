import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../src/app';

const { OK } = StatusCodes;

describe("GET /days - Test returning the number of days between 2 dates api endpoint", () => {
    const router: string = "/days";

    it("Request only has correct startDate in the past", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const startDate = new Date(startDateStr);
        const endDate = new Date();
        
        // TODO: how to round this?
        const diffInTime = endDate.getTime() - startDate.getTime();
        const numOfDays = diffInTime / (1000 * 60 * 60 * 24);
        const expected: {[key: string]: any} = {};
        expected.days = numOfDays;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate parameters", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";

        const expected: {[key: string]: any} = {};
        expected.days = 30;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B"));
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "seconds"

        const expected: {[key: string]: any} = {};
        expected.days = 30;
        expected.seconds = 30 * 24 * 60 * 60;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "minutes"

        const expected: {[key: string]: any} = {};
        expected.days = 30;
        expected.minutes = 30 * 24 * 60;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "hours"

        const expected: {[key: string]: any} = {};
        expected.days = 30;
        expected.hours = 30 * 24;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-07-01T00:00:00+09:00";
        const unitStr = "years"

        const expected: {[key: string]: any} = {};
        expected.days = 30;
        expected.years = {
            years: 0,
            days: 30
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
        expected.days = 30;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate within one day", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-06-01T12:00:00+09:00";
        const unitStr = "ignore"

        const expected: {[key: string]: any} = {};
        expected.days = 1;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate within twelve hours", async () => {
        const startDateStr = "2022-06-01T00:00:00+09:00";
        const endDateStr = "2022-06-01T11:59:00+09:00";
        const unitStr = "ignore"

        const expected: {[key: string]: any} = {};
        expected.days = 0;

        const result = await request(app).get(router + "?startDate=" + startDateStr.replace("+", "%2B") + "&endDate=" + endDateStr.replace("+", "%2B") + "&convertUnit=" + unitStr);
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });
});
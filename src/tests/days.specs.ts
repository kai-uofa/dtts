import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../app';

const { OK, BAD_REQUEST } = StatusCodes;
const expected: { [key: string]: any } = {
    bad_request: {
        error: "Bad Request"
    },
    bad_parameter:
    {
        error: "Bad Parameter"
    },
    correct_startDate:
    {
        days: "<value>"
    },
    correct_startDate_endDate:
    {
        days: "<value>"
    },
    correct_seconds:
    {
        days: "<value>",
        seconds: "<value>"
    },
    correct_minutes:
    {
        days: "<value>",
        minutes: "<value>"
    },
    correct_hours:
    {
        days: "<value>",
        hours: "<value>"
    },
    correct_years:
    {
        days: "<value>",
        years: "<value>"
    }
};

describe("GET /days - Test returing the number of days between 2 dates api endpoint", () => {
    const router: string = "/days";

    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expected.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct startDate in the past", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.correct_startDate);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request only has correct startDate in the future", async () => {
        const result = await request(app).get(router + "?startDate=2022-07-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has incorrect startDate", async () => {
        const result = await request(app).get(router + "?startDate=00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct endDate", async () => {
        const result = await request(app).get(router + "?endDate=2022-07-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct convertUnit", async () => {
        const result = await request(app).get(router + "convertUnit=seconds");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has correct startDate & endDate parameters", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.correct_startDate_endDate);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has incorrect startDate & correct endDate", async () => {
        const result = await request(app).get(router + "?startDate=+09:00&endDate=2022-07-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=seconds");
        expect(JSON.parse(result.text)).toEqual(expected.correct_seconds);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=minutes");
        expect(JSON.parse(result.text)).toEqual(expected.correct_minutes);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=hours");
        expect(JSON.parse(result.text)).toEqual(expected.correct_hours);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=years");
        expect(JSON.parse(result.text)).toEqual(expected.correct_years);
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate but incorrect convertUnit", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=test");
        expect(JSON.parse(result.text)).toEqual(expected.correct_startDate_endDate);
        expect(result.statusCode).toEqual(OK);
    });
});
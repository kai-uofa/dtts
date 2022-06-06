import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../app';

// this can be converted to import but will generate error TS2339
const expected: {[key: string]: any} = require('./days.specs.json');
const { OK, BAD_REQUEST } = StatusCodes;

describe("GET /days - Test returing the number of days between 2 dates api endpoint", () => {
    const router: string = "/days";

    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expected.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has correct startDate in the past", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00");
        expect(result.statusCode).toEqual(OK);
    });

    it("Request only has correct startDate in the future", async () => {
        const result = await request(app).get(router + "?startDate=2022-07-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request only has incorrect startDate", async () => {
        const result = await request(app).get(router + "?startDate=2022-25-01T00:00:00+09:00");
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
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has incorrect startDate & correct endDate", async () => {
        const result = await request(app).get(router + "?startDate=+09:00&endDate=2022-07-01T00:00:00+09:00");
        expect(JSON.parse(result.text)).toEqual(expected.bad_parameter);
        expect(result.statusCode).toEqual(BAD_REQUEST);
    });

    it("Request has all three correct parameters (convertUnit=seconds)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=seconds");
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=minutes)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=minutes");
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=hours)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=hours");
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has all three correct parameters (convertUnit=years)", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=years");
        expect(result.statusCode).toEqual(OK);
    });

    it("Request has correct startDate & endDate but incorrect convertUnit", async () => {
        const result = await request(app).get(router + "?startDate=2022-06-01T00:00:00+09:00&endDate=2022-07-01T00:00:00+09:00&convertUnit=test");
        expect(result.statusCode).toEqual(OK);
    });
});
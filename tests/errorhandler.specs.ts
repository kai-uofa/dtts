import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../src/app';

const { BAD_REQUEST, UNPROCESSABLE_ENTITY, PERMANENT_REDIRECT } = StatusCodes;
const expectedError: { [key: string]: any } = {
    bad_request: {
        error: "Bad Request"
    },
    bad_parameter:
    {
        error: "Bad Parameter"
    }
};

describe("GET /redirect - Test request not found", () => {
    it("Redirect API Request", async () => {
        const result = await request(app).get("/redirect");
        expect(result.text).toEqual("Permanent Redirect. Redirecting to /");
        expect(result.statusCode).toEqual(PERMANENT_REDIRECT);
    });
});

describe("GET /days - Test days endpoint parameter's validation", () => {
    const router: string = "/days";
    
    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
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
});

describe("GET /weekdays - Test weekdays endpoint parameter's validation", () => {
    const router: string = "/weekdays";
    
    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
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
});

describe("GET /weeks - Test weeks endpoint parameter's validation", () => {
    const router: string = "/weeks";
    
    it("Request does not have any parameter", async () => {
        const result = await request(app).get(router);
        expect(JSON.parse(result.text)).toEqual(expectedError.bad_request);
        expect(result.statusCode).toEqual(BAD_REQUEST);
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
});
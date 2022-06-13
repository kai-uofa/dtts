import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../src/app';

const { OK } = StatusCodes;
const expected: { [key: string]: any } = {
    title: "Welcome to DTTS api",
    description: "A simple DateTime API using TypeScript",
    days_endpoint: "`.../days` returns the number of days between 2 given dates",
    wdays_endpoint: "`.../wdays` which returns the number of weekdays between 2 given dates",
    weeks_endpoint: "`.../weeks` which returns the number of complete weeks between 2 given dates",
    accepted_params: {
        startDate: "Madatory, in standard datetime format (ISO 8601)",
        endDate: "Optional, in standard datetime format (ISO 8601)",
        convertUnit: "Optional, accept only 'seconds', 'minutes', 'hours', or 'years'",
    }
}

describe("GET / - Test a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const result = await request(app).get("/");
        expect(JSON.parse(result.text)).toEqual(expected);
        expect(result.statusCode).toEqual(OK);
    });
});
import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../app';

import expected from './index.specs.json';

const { OK } = StatusCodes;

describe("GET / - Test a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/");
    expect(JSON.parse(result.text)).toEqual(expected);
    expect(result.statusCode).toEqual(OK);
  });
});
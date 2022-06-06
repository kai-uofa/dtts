import StatusCodes from 'http-status-codes';
import request from 'supertest';
import app from '../app';

const { NOT_FOUND } = StatusCodes;

describe("GET /redirect - Test request not found", () => {
  it("404 API Request", async () => {
    const result = await request(app).get("/redirect");
    expect(result.text).toEqual("Not Found. Redirecting to /");
    expect(result.statusCode).toEqual(NOT_FOUND);
  });
});
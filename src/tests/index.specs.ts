import request from 'supertest';
import app from '../app';

import expected from './index.specs.json';

describe("GET /v1 - Test a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/v1");
    expect(JSON.parse(result.text)).toEqual(expected);
    expect(result.statusCode).toEqual(200);
  });
});
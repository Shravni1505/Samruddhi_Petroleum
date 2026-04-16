const request = require("supertest");
const app = require("../src/app");

describe("Health API", () => {
  test("GET /health should return OK", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
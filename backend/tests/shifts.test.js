const request = require("supertest");
const app = require("../src/app");

describe("Shift API", () => {
  test("GET /api/shifts should return 404 (route not implemented)", async () => {
    const res = await request(app).get("/api/shifts");

    expect(res.statusCode).toBe(404);
  });
});
const request = require("supertest");
const app = require("../src/app");

describe("Error Handling", () => {

  test("Invalid route should return 404", async () => {
    const res = await request(app).get("/invalid-route");

    expect(res.statusCode).toBe(404);
  });

});

test("POST /api/auth/login should fail if fields missing", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({});

  expect(res.statusCode).toBe(400);
});
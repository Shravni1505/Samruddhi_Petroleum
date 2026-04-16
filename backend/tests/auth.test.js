const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {

  test("POST /api/auth/login should fail with invalid data", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

});


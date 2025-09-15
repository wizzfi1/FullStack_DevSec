const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  it("should return Hello message", async () => {
    const res = await request(app).get("/");
    expect(res.text).toBe("You are safe in Wizfi's pipeline");
  });
});

const request = require("supertest");
const app = require("../src/app");

describe("App Routes", () => {
  it("should return Hello from Wizfi pipeline!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("You are safe in Wizfi's Pipeline!");
  });

  it("should handle a 404 route", async () => {
    const res = await request(app).get("/not-found");
    expect(res.statusCode).toBe(404);
  });
});

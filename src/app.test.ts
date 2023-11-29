import app from "./app";
import calculateDiscount from "./utils";
import request from "supertest";

describe("App", () => {
  it("should provide correct discount price", () => {
    const result = calculateDiscount(1000, 90);
    expect(result).toBe(900);
  });

  it("should return 200 status code", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

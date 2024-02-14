import request from "supertest";
import { router } from "../routes/routes.js";
import express from "express";
import CryptoJS from "crypto-js";
const app = express();

app.use(express.json());

app.use("/", router);

const mockShortenFunction = jest.fn();

describe("POST /api/shorten", () => {
  it("returns message and status code 200 when given a url", async () => {
    const result = await request(app)
      .post("/api/shorten")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ longUrl: "https://www.example.com" });
    // then: url is shortened then returned with status code 200
    expect(result.status).toBe(200);
    expect(result.text).toBeTruthy();
  });

  it("should be idempotent and return same shortened url and status code 200", async () => {
    const result = await request(app)
      .post("/api/shorten")
      .type("json")
      .send({ longUrl: "https://www.example.com" });

    const intendedIdenticalResult = await request(app)
      .post("/api/shorten")
      .type("json")
      .send({ longUrl: "https://www.example.com" });

    const expectedValue = "e149be135a8b6803951f75776d589aaa";

    expect(result.status).toBe(200);
    expect(intendedIdenticalResult.status).toBe(200);
    expect(result.text).toBe(expectedValue);
    expect(intendedIdenticalResult.text).toBe(expectedValue);
  });
});

describe("/", () => {
  it("should return successful connection to database", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Database succefully connected");
  });
});

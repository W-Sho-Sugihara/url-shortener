import request from "supertest";
import { router } from "../routes/routes";
import express from "express";
const app = express();

app.use(express.json());

app.use("/", router);

describe("POST /api/shorten", () => {
  describe("callback create", () => {
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
      expect(result.status).toBe(200);
      expect(result.text).toBe("e149be135a8b6803951f75776d589aaa");
    });
  });
});

describe("/", () => {
  it("should return successful connection to database", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Database succefully connected");
  });
});

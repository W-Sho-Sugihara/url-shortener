import { db } from "../db.js";
import express from "express";
export const router = express.Router();
import CryptoJS from "crypto-js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// given: an api that takes a url to be shortened
// when: given a url
// then: url is shortened then returned with status code 200
const create = (req, res) => {
  // takes given long url in req body and shortens it.
  // returns shortend url and status 200

  const longUrl = req.body.longUrl;
  const shortedUrl = CryptoJS.MD5(longUrl).toString();
  const message = shortedUrl;
  res.send(message);
};

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`SELECT NOW();`);
    const message = result.rows[0]
      ? "Database succefully connected"
      : "Error connecting database";
    res.send(message);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../frontend/build/index.html"));
});

router.post("/api/shorten", create);

import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  // user: "shoandrie",
  // host: "localhost",
  database: "urlshortener",
  // password: "postgres",
  port: 5432, // PostgreSQL default port
});

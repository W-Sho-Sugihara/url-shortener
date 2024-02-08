import express from "express";
export const app = express();
import { router } from "./routes/routes.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "../frontend/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", router);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

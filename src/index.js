import dotenv from "dotenv";
import express from "express";
import { connectedDB } from "./db/mongoCon.js";

dotenv.config({ path: "../.env" });
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
  connectedDB();
});

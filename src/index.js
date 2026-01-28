import dotenv from "dotenv";
import express from "express";
import { connectedDB } from "./db/mongoCon.js";

dotenv.config({ path: "../.env" });
const app = express();
const port = process.env.PORT || 8000;

app.on("error", (error) => {
  console.log("Error while starting the server", error);
  process.exit(1);
});

connectedDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connectingMongoDB:", error);
  });

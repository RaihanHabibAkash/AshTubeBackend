import dotenv from "dotenv";
import express from "express";
import { connectedDB } from "./db/mongoCon.js";
import cookieParser from "cookie-parser";

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

app.use(express.json({ limit: "20kb" }) );

/* 
To Read Cokkies.
-----summery----
1. cookie-parser = reads cookies
2. Makes cookies available as req.cookies
*/
app.use(cookieParser());


/*
Without express.urlencoded this, req.body will be undefined when a form is submitted.
---summary---
1. express.urlencoded() → parses form data
2. { extended: true } → allows nested objects
3.Makes form data available in req.body
*/
app.use(express.urlencoded({ 
  extended: true, 
  limit: "20kb" 
  })
);
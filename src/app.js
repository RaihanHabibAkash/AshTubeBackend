import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { registerRoutes } from "./routes.js";

const app = express();

/*
------------credentials: true-----------
It tells the browser that this backend allows credentials (cookies, authorization headers, sessions)
to be sent in cross-origin requests. mean port 5000 can send req to port 8000.
*/
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}) );

// For req.body
app.use(express.json({ limit: "20kb" }));

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
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

// All routes.
registerRoutes(app);

export { app };
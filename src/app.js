import express from "express";
import cookieParser from "cookie-parser";

const app = express();

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

export { app };

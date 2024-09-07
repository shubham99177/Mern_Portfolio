import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";

import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import DBconnection from "./Database/DBconnection.js";

const app = express();
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

DBconnection();
export default app;

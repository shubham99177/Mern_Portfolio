import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";

import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import DBconnection from "./Database/DBconnection.js";
import { ErrorMiddleware } from "./Middlewares/error.js";
import messagerouter from "./Routes/message.route.js";
import userrouter from "./Routes/user.route.js";
import timelinerouter from "./Routes/timeline.route.js";
import softwareuseroute from "./Routes/softwareUse.route.js";
import skillroute from "./Routes/skills.route.js";
import projectrouter from "./Routes/project.route.js";

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

app.use("/api/v1/message", messagerouter);
app.use("/api/v1/user", userrouter);
app.use("/api/v1/timeline", timelinerouter);
app.use("/api/v1/software", softwareuseroute);
app.use("/api/v1/skills", skillroute);
app.use("/api/v1/project", projectrouter);

app.get("/", (req, res) => {
  res.send("hello world");
});
DBconnection();

app.use(ErrorMiddleware);
export default app;

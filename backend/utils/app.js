import express from "express";
import userRouter from "../routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user/v1", userRouter);

export default app;

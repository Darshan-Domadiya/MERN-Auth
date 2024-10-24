import express from "express";
import userRouter from "../routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../database/user.db.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

// User routes
app.use("/api/user/v1", userRouter);

export default app;

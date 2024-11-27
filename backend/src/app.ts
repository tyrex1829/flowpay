import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", mainRouter);

export default app;

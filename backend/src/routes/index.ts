import express from "express";
import userRouter from "./userRoutes.js";
import feedRouter from "./feedRoutes.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/videos", feedRouter);

export default router;

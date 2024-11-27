import express from "express";
import userRouter from "./userRoutes.js";
import feedRouter from "./feedRoutes.js";
import channelRouter from "./channelRouter.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/videos", feedRouter);
router.use("/channels", channelRouter);

export default router;

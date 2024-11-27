import express from "express";
import userRouter from "./userRoutes.js";
import channelRouter from "./channelRouter.js";
import videoRouter from "./videoRoutes.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/channels", channelRouter);
router.use("/videos", videoRouter);

export default router;

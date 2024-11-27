import express from "express";
import { createChannel, getChannel } from "../controller/channelController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createChannel);
router.get("/:slug", authMiddleware, getChannel);

export default router;

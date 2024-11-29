import express from "express";
import multer from "multer";
import {
  uploadVideo,
  getVideoDetails,
  updateTimestamp,
  getFeed,
} from "../controller/videoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/feed", getFeed);
router.post("/upload", authMiddleware, upload.single("file"), uploadVideo);
router.post("/:video_id", authMiddleware, getVideoDetails);
router.put("/:video_id/time", authMiddleware, updateTimestamp);

export default router;

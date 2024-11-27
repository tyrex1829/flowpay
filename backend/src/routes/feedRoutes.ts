import express from "express";
import { getFeed } from "../controller/feedController.js";

const router = express.Router();

router.get("/feed", getFeed);

export default router;

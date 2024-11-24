import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  signupUser,
  signinUser,
  updateInfoUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", signinUser);

router.patch("/update-profile", authMiddleware, updateInfoUser);

export default router;

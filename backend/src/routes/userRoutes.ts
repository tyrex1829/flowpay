import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  signupUser,
  signinUser,
  updateInfoUser,
  filteredUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", signinUser);

router.patch("/update-profile", authMiddleware, updateInfoUser);

router.get("/bulk", filteredUser);

export default router;

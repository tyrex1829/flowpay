import express, { Request, Response } from "express";
import env from "dotenv";
env.config();
import cors from "cors";
import mongoose from "mongoose";
import { IUser } from "./types/userTypes.js";
import { UserModel } from "./models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "";
export const JWT_SECRET: any = process.env.JWT_SECRET;

mongoose.connect(MONGO_URL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.error(`Connection error`);
  process.exit(1);
});

connection.on("connected", () => {
  console.error(`Connected to MongoDB`);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the server",
  });
});

app.post(
  "/new-user",
  async (req: Request<{}, {}, IUser>, res: Response): Promise<any> => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(200).json({ message: "User created successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post("/login", async (req, res): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const isUserPresent: any = await UserModel.findOne({ email });

    if (!isUserPresent) {
      return res.status(404).json({
        message: `User not found, please sign-up before login`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: `Invalid credentials`,
      });
    }

    const token = jwt.sign(
      {
        email: isUserPresent.email,
        id: isUserPresent._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: `Login successful`,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: `Can't login right now, please try again`,
    });
  }
});

app.patch("/update-profile", authMiddleware, async (req, res): Promise<any> => {
  const { firstName, lastName, password } = req.body;

  if (!firstName && !lastName && !password) {
    return res.status(400).json({
      message: `At least one field is required to update`,
    });
  }

  try {
    const updateData: {
      firstName?: string;
      lastName?: string;
      password?: string;
    } = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user?.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Can't update info right now, please try again" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

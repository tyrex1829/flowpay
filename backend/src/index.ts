import express from "express";
import env from "dotenv";
env.config();
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/userModel.js";

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "";

mongoose.connect(MONGO_URL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.error(`Connection error`);
});

connection.on("connected", () => {
  console.error(`Connected to MongoDB`);
});

app.use(express.json());
app.use(cors());

app.post("/new-user", async (req, res): Promise<any> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = new UserModel({
      name,
      email,
      password,
    });
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the server",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

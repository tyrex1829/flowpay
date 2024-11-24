import { Request, Response } from "express";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const signupUser = async (req: Request, res: Response): Promise<any> => {
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
};

export const signinUser = async (req: Request, res: Response): Promise<any> => {
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
};

export const updateInfoUser = async (
  req: Request,
  res: Response
): Promise<any> => {
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
};

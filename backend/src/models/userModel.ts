import mongoose, { ObjectId } from "mongoose";
import { IUser } from "../types/userTypes.js";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser & mongoose.Document>(
  "User",
  UserSchema
);

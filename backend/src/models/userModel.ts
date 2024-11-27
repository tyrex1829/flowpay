import mongoose, { ObjectId } from "mongoose";
import { IUser } from "../types/userTypes.js";
import { Account } from "../types/accountTypes.js";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const AccountSchema = new mongoose.Schema<Account>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const UserModel = mongoose.model<IUser & mongoose.Document>(
  "User",
  UserSchema
);

export const AccountModel = mongoose.model("Account", AccountSchema);

import { Document, ObjectId } from "mongoose";

export interface Account extends Document {
  balance: Number;
  userId: ObjectId;
}

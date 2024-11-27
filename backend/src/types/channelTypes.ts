import { Document, ObjectId } from "mongoose";

export interface Channel extends Document {
  name: string;
  description: string;
  slug: string;
  user: ObjectId;
  subscriber_count: number;
}

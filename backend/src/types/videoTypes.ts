import { Document } from "mongoose";

export interface Video extends Document {
  title: string;
  thumbnail_url: string;
  creator: object;
  channel: object;
  view_count: number;
}

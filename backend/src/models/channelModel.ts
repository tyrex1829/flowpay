import mongoose, { ObjectId } from "mongoose";
import { Channel } from "../types/channelTypes.js";

const ChannelSchema = new mongoose.Schema<Channel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscriber_count: { type: Number, default: 0, required: true },
});

export const ChannelModel = mongoose.model<Channel & mongoose.Document>(
  "channel",
  ChannelSchema
);

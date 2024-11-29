import mongoose, { ObjectId } from "mongoose";
import { Video } from "../types/videoTypes.js";

const VideoSchema = new mongoose.Schema<Video>(
  {
    title: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    creator: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      username: { type: String, required: true },
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
      required: true,
    },
    view_count: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

export const VideoModel = mongoose.model<Video & mongoose.Document>(
  "Video",
  VideoSchema
);

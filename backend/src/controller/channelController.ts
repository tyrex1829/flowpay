import { Request, Response } from "express";
import { ChannelModel } from "../models/channelModel.js";
import { VideoModel } from "../models/videoModel.js";

export const createChannel = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description, slug } = req.body;
  const userId = req.user?.id;

  if (!name || !description || !slug || !userId) {
    return res.status(400).json({ message: "Validation errors" });
  }

  try {
    const existingChannel = await ChannelModel.findOne({ user: userId });

    if (existingChannel) {
      return res.status(411).json({ message: "User already has a channel" });
    }

    const existingChannelSlug = await ChannelModel.findOne({ slug });

    if (existingChannelSlug) {
      return res.status(409).json({ message: "slug already exists" });
    }
    const newChannel = new ChannelModel({
      name,
      description,
      slug,
      user: userId,
    });

    await newChannel.save();

    res.status(201).json({ message: "Channel successfully created" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getChannel = async (req: Request, res: Response): Promise<any> => {
  const { slug } = req.params;

  try {
    if (!slug) {
      return res.status(400).json({ message: "Validation errors" });
    }

    const foundChannel = await ChannelModel.findOne({ slug });

    if (!foundChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const videos = await VideoModel.find(
      { channel: foundChannel._id },
      { id: 1, title: 1, thumbnail_url: 1 }
    );

    res.status(200).json({
      id: foundChannel._id,
      name: foundChannel.name,
      description: foundChannel.description,
      subscriber_count: foundChannel.subscriber_count || 0,
      videos,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

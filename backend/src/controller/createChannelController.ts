import { Request, Response } from "express";
import { ChannelModel } from "../models/channelModel.js";

export const createChannel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, description, slug } = req.body;
    const userId = req.user?.id;

    if (!name || !description || !slug || !userId) {
      return res.status(400).json({ message: "Validation errors" });
    }

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

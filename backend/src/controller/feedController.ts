import { Request, Response } from "express";
import { VideoModel } from "../models/videoModel.js";

export const getFeed = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page = 1, limit = 20, category } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const query: any = {};
    if (category) {
      query.category = category;
    }

    const totalVideos = await VideoModel.countDocuments(query);

    const totalPages = Math.ceil(totalVideos / limitNum);

    const videos = await VideoModel.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ created_at: -1 })
      .select("id title thumbnail_url creator view_count created_at");

    res.status(200).json({
      videos,
      total_pages: totalPages,
      current_page: pageNum,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

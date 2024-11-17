import { Request, Response } from "express";
import * as blogService from "../services/PostService";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await blogService.listPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve posts", error });
  }
};

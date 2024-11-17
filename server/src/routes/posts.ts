// src/routes/postRoutes.ts

import { Router } from "express";
import { getAllPosts } from "../controllers/PostController";

const router = Router();

router.get("/", getAllPosts);

export default router;

import { Router } from "express";
import { ContentService } from "../services/contentServices";

const router = Router();
const postsService = new ContentService("posts");

router.get("/", async (req, res) => {
  try {
    const posts = await postsService.getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const post = await postsService.getOne(req.params.slug);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { frontmatter, content } = req.body;
    const post = await postsService.create(frontmatter, content);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

router.put("/:slug", async (req, res) => {
  try {
    const { frontmatter, content } = req.body;
    const post = await postsService.update(
      req.params.slug,
      frontmatter,
      content
    );
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "Failed to update post" });
  }
});

router.delete("/:slug", async (req, res) => {
  try {
    await postsService.delete(req.params.slug);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete post" });
  }
});

export { router as postsRouter };

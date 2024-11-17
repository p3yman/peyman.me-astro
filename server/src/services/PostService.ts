// src/services/blogService.ts

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { PostFrontmatter } from "../models/Post";

const BLOG_DIR = path.join(__dirname, "../../../website/src/content/blog");

export async function listPosts(): Promise<PostFrontmatter[]> {
  const files = await fs.readdir(BLOG_DIR, { recursive: true });
  const posts: PostFrontmatter[] = [];

  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data } = matter(fileContent);

      posts.push(data as PostFrontmatter);
    }
  }

  return posts;
}

export async function createPost(
  frontmatter: PostFrontmatter,
  content: string
): Promise<void> {
  const slug = frontmatter.title.toLowerCase().replace(/ /g, "-");
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const newContent = matter.stringify(content, frontmatter);
  await fs.writeFile(filePath, newContent, "utf-8");
}

export async function updatePost(
  existingSlug: string,
  newFrontmatter: PostFrontmatter,
  newContent: string
): Promise<void> {
  const oldFilePath = path.join(BLOG_DIR, `${existingSlug}.md`);
  if (newFrontmatter.title.toLowerCase().replace(/ /g, "-") !== existingSlug) {
    // Rename if the title/slug has changed
    const newSlug = newFrontmatter.title.toLowerCase().replace(/ /g, "-");
    const newFilePath = path.join(BLOG_DIR, `${newSlug}.md`);
    await fs.rename(oldFilePath, newFilePath);
  }

  const updatedContent = matter.stringify(newContent, newFrontmatter);
  await fs.writeFile(oldFilePath, updatedContent, "utf-8");
}

export async function deletePost(slug: string): Promise<void> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  await fs.unlink(filePath);
}

export async function getTags(): Promise<string[]> {
  // Example of returning managed tags (you could extend this with persistence)
  return ["tips", "tricks", "terminal", "cli", "Dev", "Tips"];
}

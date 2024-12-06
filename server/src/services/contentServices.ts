import fs from "fs/promises";
import fg from "fast-glob";
import path from "path";
import matter from "gray-matter";
import { ContentItem, Frontmatter } from "../types";

export class ContentService {
  private contentDir: string;

  constructor(type: "posts" | "pages") {
    this.contentDir = path.join(
      process.cwd(),
      "../website/src/content",
      "blog"
    );
  }

  async initialize(): Promise<void> {
    try {
      await fs.access(this.contentDir);
    } catch {
      await fs.mkdir(this.contentDir, { recursive: true });
    }
  }

  async getAll(): Promise<ContentItem[]> {
    const files = await fg(`../website/src/content/**/*.md`, {
      onlyFiles: true,
      absolute: false,
    });
    const items = await Promise.all(
      files.map(async (file) => {
        const content = await this.getOne(file);
        return content;
      })
    );
    return items;
  }

  async getOne(filePath: string): Promise<ContentItem> {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const relativePath = path.relative("../website/src/content", filePath);

    return {
      frontmatter: data as Frontmatter,
      content,
      path: relativePath,
    };
  }

  async create(
    frontmatter: Frontmatter,
    content: string
  ): Promise<ContentItem> {
    const fileName = `${frontmatter.slug}.md`;
    const filePath = path.join(this.contentDir, fileName);

    const fileContent = matter.stringify(content, frontmatter);
    await fs.writeFile(filePath, fileContent);

    return this.getOne(frontmatter.slug);
  }

  async update(
    slug: string,
    frontmatter: Frontmatter,
    content: string
  ): Promise<ContentItem> {
    const filePath = path.join(this.contentDir, `${slug}.md`);
    const fileContent = matter.stringify(content, frontmatter);
    await fs.writeFile(filePath, fileContent);

    return this.getOne(slug);
  }

  async delete(slug: string): Promise<void> {
    const filePath = path.join(this.contentDir, `${slug}.md`);
    await fs.unlink(filePath);
  }
}

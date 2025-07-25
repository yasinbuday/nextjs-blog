import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing title or content" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const date = new Date().toISOString();

    const frontMatter = `---
title: ${title}
date: ${date}
---
`;

    const markdown = frontMatter + "\n" + content;
    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

    try {
      fs.writeFileSync(filePath, markdown, "utf8");
      return res.status(201).json({ message: "Post created", slug });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create post" });
    }
  }

  res.status(405).end();
}

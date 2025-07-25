import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  const { id } = req.query;

  const filePath = path.join(process.cwd(), "posts", `${id}.md`);

  if (req.method === "DELETE") {
    try {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete post" });
    }
  }

  if (req.method === "PUT") {
    const { title, content, date } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing title or content" });
    }

    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const parsed = matter(fileContents);
      const preservedDate =
        date || parsed.data.date || new Date().toISOString();

      const newFrontMatter = `---
title: ${title}
date: ${preservedDate}
---
`;

      const newMarkdown = newFrontMatter + "\n" + content;

      fs.writeFileSync(filePath, newMarkdown, "utf8");

      return res.status(200).json({ message: "Post updated" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to write post" });
    }
  }

  res.status(405).end();
}

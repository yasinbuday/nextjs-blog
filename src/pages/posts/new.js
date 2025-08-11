import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/layout";
import styles from "./new.module.scss";
import Cookies from "js-cookie";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const admin = Cookies.get("isAdmin") === "true";
    setIsAdmin(admin);
    if (!admin) {
      router.push("/");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <Layout>
      <div className={styles.newPostContainer}>
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            rows={10}
            placeholder="Write your markdown content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </Layout>
  );
}

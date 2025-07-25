import Layout from "@/components/Layout/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPostData } from "@/lib/posts";
import styles from "./edit-post.module.scss";

export default function EditPost({ postData }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(postData.title || "");
  const [content, setContent] = useState(postData.content || "");
  const [date, setDate] = useState(postData.date || "");

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${postData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, date }),
    });

    if (res.ok) {
      router.push(`/posts/${postData.id}`);
    } else {
      alert("Error saving post");
    }
  };

  if (!isAdmin)
    return (
      <Layout>
        <p>You are not authorized to edit posts.</p>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.editPostContainer}>
        <h1>Edit Post</h1>
        <form className={styles.editForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
}

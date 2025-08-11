import Layout from "@/components/Layout/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPostData } from "@/lib/posts";
import styles from "./edit-post.module.scss";
import Cookies from "js-cookie";
import { Editor } from "primereact/editor";

export default function EditPost({ postData }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(postData.title || "");
  const [content, setContent] = useState(postData.content || "");
  const [date, setDate] = useState(postData.date || "");

  useEffect(() => {
    const admin = Cookies.get("isAdmin") === "true";
    setIsAdmin(admin);
    setAuthChecked(true);
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

  if (!authChecked) return null; // Wait for auth check

  if (!isAdmin)
    return (
      <Layout>
        <p>You are not authorized to edit posts.</p>
      </Layout>
    );

  return (
    <div className={styles.editPostContainer}>
      <h1>Edit Post</h1>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Editor
          value={content}
          onTextChange={(e) => setContent(e.htmlValue)}
          style={{ height: "320px" }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
}

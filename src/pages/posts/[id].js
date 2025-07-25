import Layout from "@/components/Layout/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "@/components/date";
import utilStyles from "@/styles/utils/utils.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Post({ postData }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleDelete = async () => {
  if (confirm("Delete this post permanently?")) {
    try {
      const res = await fetch(`/api/posts/${postData.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete post.");
      }
    } catch (err) {
      alert("Server error while deleting.");
    }
  }
};

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        {isAdmin && (
          <div className={utilStyles.adminControls}>
            <Link
              href={`/posts/edit/${postData.id}`}
              className={utilStyles.adminButton}
            >
              ✏️ Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className={utilStyles.deleteButton}
            >
              🗑️ Delete Post
            </button>
          </div>
        )}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

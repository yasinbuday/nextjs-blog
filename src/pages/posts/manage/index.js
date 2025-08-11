import Head from "next/head";
import { getSortedPostsData } from "@/lib/posts";
import Layout, { siteTitle } from "@/components/Layout/layout";
import utilStyles from "@/styles/utils/utils.module.scss";
import Link from "next/link";
import Date from "@/components/date";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Manage({ allPostsData }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = Cookies.get("isAdmin") === "true";
    setIsAdmin(adminStatus);
    if (!adminStatus) {
      router.replace("/auth/login");
    }
  }, [router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Manage - {siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Manage Posts</h2>
        <div>
          <Link href="/posts/new" className={utilStyles.adminButton}>
            + New Post
          </Link>
        </div>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`} className={utilStyles.listItemLink}>
                <div>
                  <strong>{title}</strong>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

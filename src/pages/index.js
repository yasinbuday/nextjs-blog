import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Layout, { siteTitle } from "../components/Layout/layout";
import utilStyles from "../styles/utils/utils.module.scss";
import Link from "next/link";
import Date from "@/components/date";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(Cookies.get("isAdmin") === "true");
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m Yasin Kerem Budayoğlu, a frontend development intern. You
          can reach me via{" "}
          <a href="mailto:yasinkerembudayoglu@gmail.com">email</a>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        {isAdmin && (
          <div>
            <Link href="/posts/new" className={utilStyles.adminButton}>
              + New Post
            </Link>
          </div>
        )}
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

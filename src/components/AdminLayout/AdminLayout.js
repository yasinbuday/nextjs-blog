import Head from "next/head";
import Link from "next/link";
import styles from "./adminLayout.module.scss";
import Header from "../Header/header";

export default function AdminLayout({ children, pageTitle }) {
  return (
    <>
      <Header />
      <div className={styles.adminContainer}>
        <Head>
          <title>{`${pageTitle} | Admin Panel`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <aside className={styles.sidebar}>
          <nav>
            <h2>Admin</h2>
            <Link href="/admin">Dashboard</Link>
            <Link href="/">Posts</Link>
          </nav>
        </aside>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </>
  );
}

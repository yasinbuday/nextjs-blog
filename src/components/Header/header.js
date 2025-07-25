import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/auth/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {isAdmin ? (
          <Link href="/admin" className={styles.title}>
            Dashboard
          </Link>
        ) : (
          <div className={styles.title}></div>
        )}
        <nav>
          {isAdmin ? (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className={styles.link}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

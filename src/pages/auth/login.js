import Layout from "@/components/Layout/layout";
import { useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
      
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Layout>
      <div className={styles.loginContainer}>
        <h1>Admin Login</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button 
          className={styles.loginButton} 
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Login
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </Layout>
  );
}
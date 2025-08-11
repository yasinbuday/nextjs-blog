import Layout from "@/components/Layout/layout";
import { useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("isAdmin", "true", {
          expires: 1,
          sameSite: "Strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        <button
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={!email || !password || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </Layout>
  );
}

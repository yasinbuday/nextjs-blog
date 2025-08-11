import AdminLayout from "@/components/AdminLayout/AdminLayout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const admin = Cookies.get("isAdmin") === "true";
    setIsAdmin(admin);

    if (!admin) {
      router.push("/auth/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) return null;

  return (
    <AdminLayout pageTitle="Dashboard">
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the admin panel. Here you can manage your posts, settings,
        and more.
      </p>
      <ul>
        <li>
          <Link href="/posts/new">Create New Post</Link>
        </li>
        <li>
          <Link href="/">Manage Posts</Link>
        </li>
      </ul>
      <p>Use the links on the left to navigate through the admin panel.</p>
      <p>Happy managing!</p>
    </AdminLayout>
  );
};

export default AdminDashboard;

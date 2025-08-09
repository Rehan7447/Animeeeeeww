"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfileClient() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } = { session: null } } =
        await supabase.auth.getSession();
      if (session && session.user) {
        setUser({ id: session.user.id, email: session.user.email ?? "" });
      } else {
        router.replace("/auth");
      }
      setLoading(false);
    }
    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div>Email: {user.email}</div>
      <div>User ID: {user.id}</div>
    </div>
  );
}

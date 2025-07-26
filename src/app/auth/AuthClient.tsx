"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";

export default function AuthClient() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sign In / Sign Up</h1>
      <AuthForm />
    </div>
  );
}

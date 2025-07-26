// Example: Auth page (pages/auth/index.tsx)
import dynamic from "next/dynamic";
import AuthClient from "./AuthClient";

export default function AuthPage() {
  return (
    <main className="container mx-auto p-4 max-w-md">
      <AuthClient />
    </main>
  );
}

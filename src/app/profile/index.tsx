import dynamic from "next/dynamic";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <main className="container mx-auto p-4">
      <ProfileClient />
    </main>
  );
}

// Example: Dashboard page (pages/dashboard/index.tsx)
import dynamic from "next/dynamic";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-4">
      <DashboardClient />
    </main>
  );
}

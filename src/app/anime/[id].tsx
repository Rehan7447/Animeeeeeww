import dynamic from "next/dynamic";

const AnimeDetailsClient = dynamic(() => import("./AnimeDetailsClient"), { ssr: false });

export default function AnimeDetailsPage() {
  return (
    <main className="container mx-auto p-4">
      <AnimeDetailsClient />
    </main>
  );
}

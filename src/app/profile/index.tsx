// Example: Profile page (pages/profile/index.tsx)
import React from 'react';
import Layout from '../../components/Layout';

export default function ProfilePage() {
  // TODO: Fetch and display user profile info
  return (
    <Layout>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div>User profile info will be shown here.</div>
      </main>
    </Layout>
  );
}

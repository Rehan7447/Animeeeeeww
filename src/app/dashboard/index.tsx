// Example: Dashboard page (pages/dashboard/index.tsx)
import React from 'react';
import Dashboard from '../../components/Dashboard';
import Layout from '../../components/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <main className="container mx-auto p-4">
        <Dashboard />
      </main>
    </Layout>
  );
}

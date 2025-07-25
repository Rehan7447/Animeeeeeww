// Example: Auth page (pages/auth/index.tsx)
import React from 'react';
import AuthForm from '../../components/AuthForm';
import Layout from '../../components/Layout';

export default function AuthPage() {
  return (
    <Layout>
      <main className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign In / Sign Up</h1>
        <AuthForm />
      </main>
    </Layout>
  );
}

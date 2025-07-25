// Example: AuthForm component
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabase';

const AuthForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Redirect to dashboard on successful login
        router.replace('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Redirect to dashboard on successful signup
        router.replace('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
    setLoading(false);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
      <div className="text-center">
        <button
          type="button"
          className="link"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        >
          {mode === 'login' ? 'No account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;

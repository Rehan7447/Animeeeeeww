import { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Parse hash params from URL
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      if (access_token && refresh_token) {
        // Set session in Supabase
        supabase.auth.setSession({ access_token, refresh_token });
        // Clean the URL and redirect to dashboard
        router.replace('/dashboard');
      }
    }
  }, [router]);

  return <div>Signing you in...</div>;
}

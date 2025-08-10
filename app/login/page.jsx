'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/chart-of-accounts');
    });
  }, [router]);

  const signIn = async (e) => {
    e.preventDefault();
    setMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else router.push('/chart-of-accounts');
  };

  return (
    <main style={{ padding: 24, display: 'grid', gap: 12, maxWidth: 360 }}>
      <h1>Sign in</h1>
      <form onSubmit={signIn} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type="submit">Sign in</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}

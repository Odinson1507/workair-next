'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Customers() {
  const company = 'KTVL';
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', country:'AE', payment_terms:'Net 30' });

  const load = async () => {
    const { data } = await supabase
      .from('customers')
      .select('id, name, email, country, payment_terms')
      .eq('company_slug', company)
      .order('name');
    setRows(data || []);
  };

  const add = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('customers').insert([{ company_slug: company, ...form }]);
    if (error) return alert(error.message);
    setForm({ name:'', email:'', country:'AE', payment_terms:'Net 30' });
    load();
  };

  useEffect(() => { supabase.auth.getSession().then(({ data }) => data.session ? load() : (window.location.href='/login')); }, []);

  return (
    <main style={{ padding:24, display:'grid', gap:16 }}>
      <h1>Customers</h1>
      <form onSubmit={add} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, maxWidth:1000 }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} required/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })}/>
        <input placeholder="Country" value={form.country} onChange={e=>setForm({ ...form, country:e.target.value })}/>
        <input placeholder="Terms" value={form.payment_terms} onChange={e=>setForm({ ...form, payment_terms:e.target.value })}/>
        <button style={{ gridColumn:'span 4' }} type="submit">Add Customer</button>
      </form>
      <table border="1" cellPadding="6" style={{ maxWidth:1000 }}>
        <thead><tr><th>Name</th><th>Email</th><th>Country</th><th>Terms</th></tr></thead>
        <tbody>{rows.map(r=>(<tr key={r.id}><td>{r.name}</td><td>{r.email||'-'}</td><td>{r.country||'-'}</td><td>{r.payment_terms||'-'}</td></tr>))}</tbody>
      </table>
    </main>
  );
}

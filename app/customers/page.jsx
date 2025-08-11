// app/customers/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Customers() {
  const company = 'KTVL';
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', country:'AE', payment_terms:'Net 30' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('id, name, email, country, payment_terms')
      .eq('company_slug', company)
      .order('name');
    if (!error) setRows(data || []);
  };

  const add = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('customers').insert([{ company_slug: company, ...form }]);
    setLoading(false);
    if (error) return alert(error.message);
    setForm({ name:'', email:'', country:'AE', payment_terms:'Net 30' });
    load();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login';
      else load();
    });
  }, []);

  return (
    <>
      <div className="toolbar">
        <div className="h1">Customers</div>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 14 }}>
        <input className="input" placeholder="Name"
               value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} />
        <input className="input" placeholder="Email"
               value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })} />
        <input className="input" placeholder="Country"
               value={form.country} onChange={e=>setForm({ ...form, country:e.target.value })} />
        <input className="input" placeholder="Terms"
               value={form.payment_terms} onChange={e=>setForm({ ...form, payment_terms:e.target.value })} />
      </div>

      <div className="actions" style={{ marginBottom: 18 }}>
        <button className="btn primary" onClick={add} disabled={loading}>
          {loading ? 'Saving…' : 'Add Customer'}
        </button>
      </div>

      <table className="table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Country</th><th>Terms</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td className="subtle">{r.email || '—'}</td>
              <td>{r.country || '—'}</td>
              <td>{r.payment_terms || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

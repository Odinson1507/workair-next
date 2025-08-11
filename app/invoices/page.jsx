'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Invoices() {
  const company = 'KTVL';
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_id: '',
    issue_date: new Date().toISOString().slice(0,10),
    total_amount: '',
    vat_amount: '',
    status: 'sent'
  });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const [{ data: inv }, { data: cust }] = await Promise.all([
      supabase.from('invoices')
        .select('id, issue_date, due_date, total_amount, vat_amount, status, customer_id')
        .eq('company_slug', company)
        .order('issue_date', { ascending: false }),
      supabase.from('customers')
        .select('id, name')
        .eq('company_slug', company)
        .order('name')
    ]);
    setInvoices(inv || []);
    setCustomers(cust || []);
  };

  const add = async (e) => {
    e.preventDefault();
    if (!form.customer_id) return alert('Pick a customer');
    setLoading(true);
    const { error } = await supabase.from('invoices').insert([{
      company_slug: company,
      customer_id: form.customer_id,
      issue_date: form.issue_date,
      total_amount: Number(form.total_amount || 0),
      vat_amount: Number(form.vat_amount || 0),
      status: form.status
    }]);
    setLoading(false);
    if (error) return alert(error.message);
    setForm({ ...form, total_amount: '', vat_amount: '' });
    load();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login';
      else load();
    });
  }, []);

  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Invoices</h1>

      <form onSubmit={add} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', gap:8, alignItems:'center', maxWidth:1000 }}>
        <select value={form.customer_id} onChange={e=>setForm({ ...form, customer_id: e.target.value })}>
          <option value="">Select customer…</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="date" value={form.issue_date} onChange={e=>setForm({ ...form, issue_date:e.target.value })}/>
        <input placeholder="Total" type="number" step="0.01" value={form.total_amount}
               onChange={e=>setForm({ ...form, total_amount:e.target.value })}/>
        <input placeholder="VAT" type="number" step="0.01" value={form.vat_amount}
               onChange={e=>setForm({ ...form, vat_amount:e.target.value })}/>
        <select value={form.status} onChange={e=>setForm({ ...form, status: e.target.value })}>
          <option value="draft">draft</option>
          <option value="sent">sent</option>
          <option value="paid">paid</option>
          <option value="overdue">overdue</option>
        </select>
        <button style={{ gridColumn:'span 5' }} disabled={loading} type="submit">
          {loading ? 'Saving…' : 'Create invoice'}
        </button>
      </form>

      <table border="1" cellPadding="6" style={{ maxWidth: 1000 }}>
        <thead>
          <tr>
            <th>Issue Date</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>VAT</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => {
            const cust = customers.find(c => c.id === inv.customer_id);
            return (
              <tr key={inv.id}>
                <td>{inv.issue_date}</td>
                <td>{cust ? cust.name : '—'}</td>
                <td>{inv.status}</td>
                <td>{Number(inv.total_amount).toFixed(2)}</td>
                <td>{Number(inv.vat_amount).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const StatusChip = ({ value }) => {
  const v = (value || '').toLowerCase();
  const cls =
    v === 'sent' ? 'chip success' :
    v === 'draft' ? 'chip info' :
    v === 'overdue' ? 'chip warn' :
    'chip';
  return <span className={cls}>{value || '-'}</span>;
};

export default function Invoices() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters (adapt to your own filter state names as needed)
  const [customerId, setCustomerId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [status, setStatus] = useState('sent');
  const [vat, setVat] = useState('');
  const [total, setTotal] = useState('');

  const company = 'KTVL'; // or take from session/context

  async function load() {
    setLoading(true);
    let q = supabase
      .from('invoices')
      .select('id, issue_date, customer_id, total_amount, vat_amount, status')
      .eq('company_slug', company)
      .order('issue_date', { ascending: false });

    if (customerId) q = q.eq('customer_id', customerId);
    if (issueDate) q = q.eq('issue_date', issueDate);
    if (status) q = q.eq('status', status);
    if (vat) q = q.gte('vat_amount', 0);          // example, tweak as you like
    if (total) q = q.gte('total_amount', Number(total) || 0);

    const { data, error } = await q;
    setLoading(false);
    if (!error) setRows(data || []);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login';
      else load();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createInvoice() {
    // keep your existing creation logic — this is just a stub
    // After create, reload:
    await load();
  }

  return (
    <>
      <div className="toolbar">
        <div className="h1">Invoices</div>
        <div className="actions">
          <button className="btn primary" onClick={createInvoice}>
            Create invoice
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="panel pad" style={{ marginBottom: 16 }}>
        <div className="grid cols-5">
          <select className="select" value={customerId} onChange={e=>setCustomerId(e.target.value)}>
            <option value="">Select customer…</option>
            {/* Render your real customers here */}
            {/* <option value={c.id}>{c.name}</option> */}
          </select>
          <input className="input" type="date" value={issueDate} onChange={e=>setIssueDate(e.target.value)} />
          <input className="input" placeholder="Total ≥" value={total} onChange={e=>setTotal(e.target.value)} />
          <input className="input" placeholder="VAT filter" value={vat} onChange={e=>setVat(e.target.value)} />
          <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">Any status</option>
            <option value="draft">draft</option>
            <option value="sent">sent</option>
            <option value="overdue">overdue</option>
          </select>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={load} disabled={loading}>
            {loading ? 'Loading…' : 'Apply filters'}
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Issue Date</th>
            <th>Customer</th>
            <th>Status</th>
            <th className="right">Total</th>
            <th className="right">VAT</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.issue_date}</td>
              <td>{/* replace with customer name if you join */}Demo Customer</td>
              <td><StatusChip value={r.status} /></td>
              <td className="right">{Number(r.total_amount || 0).toFixed(2)}</td>
              <td className="right">{Number(r.vat_amount || 0).toFixed(2)}</td>
            </tr>
          ))}
          {!rows.length && (
            <tr><td colSpan={5} style={{ textAlign:'center', color:'#667085' }}>No invoices.</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}

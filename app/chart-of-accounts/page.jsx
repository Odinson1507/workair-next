'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const TypeChip = ({ t }) => {
  const v = (t || '').toLowerCase();
  const cls =
    v === 'asset' ? 'chip info' :
    v === 'liability' ? 'chip warn' :
    v === 'equity' ? 'chip' :
    v === 'income' ? 'chip success' :
    v === 'expense' ? 'chip' :
    'chip';
  return <span className={cls}>{t}</span>;
};

export default function ChartOfAccounts() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    code: '', name: '', type: 'asset', tax_relevant: false, tag: ''
  });
  const [loading, setLoading] = useState(false);

  const company = 'KTVL';

  async function load() {
    const { data, error } = await supabase
      .from('accounts')
      .select('id, code, name, type, tax_relevant, tag')
      .eq('company_slug', company)
      .order('code');
    if (!error) setRows(data || []);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login';
      else load();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('accounts').insert([{
      company_slug: company,
      ...form,
    }]);
    setLoading(false);
    if (error) return alert(error.message);
    setForm({ code:'', name:'', type:'asset', tax_relevant:false, tag:'' });
    load();
  }

  return (
    <>
      <div className="toolbar">
        <div className="h1">Chart of Accounts</div>
      </div>

      {/* Add account */}
      <div className="panel pad" style={{ marginBottom: 16 }}>
        <form onSubmit={add} className="grid cols-5">
          <input className="input" placeholder="Code" value={form.code}
                 onChange={e=>setForm({ ...form, code:e.target.value })} required />
          <input className="input" placeholder="Name" value={form.name}
                 onChange={e=>setForm({ ...form, name:e.target.value })} required />
          <select className="select" value={form.type}
                  onChange={e=>setForm({ ...form, type:e.target.value })}>
            <option>asset</option>
            <option>liability</option>
            <option>equity</option>
            <option>income</option>
            <option>expense</option>
          </select>
          <label className="input" style={{ display:'flex', alignItems:'center', gap:8 }}>
            <input type="checkbox" checked={form.tax_relevant}
                   onChange={e=>setForm({ ...form, tax_relevant:e.target.checked })} />
            Tax relevant
          </label>
          <input className="input" placeholder="Tag (optional)" value={form.tag}
                 onChange={e=>setForm({ ...form, tag:e.target.value })} />
          <div style={{ gridColumn:'span 5' }}>
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Add Account'}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th className="right" style={{ width:110 }}>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Tax</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td className="right">{r.code}</td>
              <td>{r.name}</td>
              <td><TypeChip t={r.type} /></td>
              <td>{r.tax_relevant ? 'Yes' : 'No'}</td>
              <td>{r.tag || '-'}</td>
            </tr>
          ))}
          {!rows.length && (
            <tr><td colSpan={5} style={{ textAlign:'center', color:'#667085' }}>No accounts.</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}

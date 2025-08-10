'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ChartOfAccounts() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    code: '',
    name: '',
    type: 'asset',
    is_tax_relevant: false,
    tag: ''
  });
  const [loading, setLoading] = useState(false);
  const company = 'KTVL'; // later: set from auth/onboarding

  const load = async () => {
    const { data, error } = await supabase
      .from('chart_of_accounts')
      .select('id, code, name, type, is_tax_relevant, tag')
      .eq('company_slug', company)
      .order('code');
    if (!error) setRows(data || []);
  };

  const add = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('chart_of_accounts').insert([{
      company_slug: company,
      code: form.code,
      name: form.name,
      type: form.type,
      is_tax_relevant: form.is_tax_relevant,
      tag: form.tag || null
    }]);
    setLoading(false);
    if (!error) {
      setForm({ code: '', name: '', type: 'asset', is_tax_relevant: false, tag: '' });
      load();
    } else {
      alert(error.message);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1>Chart of Accounts</h1>

      <form onSubmit={add} style={{ display:'grid', gap:8, maxWidth:460 }}>
        <input placeholder="Code" value={form.code}
          onChange={(e)=>setForm({...form, code:e.target.value})} required />
        <input placeholder="Name" value={form.name}
          onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <select value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})}>
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label style={{ display:'flex', gap:8, alignItems:'center' }}>
          <input type="checkbox" checked={form.is_tax_relevant}
            onChange={(e)=>setForm({...form, is_tax_relevant:e.target.checked})}/>
          Tax relevant
        </label>
        <input placeholder="Tag (optional)" value={form.tag}
          onChange={(e)=>setForm({...form, tag:e.target.value})}/>
        <button disabled={loading} type="submit">{loading ? 'Saving…' : 'Add Account'}</button>
      </form>

      <table border="1" cellPadding="6" style={{ maxWidth: 820 }}>
        <thead>
          <tr><th>Code</th><th>Name</th><th>Type</th><th>Tax</th><th>Tag</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.code}</td>
              <td>{r.name}</td>
              <td>{r.type}</td>
              <td>{r.is_tax_relevant ? 'Yes' : 'No'}</td>
              <td>{r.tag || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

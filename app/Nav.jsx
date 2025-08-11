'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{ display:'flex', gap:12, padding:8, borderBottom:'1px solid #eee' }}>
      <Link href="/">Home</Link>
      <Link href="/chart-of-accounts">Chart of Accounts</Link>
      <Link href="/customers">Customers</Link>
      <Link href="/invoices">Invoices</Link>
    </nav>
  );
}

'use client';
import Link from 'next/link';

export const metadata = {
  title: 'WorkAir',
  description: 'Finance-first mini ERP',
};

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 8, borderBottom: '1px solid #eee' }}>
      <Link href="/">Home</Link>
      <Link href="/chart-of-accounts">Chart of Accounts</Link>
      <Link href="/customers">Customers</Link>
      <Link href="/invoices">Invoices</Link>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, Arial, sans-serif' }}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

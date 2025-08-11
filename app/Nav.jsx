'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const linkStyle = (href) => ({
    padding: '6px 10px',
    borderRadius: 6,
    textDecoration: 'none',
    color: pathname === href ? '#0b5fff' : '#333',
    background: pathname === href ? '#eaf1ff' : 'transparent',
    border: '1px solid',
    borderColor: pathname === href ? '#bcd3ff' : '#e5e8eb'
  });

  return (
    <nav style={{
      display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px',
      borderBottom: '1px solid #e5e8eb', background: '#fff', position: 'sticky', top: 0, zIndex: 10
    }}>
      <Link href="/" style={linkStyle('/')}>Home</Link>
      <Link href="/chart-of-accounts" style={linkStyle('/chart-of-accounts')}>Chart of Accounts</Link>
      <Link href="/customers" style={linkStyle('/customers')}>Customers</Link>
      <Link href="/invoices" style={linkStyle('/invoices')}>Invoices</Link>
    </nav>
  );
}

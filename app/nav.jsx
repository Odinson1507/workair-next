// app/nav.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const link = (href, label) => (
    <Link
      href={href}
      style={{
        padding: '6px 10px',
        borderRadius: 6,
        background: pathname === href ? '#eef4ff' : 'transparent',
        textDecoration: 'none',
        color: '#111',
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}
    >
      {link('/', 'Home')}
      {link('/chart-of-accounts', 'Chart of Accounts')}
      {link('/customers', 'Customers')}
      {link('/invoices', 'Invoices')}
    </nav>
  );
}

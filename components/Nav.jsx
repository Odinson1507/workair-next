'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/chart-of-accounts', label: 'Chart of Accounts' },
  { href: '/customers', label: 'Customers' },
  { href: '/invoices', label: 'Invoices' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: 'flex',
        gap: 12,
        padding: '10px 16px',
        borderBottom: '1px solid #eee',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              textDecoration: 'none',
              color: active ? '#111' : '#555',
              background: active ? '#f4f6f8' : 'transparent',
              border: active ? '1px solid #e5e8eb' : '1px solid transparent',
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

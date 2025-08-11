// app/layout.jsx
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WorkAir',
  description: 'Finance-first mini ERP',
};

function NavLinks() {
  const pathname = typeof window === 'undefined' ? '' : window.location.pathname;
  const is = (p) => pathname === p ? 'active' : '';
  return (
    <nav className="mainnav">
      <Link className={is('/')} href="/">Home</Link>
      <Link className={is('/chart-of-accounts')} href="/chart-of-accounts">Chart of Accounts</Link>
      <Link className={is('/customers')} href="/customers">Customers</Link>
      <Link className={is('/invoices')} href="/invoices">Invoices</Link>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand">
              <span className="brand-badge" />
              WorkAir
            </div>
            <NavLinks />
            <div style={{ marginLeft: 'auto' }} />
            <Link className="btn ghost" href="/login">Login</Link>
          </div>
        </header>

        <main className="wrapper">
          {/* Optional page toolbar example */}
          {/* <div className="toolbar">
              <div className="h1">Page Title</div>
              <div className="actions"><button className="btn primary">Action</button></div>
            </div> */}
          <div className="panel pad">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

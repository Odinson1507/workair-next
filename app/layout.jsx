import './globals.css';
import { Inter } from 'next/font/google';
import Nav from './nav'; // <-- the client nav

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WorkAir',
  description: 'Finance-first mini ERP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#f7f8fa' }}>
        {/* Top bar / brand header (server-safe) */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 16px',
            borderBottom: '1px solid #e5e8eb',
            background: '#fff',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: '#111',
            }}
          />
          <strong style={{ fontSize: 14 }}>WorkAir</strong>
        </header>

        {/* Client Nav that uses usePathname */}
        <Nav />

        <main style={{ maxWidth: 1100, margin: '16px auto', padding: '0 16px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

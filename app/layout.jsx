import './globals.css';
import { Inter } from 'next/font/google';
import Nav from './Nav'; // or './nav' if you choose the lowercase filename

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WorkAir',
  description: 'Finance-first mini ERP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header (server OK) */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, padding: '10px 16px', borderBottom: '1px solid #e5e8eb',
          background: '#f7f8fa'
        }}>
          <strong style={{ fontSize: 14 }}>WorkAir</strong>
        </header>

        {/* Client Nav must render here */}
        <Nav />

        <main style={{ maxWidth: 1100, margin: '16px auto', padding: '0 16px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

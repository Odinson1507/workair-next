import Nav from './Nav';

export const metadata = {
  title: 'WorkAir',
  description: 'Finance-first mini ERP',
};

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

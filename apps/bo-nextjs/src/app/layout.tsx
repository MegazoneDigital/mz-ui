import { Sidebar } from '@/widgets';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BO Next.js',
  description: 'BO Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="flex h-screen flex-row">
          <Sidebar />

          <div className="w-3/4">{children}</div>
        </div>
      </body>
    </html>
  );
}

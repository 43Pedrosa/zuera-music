import type { Metadata } from 'next';
import './globals.css';
import { PWARegister } from '@/components/PWARegister';

export const metadata: Metadata = {
  title: 'GymFlow Premium',
  description: 'PWA premium para evolução física e desempenho na academia.',
  manifest: '/manifest.json',
  applicationName: 'GymFlow Premium'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <PWARegister />
        <main className="mx-auto min-h-screen w-full max-w-md bg-white px-4 pb-24 pt-4 text-slate-900">{children}</main>
      </body>
    </html>
  );
}

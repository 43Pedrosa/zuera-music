import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { PWARegister } from '@/components/PWARegister';
import { GlobalAudioPlayer } from '@/components/GlobalAudioPlayer';

export const metadata: Metadata = {
  title: 'ZUERA MUSIC',
  description: 'Streaming de música moderno com experiência premium.',
  applicationName: 'ZUERA MUSIC',
  keywords: ['music', 'streaming', 'pwa', 'audius', 'zuera music'],
  manifest: '/manifest.json',
  themeColor: '#070808',
  openGraph: {
    title: 'ZUERA MUSIC',
    description: 'Descubra músicas em alta e escute em qualquer lugar.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <PWARegister />
        <Sidebar />
        <main className="px-4 pb-24 pt-4 lg:ml-72 lg:px-8 lg:pb-8">{children}</main>
        <GlobalAudioPlayer />
      </body>
    </html>
  );
}

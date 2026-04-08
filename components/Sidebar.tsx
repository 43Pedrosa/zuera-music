'use client';

import Link from 'next/link';
import { Home, Library, Search, Disc3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const items = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/search', label: 'Buscar', icon: Search },
  { href: '/library', label: 'Biblioteca', icon: Library },
  { href: '/player', label: 'Player', icon: Disc3 }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="glass fixed left-4 top-4 hidden h-[calc(100vh-2rem)] w-64 rounded-2xl p-4 lg:block">
        <h1 className="mb-8 text-2xl font-black tracking-wide text-neon">ZUERA MUSIC</h1>
        <nav className="space-y-2">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/10',
                pathname === href && 'bg-neon/10 text-neon'
              )}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <nav className="glass fixed bottom-2 left-2 right-2 z-50 grid grid-cols-4 rounded-2xl p-1 lg:hidden">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex flex-col items-center gap-1 rounded-xl py-2 text-xs transition',
              pathname === href ? 'bg-neon/20 text-neon' : 'text-muted'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}

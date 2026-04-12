'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Dashboard' },
  { href: '/checkin', label: 'Check-in' },
  { href: '/progresso', label: 'Progresso' },
  { href: '/treinos', label: 'Treinos' },
  { href: '/configuracoes', label: 'Ajustes' }
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-md gap-1 border-t border-slate-200 bg-white p-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex-1 rounded-lg px-2 py-3 text-center text-xs font-semibold ${
            pathname === tab.href ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

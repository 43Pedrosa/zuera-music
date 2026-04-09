import { Home, Library, Search } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home },
  { label: 'Search', icon: Search },
  { label: 'Library', icon: Library }
];

export function Sidebar() {
  return (
    <aside className="w-full rounded-2xl bg-panel/95 p-4 shadow-lg md:w-64">
      <h1 className="mb-6 text-xl font-semibold tracking-wide text-cyan">Prime Music</h1>
      <nav className="flex gap-3 md:flex-col">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-black/20 px-3 py-2 text-sm text-zinc-300 transition hover:bg-cyan/10 hover:text-cyan md:justify-start"
            type="button"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

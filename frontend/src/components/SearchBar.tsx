interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="sticky top-0 z-20 rounded-2xl bg-panel/90 p-4 backdrop-blur">
      <input
        className="w-full rounded-xl border border-zinc-700 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none ring-cyan/40 transition focus:border-cyan focus:ring"
        placeholder="Search songs, artists, playlists"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

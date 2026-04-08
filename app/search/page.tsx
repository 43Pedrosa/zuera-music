'use client';

import { useState } from 'react';
import { searchTracks, type MusicTrack } from '@/services/audius';
import { TrackCard } from '@/components/TrackCard';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setResults(await searchTracks(query));
    } catch {
      setError('Não foi possível buscar músicas agora.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Busca global</h1>
      <form onSubmit={onSearch} className="glass flex items-center gap-2 rounded-xl p-3">
        <Search className="text-muted" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="Ex: Pink Floyd, U2, Queen - Bohemian Rhapsody"
        />
      </form>

      {loading && <p className="text-muted">Buscando no YouTube...</p>}
      {error && <p className="rounded-xl bg-red-500/20 p-4 text-red-200">{error}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {results.map((track) => (
          <TrackCard key={track.video_id} track={track} queue={results} />
        ))}
      </div>
    </div>
  );
}

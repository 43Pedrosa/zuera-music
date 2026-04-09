import { useEffect, useState } from 'react';
import { PlayerBar } from './components/PlayerBar';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { TrackGrid } from './components/TrackGrid';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { useDebounce } from './hooks/useDebounce';
import { searchTracks } from './lib/api';
import type { Track } from './types/music';

function PrimeMusicApp() {
  const [query, setQuery] = useState('lofi chill');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 350);
  const { playTrack, setQueue } = usePlayer();

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setTracks([]);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const runSearch = async () => {
      setIsSearching(true);
      setError(null);
      try {
        const results = await searchTracks(debouncedQuery, controller.signal);
        setTracks(results);
        setQueue(results);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Unable to search right now.');
      } finally {
        setIsSearching(false);
      }
    };

    void runSearch();

    return () => controller.abort();
  }, [debouncedQuery, setQueue]);

  return (
    <div className="flex min-h-dvh flex-col bg-surface text-zinc-100">
      <main className="flex flex-1 flex-col gap-4 p-3 md:flex-row md:p-4">
        <Sidebar />
        <section className="flex-1 rounded-2xl bg-black/20 p-3 md:p-4">
          <SearchBar value={query} onChange={setQuery} />
          <div className="mt-4">
            <TrackGrid
              tracks={tracks}
              isLoading={isSearching}
              error={error}
              onPlay={(track) => {
                void playTrack(track, tracks);
              }}
            />
          </div>
        </section>
      </main>
      <PlayerBar />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <PrimeMusicApp />
    </PlayerProvider>
  );
}

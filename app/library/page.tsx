'use client';

import { useEffect, useState } from 'react';
import { getTrackById, type AudiusTrack } from '@/services/audius';
import { TrackCard } from '@/components/TrackCard';
import { usePlayerStore } from '@/store/player-store';

export default function LibraryPage() {
  const recent = usePlayerStore((s) => s.recent);
  const [favorites, setFavorites] = useState<AudiusTrack[]>([]);

  useEffect(() => {
    async function loadFavs() {
      const ids: string[] = JSON.parse(localStorage.getItem('zuera-favorites') || '[]');
      const tracks = await Promise.all(ids.map((id) => getTrackById(id).catch(() => null)));
      setFavorites(tracks.filter(Boolean) as AudiusTrack[]);
    }
    loadFavs().catch(() => undefined);
  }, []);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-4 text-3xl font-bold">Sua Biblioteca</h1>
        <h2 className="mb-3 text-xl font-semibold text-neon">Favoritas</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {favorites.map((track) => <TrackCard key={track.id} track={track} queue={favorites} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-neon">Recentes</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {recent.map((track) => <TrackCard key={track.id} track={track} queue={recent} />)}
        </div>
      </section>
    </div>
  );
}

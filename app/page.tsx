import { getTrendingTracks } from '@/services/audius';
import { TrackCard } from '@/components/TrackCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Suspense } from 'react';

async function TrendingSection() {
  try {
    const tracks = await getTrendingTracks(24);

    return (
      <section>
        <h2 className="mb-4 text-2xl font-bold">Trending agora</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} queue={tracks} />
          ))}
        </div>
      </section>
    );
  } catch {
    return <p className="rounded-xl bg-red-500/20 p-4 text-red-200">Erro ao carregar faixas em alta.</p>;
  }
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="glass rounded-2xl p-6">
        <p className="text-sm uppercase tracking-widest text-neon">Novo no ar</p>
        <h1 className="mt-2 text-4xl font-black">Sinta o som. Viva a batida.</h1>
        <p className="mt-3 max-w-xl text-muted">Experiência premium de streaming com playlists em alta e reprodução contínua.</p>
      </header>

      <Suspense fallback={<LoadingGrid />}>
        <TrendingSection />
      </Suspense>
    </div>
  );
}

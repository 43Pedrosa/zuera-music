import { getTrendingTracks } from '@/services/audius';
import { TrackCard } from '@/components/TrackCard';

export default async function HomePage() {
  try {
    const tracks = await getTrendingTracks();

    return (
      <div className="space-y-8">
        <header className="glass rounded-2xl p-6">
          <p className="text-sm uppercase tracking-widest text-neon">YouTube Streaming</p>
          <h1 className="mt-2 text-4xl font-black">ZUERA MUSIC</h1>
          <p className="mt-3 max-w-xl text-muted">Descubra e toque qualquer música com busca global e player contínuo.</p>
        </header>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Em alta agora</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {tracks.map((track) => (
              <TrackCard key={track.video_id} track={track} queue={tracks} />
            ))}
          </div>
        </section>
      </div>
    );
  } catch {
    return <p className="rounded-xl bg-red-500/20 p-4 text-red-200">Erro ao carregar músicas em alta.</p>;
  }
}

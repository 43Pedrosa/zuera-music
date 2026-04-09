import type { Track } from '../types/music';
import { TrackCard } from './TrackCard';

interface TrackGridProps {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  onPlay: (track: Track) => void;
}

export function TrackGrid({ tracks, isLoading, error, onPlay }: TrackGridProps) {
  if (isLoading) {
    return <p className="py-16 text-center text-zinc-400">Searching tracks…</p>;
  }

  if (error) {
    return <p className="py-16 text-center text-red-300">{error}</p>;
  }

  if (!tracks.length) {
    return <p className="py-16 text-center text-zinc-500">Try searching for your next favorite song.</p>;
  }

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} onPlay={onPlay} />
      ))}
    </section>
  );
}

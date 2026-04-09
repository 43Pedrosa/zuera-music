import { Play } from 'lucide-react';
import { formatTime } from '../lib/time';
import type { Track } from '../types/music';

interface TrackCardProps {
  track: Track;
  onPlay: (track: Track) => void;
}

export function TrackCard({ track, onPlay }: TrackCardProps) {
  return (
    <article className="group rounded-2xl bg-panel p-3 transition hover:scale-[1.01] hover:shadow-glow">
      <div className="relative overflow-hidden rounded-xl">
        <img
          className="aspect-square w-full object-cover"
          src={track.thumbnail}
          alt={`${track.title} cover`}
          loading="lazy"
          decoding="async"
        />
        <button
          className="absolute bottom-2 right-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-black opacity-0 shadow-lg transition group-hover:opacity-100"
          onClick={() => onPlay(track)}
          type="button"
          aria-label={`Play ${track.title}`}
        >
          <Play className="h-4 w-4 fill-black" />
        </button>
      </div>
      <div className="mt-3">
        <h3 className="line-clamp-1 text-sm font-medium text-white">{track.title}</h3>
        <p className="line-clamp-1 text-xs text-zinc-400">{track.artist}</p>
        <p className="mt-1 text-xs text-zinc-500">{formatTime(track.duration)}</p>
      </div>
    </article>
  );
}

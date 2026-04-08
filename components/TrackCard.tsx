'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import type { MusicTrack } from '@/services/audius';
import { usePlayerStore } from '@/store/player-store';

export function TrackCard({ track, queue }: { track: MusicTrack; queue: MusicTrack[] }) {
  const playTrack = usePlayerStore((s) => s.playTrack);

  return (
    <button
      onClick={() => playTrack(track, queue)}
      className="group glass w-full overflow-hidden rounded-2xl text-left transition hover:-translate-y-1 hover:shadow-neon"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={track.thumbnail || '/icon.svg'}
          alt={track.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
          <div className="rounded-full bg-neon p-3 text-black">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-1 font-semibold">{track.title}</p>
        <p className="line-clamp-1 text-sm text-muted">{track.artist ?? 'Artista desconhecido'}</p>
      </div>
    </button>
  );
}

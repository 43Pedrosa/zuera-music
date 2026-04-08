'use client';

import Image from 'next/image';
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayerStore } from '@/store/player-store';
import { FavoriteButton } from '@/components/FavoriteButton';

export default function PlayerPage() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    previousTrack,
    currentTime,
    duration,
    volume,
    setVolume,
    setCurrentTime
  } = usePlayerStore();

  if (!currentTrack) {
    return <p className="text-muted">Nenhuma música selecionada. Toque uma faixa para começar.</p>;
  }

  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-neon">
        <Image src={currentTrack.thumbnail || '/icon.svg'} alt={currentTrack.title} fill className="object-cover" />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{currentTrack.title}</h1>
          <p className="text-muted">{currentTrack.artist}</p>
        </div>
        <FavoriteButton trackId={currentTrack.video_id} />
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full accent-neon"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>{Math.floor(currentTime)}s</span>
          <span>{Math.floor(duration)}s</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={previousTrack} className="rounded-full bg-white/10 p-3"><SkipBack /></button>
        <button onClick={togglePlay} className="rounded-full bg-neon p-4 text-black">
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </button>
        <button onClick={nextTrack} className="rounded-full bg-white/10 p-3"><SkipForward /></button>
      </div>

      <div className="flex items-center gap-3">
        <Volume2 size={18} className="text-muted" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-neon"
        />
      </div>
    </section>
  );
}

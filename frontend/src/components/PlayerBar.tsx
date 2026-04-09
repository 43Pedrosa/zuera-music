import { Pause, Play, Volume2 } from 'lucide-react';
import { useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../lib/time';

export function PlayerBar() {
  const { currentTrack, isPlaying, togglePlay, seek, duration, currentTime, setVolume, volume, isLoading, error } = usePlayer();

  const progress = useMemo(() => {
    if (!duration) return 0;
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  if (!currentTrack) {
    return (
      <footer className="h-24 border-t border-zinc-800 bg-panel px-4 py-5 text-sm text-zinc-500">
        Pick a track to start listening.
      </footer>
    );
  }

  return (
    <footer className="grid gap-3 border-t border-zinc-800 bg-panel px-4 py-3 md:grid-cols-[1fr_2fr_1fr] md:items-center">
      <div className="min-w-0">
        <p className="truncate text-sm text-white">{currentTrack.title}</p>
        <p className="truncate text-xs text-zinc-400">{currentTrack.artist}</p>
        {error ? <p className="text-xs text-red-300">{error}</p> : null}
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-black transition hover:scale-105 disabled:opacity-50"
          onClick={togglePlay}
          disabled={isLoading}
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
        </button>

        <div className="flex w-full max-w-xl items-center gap-2 text-xs text-zinc-400">
          <span>{formatTime(currentTime)}</span>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-zinc-700">
            <button
              className="absolute inset-0 w-full"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const ratio = (event.clientX - rect.left) / rect.width;
                seek((duration || 0) * ratio);
              }}
              type="button"
              aria-label="Seek"
            />
            <div className="h-full bg-cyan transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <label className="ml-auto flex items-center gap-2 text-zinc-300">
        <Volume2 className="h-4 w-4" />
        <input
          className="h-1 w-24 accent-cyan"
          min={0}
          max={1}
          step={0.01}
          type="range"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
        />
      </label>
    </footer>
  );
}

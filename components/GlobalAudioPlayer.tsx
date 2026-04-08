'use client';

import { useEffect, useRef } from 'react';
import { streamUrl } from '@/services/audius';
import { usePlayerStore } from '@/store/player-store';

export function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack, isPlaying, volume, currentTime, setCurrentTime, setDuration, nextTrack } = usePlayerStore();

  useEffect(() => {
    if (!audioRef.current) return;

    if (!currentTrack) {
      audioRef.current.pause();
      audioRef.current.src = '';
      return;
    }

    audioRef.current.src = streamUrl(currentTrack.id);
    if (isPlaying) {
      audioRef.current.play().catch(() => undefined);
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => undefined);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (Math.abs((audioRef.current.currentTime || 0) - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
      onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
      onEnded={nextTrack}
      preload="metadata"
    />
  );
}

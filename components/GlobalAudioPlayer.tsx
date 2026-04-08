'use client';

import { useEffect, useRef } from 'react';
import { streamUrl } from '@/services/audius';
import { usePlayerStore } from '@/store/player-store';

export function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack, isPlaying, volume, currentTime, setCurrentTime, setDuration, nextTrack } = usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack) {
      audio.pause();
      audio.src = '';
      return;
    }

    let cancelled = false;
    streamUrl(currentTrack.video_id)
      .then((url) => {
        if (cancelled) return;
        audio.src = url;
        if (isPlaying) {
          audio.play().catch(() => undefined);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
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

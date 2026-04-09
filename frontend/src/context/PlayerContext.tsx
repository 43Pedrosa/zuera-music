import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren
} from 'react';
import { resolveTrackStream } from '../lib/api';
import type { Track } from '../types/music';

interface PlayerContextValue {
  queue: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  setQueue: (tracks: Track[]) => void;
  playTrack: (track: Track, queue?: Track[]) => Promise<void>;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  playNext: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: PropsWithChildren) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.8);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => {
      void playNext();
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setError('Playback failed. This stream may not be supported.');
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const playTrack = useCallback(
    async (track: Track, newQueue?: Track[]) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (newQueue) {
        setQueue(newQueue);
      }

      setError(null);
      setIsLoading(true);
      setCurrentTrack(track);
      setDuration(track.duration || 0);
      setCurrentTime(0);

      try {
        const response = await resolveTrackStream(track.id);
        audio.src = response.stream_url;
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to play this track.');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.paused) {
      void audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, [currentTrack]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;

    audio.currentTime = Math.max(0, Math.min(time, duration || 0));
    setCurrentTime(audio.currentTime);
  }, [duration]);

  const setVolume = useCallback((next: number) => {
    const audio = audioRef.current;
    const safeVolume = Math.max(0, Math.min(1, next));
    setVolumeState(safeVolume);
    if (audio) {
      audio.volume = safeVolume;
    }
  }, []);

  const playNext = useCallback(async () => {
    if (!currentTrack) return;
    const idx = queue.findIndex((track) => track.id === currentTrack.id);
    const next = idx >= 0 ? queue[idx + 1] : null;
    if (!next) {
      setIsPlaying(false);
      return;
    }
    await playTrack(next);
  }, [currentTrack, playTrack, queue]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      queue,
      currentTrack,
      isPlaying,
      isLoading,
      error,
      duration,
      currentTime,
      volume,
      setQueue,
      playTrack,
      togglePlay,
      seek,
      setVolume,
      playNext
    }),
    [queue, currentTrack, isPlaying, isLoading, error, duration, currentTime, volume, playTrack, togglePlay, seek, setVolume, playNext]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider.');
  }
  return context;
}

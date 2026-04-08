'use client';

import { create } from 'zustand';
import type { AudiusTrack } from '@/services/audius';

type PlayerState = {
  queue: AudiusTrack[];
  currentTrack: AudiusTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  recent: AudiusTrack[];
  setQueue: (tracks: AudiusTrack[]) => void;
  playTrack: (track: AudiusTrack, queue?: AudiusTrack[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  recent: [],
  setQueue: (queue) => set({ queue }),
  playTrack: (track, queue) =>
    set((state) => ({
      currentTrack: track,
      isPlaying: true,
      queue: queue ?? state.queue,
      recent: [track, ...state.recent.filter((r) => r.id !== track.id)].slice(0, 20)
    })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextTrack: () => {
    const { queue, currentTrack } = get();
    if (!queue.length || !currentTrack) return;
    const index = queue.findIndex((t) => t.id === currentTrack.id);
    const next = queue[(index + 1) % queue.length];
    set({ currentTrack: next, isPlaying: true, currentTime: 0 });
  },
  previousTrack: () => {
    const { queue, currentTrack } = get();
    if (!queue.length || !currentTrack) return;
    const index = queue.findIndex((t) => t.id === currentTrack.id);
    const prev = queue[(index - 1 + queue.length) % queue.length];
    set({ currentTrack: prev, isPlaying: true, currentTime: 0 });
  },
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume })
}));

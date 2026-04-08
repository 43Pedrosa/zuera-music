'use client';

import { Heart } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function FavoriteButton({ trackId }: { trackId: string }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('zuera-favorites', []);
  const isFavorite = favorites.includes(trackId);

  function toggleFavorite() {
    setFavorites(
      isFavorite ? favorites.filter((id) => id !== trackId) : [...favorites, trackId]
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className="rounded-full border border-white/20 p-2 transition hover:border-neon hover:text-neon"
      aria-label="favoritar"
    >
      <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
}

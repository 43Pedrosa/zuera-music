const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000';

export type MusicTrack = {
  video_id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  duration: number;
};

type SearchResponse = { results: MusicTrack[] };
type StreamResponse = {
  stream_url: string;
  video_id: string;
  title?: string;
  artist?: string;
  duration?: number;
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Erro ao consultar API de streaming.');
  }
  return (await response.json()) as T;
}

export async function searchTracks(query: string): Promise<MusicTrack[]> {
  if (!query.trim()) return [];
  const data = await request<SearchResponse>(`/search?q=${encodeURIComponent(query)}`);
  return data.results;
}

export async function getTrendingTracks(): Promise<MusicTrack[]> {
  return searchTracks('Top músicas internacionais 2026');
}

export async function getTrackById(videoId: string): Promise<MusicTrack | null> {
  const tracks = await searchTracks(videoId);
  return tracks.find((track) => track.video_id === videoId) ?? null;
}

export async function streamUrl(videoId: string): Promise<string> {
  const data = await request<StreamResponse>(`/stream?id=${encodeURIComponent(videoId)}`);
  return data.stream_url;
}

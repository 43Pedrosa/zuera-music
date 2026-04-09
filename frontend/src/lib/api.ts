import type { StreamResponse, Track } from '../types/music';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const parseError = async (res: Response) => {
  try {
    const data = await res.json();
    return data.detail || 'Request failed.';
  } catch {
    return 'Request failed.';
  }
};

export async function searchTracks(query: string, signal?: AbortSignal): Promise<Track[]> {
  const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`, { signal });
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  return (await res.json()) as Track[];
}

export async function resolveTrackStream(id: string): Promise<StreamResponse> {
  const res = await fetch(`${API_BASE}/api/stream?id=${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  return (await res.json()) as StreamResponse;
}

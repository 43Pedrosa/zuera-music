const APP_NAME = 'ZUERA_MUSIC';
const BASE_URL = 'https://discoveryprovider.audius.co/v1';

export type AudiusTrack = {
  id: string;
  title: string;
  artwork?: { [key: string]: string };
  user: { name: string };
  duration: number;
};

type AudiusResponse<T> = { data: T };

async function request<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}app_name=${APP_NAME}`;
  const res = await fetch(url, { next: { revalidate: 120 } });

  if (!res.ok) {
    throw new Error('Falha ao conectar com Audius.');
  }

  const json = (await res.json()) as AudiusResponse<T>;
  return json.data;
}

export async function getTrendingTracks(limit = 20): Promise<AudiusTrack[]> {
  return request<AudiusTrack[]>(`/tracks/trending?limit=${limit}`);
}

export async function getTrackById(id: string): Promise<AudiusTrack> {
  const data = await request<AudiusTrack[]>(`/tracks/${id}`);
  return Array.isArray(data) ? data[0] : (data as unknown as AudiusTrack);
}

export async function searchTracks(query: string): Promise<AudiusTrack[]> {
  if (!query.trim()) return [];
  return request<AudiusTrack[]>(`/tracks/search?query=${encodeURIComponent(query)}&limit=20`);
}

export function streamUrl(trackId: string): string {
  return `${BASE_URL}/tracks/${trackId}/stream?app_name=${APP_NAME}`;
}

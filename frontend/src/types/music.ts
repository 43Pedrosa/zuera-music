export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
}

export interface StreamResponse {
  id: string;
  stream_url: string;
  expires_at?: number;
}

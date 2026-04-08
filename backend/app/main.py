from __future__ import annotations

from typing import Any

import yt_dlp
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='ZUERA MUSIC API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def get_audio_stream(query: str) -> dict[str, Any]:
    ydl_opts = {
        'format': 'bestaudio/best',
        'quiet': True,
        'default_search': 'ytsearch',
        'noplaylist': True,
        'skip_download': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(query, download=False)
        if isinstance(info, dict) and 'entries' in info:
            entries = info.get('entries') or []
            first = next((item for item in entries if item), None)
            if not first:
                raise ValueError('Nenhum resultado encontrado para extração de áudio.')
            return first
        return info


def normalize_track(entry: dict[str, Any]) -> dict[str, Any]:
    return {
        'video_id': entry.get('id'),
        'title': entry.get('title') or 'Sem título',
        'artist': entry.get('artist') or entry.get('uploader') or 'Artista desconhecido',
        'thumbnail': entry.get('thumbnail'),
        'duration': entry.get('duration') or 0,
    }


@app.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


@app.get('/search')
def search_tracks(q: str = Query(..., min_length=2, max_length=120)) -> dict[str, list[dict[str, Any]]]:
    try:
        info = get_audio_stream(f'ytsearch20:{q}')
        entries = info.get('entries') if isinstance(info, dict) else None

        if entries is None:
            entries = [info]

        tracks = [normalize_track(entry) for entry in entries if entry]
        return {'results': tracks}
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f'Falha ao buscar no YouTube: {exc}') from exc


@app.get('/stream')
def stream_track(id: str = Query(..., min_length=6, max_length=20)) -> dict[str, Any]:
    try:
        info = get_audio_stream(f'https://www.youtube.com/watch?v={id}')
        stream_url = info.get('url')
        if not stream_url:
            raise ValueError('URL de streaming não encontrada.')

        return {
            'video_id': id,
            'stream_url': stream_url,
            'title': info.get('title'),
            'artist': info.get('artist') or info.get('uploader'),
            'duration': info.get('duration') or 0,
        }
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f'Falha ao extrair stream: {exc}') from exc

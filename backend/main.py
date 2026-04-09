from __future__ import annotations

import os
from functools import lru_cache
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from yt_dlp import YoutubeDL
from yt_dlp.utils import DownloadError

load_dotenv()

app = FastAPI(title='Prime Music API', version='1.0.0')

cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in cors_origins if origin.strip()],
    allow_credentials=False,
    allow_methods=['GET'],
    allow_headers=['*'],
)


@lru_cache(maxsize=1)
def ytdlp_base_opts() -> dict[str, Any]:
    return {
        'quiet': True,
        'noplaylist': True,
        'skip_download': True,
        'nocheckcertificate': True,
        'extract_flat': False,
    }


@app.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


@app.get('/api/search')
def search_tracks(
    q: str = Query(..., min_length=1, max_length=120),
    limit: int = Query(20, ge=1, le=40),
) -> JSONResponse:
    opts = {
        **ytdlp_base_opts(),
        'extract_flat': 'in_playlist',
        'default_search': 'ytsearch',
    }

    try:
        with YoutubeDL(opts) as ydl:
            result = ydl.extract_info(f'ytsearch{limit}:{q}', download=False)
    except DownloadError as exc:
        raise HTTPException(status_code=502, detail='YouTube search failed.') from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail='Unexpected search error.') from exc

    entries = result.get('entries', []) if isinstance(result, dict) else []

    tracks = []
    for entry in entries:
        if not isinstance(entry, dict) or not entry.get('id'):
            continue
        track_id = str(entry['id'])
        tracks.append(
            {
                'id': track_id,
                'title': entry.get('title', 'Unknown Title'),
                'artist': entry.get('uploader') or entry.get('channel', 'Unknown Artist'),
                'duration': int(entry.get('duration') or 0),
                'thumbnail': entry.get('thumbnail') or f'https://i.ytimg.com/vi/{track_id}/hqdefault.jpg',
            }
        )

    return JSONResponse(tracks)


@app.get('/api/stream')
def stream_track(id: str = Query(..., min_length=3, max_length=30)) -> JSONResponse:
    url = f'https://www.youtube.com/watch?v={id}'
    opts = {
        **ytdlp_base_opts(),
        'format': 'bestaudio[ext=m4a]/bestaudio/best',
    }

    try:
        with YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except DownloadError as exc:
        raise HTTPException(status_code=502, detail='Unable to resolve stream URL.') from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail='Unexpected stream resolver error.') from exc

    if not isinstance(info, dict) or not info.get('url'):
        raise HTTPException(status_code=422, detail='No playable stream found for this track.')

    return JSONResponse(
        {
            'id': id,
            'stream_url': info['url'],
            'expires_at': info.get('url_expiry'),
        }
    )

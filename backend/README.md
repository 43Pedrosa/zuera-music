# ZUERA MUSIC Backend (FastAPI + yt-dlp)

## Rodar localmente
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints
- `GET /search?q=nome_da_musica`
- `GET /stream?id=video_id`
- `GET /health`

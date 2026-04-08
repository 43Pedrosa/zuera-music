# ZUERA MUSIC

Aplicativo de streaming estilo Spotify com:
- **Frontend PWA** em Next.js + TypeScript + Tailwind
- **Backend FastAPI** com `yt-dlp` para busca e extração de URL de áudio do YouTube
- **Player global** persistente entre páginas

> Regra do projeto: não baixar arquivos; apenas extrair e reproduzir stream de áudio.

## Estrutura
- `app/`, `components/`, `hooks/`, `services/`, `store/`, `public/` → frontend Next.js
- `backend/app/main.py` → API FastAPI (`/search`, `/stream`, `/health`)

## Rodar localmente

### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend
Em outro terminal:
```bash
npm install
npm run dev
```
Abra `http://localhost:3000`.

Se necessário, configure:
```bash
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

## Endpoints da API
- `GET /search?q=nome_da_musica`
  - Busca global no YouTube via `ytsearch`
  - Retorna: `title`, `artist`, `thumbnail`, `duration`, `video_id`
- `GET /stream?id=video_id`
  - Extrai URL de áudio `bestaudio`
  - Retorna stream direto para reprodução no frontend

## Scripts (frontend)
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy na Vercel
1. Faça deploy do backend (ex.: Render/Railway/Fly/VM).
2. Configure `NEXT_PUBLIC_API_BASE` na Vercel com a URL do backend.
3. Importe o repositório na Vercel e faça deploy do frontend.

## Funcionalidades
- Busca global de qualquer música/artista (Pink Floyd, U2, etc).
- Player completo: play/pause, próxima/anterior, progresso e volume.
- Favoritos em `localStorage`.
- Biblioteca com favoritos e histórico recente.
- PWA instalável com cache offline básico.

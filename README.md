# Prime Music

Prime Music is a production-ready Spotify-inspired music streaming web app.

## Stack

- **Frontend:** React + Vite + TypeScript + TailwindCSS + PWA
- **Backend:** FastAPI + yt-dlp

## Project structure

```txt
.
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── vercel.json
│   ├── eslint.config.js
│   └── src
│       ├── App.tsx
│       ├── main.tsx
│       ├── styles.css
│       ├── types/music.ts
│       ├── lib/api.ts
│       ├── lib/time.ts
│       ├── hooks/useDebounce.ts
│       ├── context/PlayerContext.tsx
│       └── components
│           ├── Sidebar.tsx
│           ├── SearchBar.tsx
│           ├── TrackCard.tsx
│           ├── TrackGrid.tsx
│           └── PlayerBar.tsx
└── backend
    ├── main.py
    ├── requirements.txt
    ├── .env.example
    └── render.yaml
```

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment variables

### Backend (`backend/.env`)

```bash
CORS_ORIGINS=http://localhost:5173,https://your-frontend-domain.vercel.app
```

### Frontend (`frontend/.env`)

```bash
VITE_API_BASE_URL=http://localhost:8000
```

## API endpoints

- `GET /api/search?q=<query>&limit=20`
- `GET /api/stream?id=<youtube_video_id>`
- `GET /health`


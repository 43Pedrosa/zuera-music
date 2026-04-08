# ZUERA MUSIC

Aplicativo PWA de streaming musical inspirado em experiências modernas de música, construído com Next.js App Router + Audius API.

## Stack
- Next.js 15 + React 18 + TypeScript
- Tailwind CSS
- Zustand para player global
- PWA (manifest + service worker)
- Pronto para deploy na Vercel

## Rodando localmente
```bash
npm install
npm run dev
```
Abra `http://localhost:3000`.

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy na Vercel
1. Faça push do projeto para GitHub.
2. Na Vercel, clique em **Add New Project**.
3. Importe o repositório `zuera-music`.
4. Build command: `npm run build` (default).
5. Output: `.next` (default).
6. Deploy.

## Funcionalidades
- Home com músicas Trending via Audius API.
- Busca por faixas.
- Player global com play/pause, próxima/anterior, barra de progresso e volume.
- Favoritos em `localStorage`.
- Biblioteca com favoritos + recentes.
- PWA instalável com cache offline básico.


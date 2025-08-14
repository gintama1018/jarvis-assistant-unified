# Jarvis Student Assistant (Free-Hosting Starter)

Monorepo with:
- **server/**: Node.js + Express + MongoDB + Socket.IO + optional Firebase Auth + optional MQTT
- **apps/web/**: React + Vite + Firebase Auth (Vercel-ready)
- **apps/mobile/**: Expo React Native app (build APK with EAS or local)

## Quick Start (Local)

1) **Requirements**: Node 18+, npm, MongoDB Atlas URI (or local Mongo), Firebase project (optional for local).
2) **Install deps**:
```bash
cd server && npm i
cd ../apps/web && npm i
cd ../apps/mobile && npm i
```
3) **Environment**: copy each `.env.example` to `.env` and fill values (you can leave Firebase blank for local and use `DEMO_MODE=true`).

4) **Run server**:
```bash
cd server
npm run dev
```
Server runs on `http://localhost:4000`

5) **Run web**:
```bash
cd apps/web
npm run dev
```
Web runs on `http://localhost:5173`

6) **Run mobile**:
```bash
cd apps/mobile
npm start
```
Use Expo Go to scan the QR.

## Deploy (Free Tiers)

- **Render**: deploy `server` folder (Node). Set env vars from `.env.example`.
- **Vercel**: import `apps/web` project.
- **Expo**: create an EAS project, run `eas build -p android` to get an APK.
- **MongoDB Atlas**: create free M0 cluster, put URI into `MONGODB_URI`.

## Features

- Tasks, Notes, Classes (CRUD)
- Simple Chat stub (can connect to OpenAI/Gemini if you add keys)
- Socket.IO realtime for reminders/messages
- MQTT optional for IoT (HiveMQ Cloud)

## Security & Demo Mode

- If `DEMO_MODE=true`, the API uses a permissive auth allowing quick local testing.
- For production, set Firebase Admin credentials to verify ID tokens and set `DEMO_MODE=false`.

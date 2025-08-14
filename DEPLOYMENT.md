# Jarvis Student Assistant - Deployment Guide

## 🚀 Quick Deploy to Render

### 1. Repository Setup ✅
- Repository: https://github.com/gintama1018/jarvis-assistant-unified.git
- Branch: main
- Latest commit includes all production fixes

### 2. Render Service Configuration

**Service Settings:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `server`
- **Environment**: Node.js

**Required Environment Variables:**
```
PORT=4000
MONGODB_URI=mongodb+srv://sonubhai123123:W5PzTLJFbk76L5qy@cluster0.uzdsymz.mongodb.net/jarvis?retryWrites=true&w=majority&appName=Cluster0
CORS_ORIGIN=*
DEMO_MODE=true
CRON_KEY=render-production-key-2024
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=60
```

### 3. Expected Success Logs
```
Environment Debug:
NODE_ENV: production
MONGODB_URI: SET
DEMO_MODE: true
PORT: 4000
Auth middleware - Demo Mode: true
MongoDB connected
API running on http://localhost:4000
```

### 4. API Endpoints
- **Root**: `GET /` - API information
- **Health**: `GET /healthz` - Health check
- **Tasks**: `GET/POST /tasks` - Task management
- **Notes**: `GET/POST /notes` - Note management
- **Chat**: `POST /chat/message` - AI chat demo

### 5. Frontend Deployment (Vercel)
- **Repository**: Same repo
- **Root Directory**: `apps/web`
- **Build Command**: `npm run build`
- **Environment Variable**: `VITE_API_BASE_URL=https://your-render-url.onrender.com`

### 6. Mobile App (EAS Build)
- **Directory**: `apps/mobile`
- **Command**: `eas build -p android`
- **Update API URL**: Change `API_BASE_URL` in App.js to production URL

## 🔧 Troubleshooting

**401 Errors**: Ensure `DEMO_MODE=true` is set in environment variables
**MongoDB Errors**: Verify `MONGODB_URI` is correctly set with the Atlas connection string
**Build Errors**: Check that `npm install` and `npm start` scripts work in `server/package.json`

## ✅ Production Ready Features
- MongoDB Atlas integration
- Demo mode for easy testing
- Rate limiting and security
- Socket.IO real-time features
- CORS configured
- Error handling and logging
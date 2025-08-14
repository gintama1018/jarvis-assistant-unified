import dotenv from 'dotenv';
dotenv.config();

// Production-ready configuration with fallbacks
export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jarvis',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  demoMode: (process.env.DEMO_MODE || 'true').toLowerCase() === 'true', // Default to true for easier deployment
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\n')
      : undefined
  },
  cronKey: process.env.CRON_KEY || 'dev-cron',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '60', 10),
  mqtt: {
    url: process.env.MQTT_URL,
    user: process.env.MQTT_USER,
    pass: process.env.MQTT_PASS
  },
  llm: {
    openaiKey: process.env.OPENAI_API_KEY,
    googleKey: process.env.GOOGLE_API_KEY
  }
};

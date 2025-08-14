import dotenv from 'dotenv';
dotenv.config();

// Debug environment variables for production
console.log('Environment Debug:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('DEMO_MODE:', process.env.DEMO_MODE);
console.log('PORT:', process.env.PORT);

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import { config } from './config.js';
import { authMiddleware } from './middleware/auth.js';
import { rateLimiter } from './utils/rateLimiter.js';
import tasksRouter from './routes/tasks.js';
import notesRouter from './routes/notes.js';
import classesRouter from './routes/classes.js';
import chatRouter from './routes/chat.js';
import devicesRouter from './routes/devices.js';
import jobsRouter from './routes/jobs.js';
import { initMqtt } from './services/mqtt.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: config.corsOrigin, methods: ['GET','POST','PUT','DELETE'] }
});

// Attach io to app for broadcasting
app.set('io', io);

app.use(cors({ origin: config.corsOrigin }));
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// DB
mongoose.connect(config.mongoUri).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB error', err);
  process.exit(1);
});

// Auth + Rate Limit
app.use(authMiddleware);
app.use(rateLimiter);

// Routes
app.get('/', (req, res) => res.json({
  message: 'Jarvis Student Assistant API',
  version: '1.0.0',
  endpoints: ['/healthz', '/tasks', '/notes', '/classes', '/chat', '/devices', '/jobs'],
  time: new Date().toISOString()
}));
app.get('/healthz', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use('/tasks', tasksRouter);
app.use('/notes', notesRouter);
app.use('/classes', classesRouter);
app.use('/chat', chatRouter);
app.use('/devices', devicesRouter);
app.use('/jobs', jobsRouter);

// Sockets
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

// MQTT (optional)
initMqtt(app).catch(err => console.warn('MQTT init failed:', err.message));

server.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
});

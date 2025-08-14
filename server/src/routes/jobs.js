import { Router } from 'express';
import { config } from '../config.js';

const r = Router();

r.post('/run-due-reminders', async (req, res) => {
  if (req.query.cron_key !== config.cronKey) return res.status(401).json({ error: 'bad key' });
  // TODO: check tasks with dueAt < now + window and emit socket events
  const io = req.app.get('io');
  io.emit('notify:reminder', { message: 'This is a demo reminder', at: new Date().toISOString() });
  res.json({ ok: true });
});

export default r;

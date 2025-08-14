import { Router } from 'express';
const r = Router();

// minimal stub to demonstrate structure
r.get('/', async (req, res) => {
  res.json([]);
});

r.post('/:id/command', async (req, res) => {
  // publish to MQTT here if configured
  res.json({ ok: true });
});

export default r;

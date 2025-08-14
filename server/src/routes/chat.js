import { Router } from 'express';
import { respondLLM } from '../services/llm.js';

const r = Router();

r.post('/message', async (req, res) => {
  const { text } = req.body || {};
  const reply = await respondLLM(req.user, text || '');
  res.json({ reply });
});

export default r;

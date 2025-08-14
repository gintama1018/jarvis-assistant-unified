import { Router } from 'express';
import Task from '../models/Task.js';

const r = Router();

r.get('/', async (req, res) => {
  const docs = await Task.find({ userId: req.user.uid }).sort({ createdAt: -1 });
  res.json(docs);
});

r.post('/', async (req, res) => {
  const doc = await Task.create({ ...req.body, userId: req.user.uid });
  res.json(doc);
});

r.put('/:id', async (req, res) => {
  const doc = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user.uid }, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

r.delete('/:id', async (req, res) => {
  const done = await Task.deleteOne({ _id: req.params.id, userId: req.user.uid });
  res.json({ ok: true, deleted: done.deletedCount });
});

export default r;

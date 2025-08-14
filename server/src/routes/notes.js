import { Router } from 'express';
import Note from '../models/Note.js';

const r = Router();

r.get('/', async (req, res) => {
  const docs = await Note.find({ userId: req.user.uid }).sort({ updatedAt: -1 });
  res.json(docs);
});

r.post('/', async (req, res) => {
  const doc = await Note.create({ ...req.body, userId: req.user.uid });
  res.json(doc);
});

r.put('/:id', async (req, res) => {
  const doc = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.uid }, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

r.delete('/:id', async (req, res) => {
  const done = await Note.deleteOne({ _id: req.params.id, userId: req.user.uid });
  res.json({ ok: true, deleted: done.deletedCount });
});

export default r;

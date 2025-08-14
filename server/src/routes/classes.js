import { Router } from 'express';
import ClassModel from '../models/Class.js';

const r = Router();

r.get('/', async (req, res) => {
  const docs = await ClassModel.find({ userId: req.user.uid }).sort({ createdAt: -1 });
  res.json(docs);
});

r.post('/', async (req, res) => {
  const doc = await ClassModel.create({ ...req.body, userId: req.user.uid });
  res.json(doc);
});

r.put('/:id', async (req, res) => {
  const doc = await ClassModel.findOneAndUpdate({ _id: req.params.id, userId: req.user.uid }, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

r.delete('/:id', async (req, res) => {
  const done = await ClassModel.deleteOne({ _id: req.params.id, userId: req.user.uid });
  res.json({ ok: true, deleted: done.deletedCount });
});

export default r;

import { config } from '../config.js';

const buckets = new Map(); // naive in-memory, fine for demo

export const rateLimiter = (req, res, next) => {
  const key = (req.user?.uid || 'anon') + ':' + (req.ip || '');
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, resetAt: now + config.rateLimitWindowMs };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + config.rateLimitWindowMs;
  }
  bucket.count += 1;
  buckets.set(key, bucket);
  if (bucket.count > config.rateLimitMax) {
    return res.status(429).json({ error: 'rate limit exceeded' });
  }
  next();
};

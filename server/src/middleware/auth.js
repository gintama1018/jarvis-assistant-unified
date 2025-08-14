import admin from 'firebase-admin';
import { config } from '../config.js';

let firebaseReady = false;
if (!config.demoMode && config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey
      })
    });
    firebaseReady = true;
    console.log('Firebase Admin initialized');
  } catch (e) {
    console.warn('Firebase Admin init failed, running without strict auth:', e.message);
  }
}

export const authMiddleware = async (req, res, next) => {
  if (config.demoMode) {
    // demo user
    req.user = { uid: 'demo-user', email: 'demo@example.com' };
    return next();
  }
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing auth token' });
  if (!firebaseReady) return res.status(500).json({ error: 'Auth not configured' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

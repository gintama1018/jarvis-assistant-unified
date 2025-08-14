import { config } from '../config.js';

export const respondLLM = async (user, text) => {
  // For demo: local deterministic replies; plug in OpenAI/Gemini if keys are set.
  if (!text || text.trim() === '') return "Hi! Ask me about your classes, tasks, or say 'help'.";
  const t = text.toLowerCase();
  if (t.includes('help')) {
    return "You can say: 'list my tasks', 'add task DSA assignment', or 'what's my next class?'";
  }
  if (t.includes('next class')) {
    return "Your next class is Data Structures at 2:00 PM in Room 204. (Demo reply)";
  }
  if (t.startsWith('add task')) {
    return "Okay, I will add that task. (Demo reply — connect to /tasks to persist)";
  }
  return `You said: "${text}". (Demo assistant reply)`;
};

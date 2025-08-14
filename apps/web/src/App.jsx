import React, { useEffect, useState } from 'react';
import api, { setAuthToken } from './api/client';
import { io } from 'socket.io-client';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [socketMsg, setSocketMsg] = useState('');

  useEffect(() => {
    // DEMO: no token required (server DEMO_MODE=true)
    setAuthToken(null);

    api.get('/tasks').then(r => setTasks(r.data));
    api.get('/notes').then(r => setNotes(r.data));

    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000');
    socket.on('notify:reminder', payload => setSocketMsg(`Reminder: ${payload.message}`));
    return () => socket.disconnect();
  }, []);

  const addTask = async (title) => {
    const r = await api.post('/tasks', { title, dueAt: new Date() });
    setTasks([r.data, ...tasks]);
  };

  const addNote = async (title) => {
    const r = await api.post('/notes', { title, content: 'New note' });
    setNotes([r.data, ...notes]);
  };

  const sendChat = async () => {
    if (!message.trim()) return;
    setChat(c => [...c, { role: 'user', text: message }]);
    const r = await api.post('/chat/message', { text: message });
    setChat(c => [...c, { role: 'assistant', text: r.data.reply }]);
    setMessage('');
  };

  return (
    <div>
      <header>
        <h3>Jarvis Student Assistant</h3>
        <small className="muted">{socketMsg}</small>
      </header>
      <div className="container grid grid-2">
        <div className="card">
          <h2>Tasks</h2>
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            <input placeholder="New task title" id="taskTitle" />
            <button onClick={() => {
              const el = document.getElementById('taskTitle');
              addTask(el.value); el.value='';
            }}>Add</button>
          </div>
          {tasks.map(t => (
            <div key={t._id} className="card" style={{ padding:10, marginBottom:8 }}>
              <b>{t.title}</b>
              <div><small className="muted">{new Date(t.createdAt).toLocaleString()}</small></div>
            </div>
          ))}
        </div>
        <div className="card">
          <h2>Notes</h2>
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            <input placeholder="New note title" id="noteTitle" />
            <button onClick={() => {
              const el = document.getElementById('noteTitle');
              addNote(el.value); el.value='';
            }}>Add</button>
          </div>
          {notes.map(n => (
            <div key={n._id} className="card" style={{ padding:10, marginBottom:8 }}>
              <b>{n.title}</b>
              <div><small className="muted">{new Date(n.updatedAt).toLocaleString()}</small></div>
            </div>
          ))}
        </div>
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>Chat (Demo)</h2>
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            <input
              placeholder="Say something..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key==='Enter' && sendChat()}
            />
            <button onClick={sendChat}>Send</button>
          </div>
          <div>
            {chat.map((m, i) => (
              <div key={i} style={{ marginBottom:8 }}>
                <b>{m.role === 'user' ? 'You' : 'Jarvis'}:</b> {m.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

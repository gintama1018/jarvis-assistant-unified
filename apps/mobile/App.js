import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

const API = axios.create({ baseURL: process.env.API_BASE_URL || 'http://10.0.2.2:4000' });

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get('/tasks').then(r => setTasks(r.data)).catch(() => {});
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    const r = await API.post('/tasks', { title });
    setTasks(prev => [r.data, ...prev]);
    setTitle('');
  };

  const sendChat = async () => {
    if (!msg.trim()) return;
    setChat(c => [...c, { role:'user', text: msg }]);
    const r = await API.post('/chat/message', { text: msg });
    setChat(c => [...c, { role:'assistant', text: r.data.reply }]);
    setMsg('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Jarvis Student Assistant</Text>
      <View style={styles.card}>
        <Text style={styles.h2}>Tasks</Text>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="New task" value={title} onChangeText={setTitle} />
          <Button title="Add" onPress={addTask} />
        </View>
        <FlatList
          data={tasks}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.muted}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.h2}>Chat (Demo)</Text>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="Say something..." value={msg} onChangeText={setMsg} />
          <Button title="Send" onPress={sendChat} />
        </View>
        <FlatList
          data={chat}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text><Text style={{fontWeight:'700'}}>{item.role === 'user' ? 'You' : 'Jarvis'}:</Text> {item.text}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Constants.statusBarHeight, paddingHorizontal: 12, backgroundColor: '#0b0c10' },
  h1: { color: '#e6e6e6', fontSize: 22, marginBottom: 12 },
  h2: { color: '#e6e6e6', fontSize: 18, marginBottom: 8 },
  card: { backgroundColor: '#111217', borderRadius: 12, padding: 12, marginBottom: 12, borderColor:'#2b2f3a', borderWidth:1 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, backgroundColor: '#12141a', color:'#e6e6e6', padding: 10, borderRadius: 8, borderColor:'#2b2f3a', borderWidth:1 },
  item: { paddingVertical: 8, borderBottomColor:'#22252f', borderBottomWidth: 1 },
  itemTitle: { color: '#e6e6e6', fontSize: 16 },
  muted: { color: '#a0a0a0', fontSize: 12 }
});

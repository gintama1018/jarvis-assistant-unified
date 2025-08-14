import mqtt from 'mqtt';
import { config } from '../config.js';

let client = null;

export const initMqtt = async (app) => {
  if (!config.mqtt.url) {
    console.log('MQTT not configured, skipping.');
    return;
  }
  client = mqtt.connect(config.mqtt.url, {
    username: config.mqtt.user,
    password: config.mqtt.pass
  });
  client.on('connect', () => console.log('MQTT connected'));
  client.on('error', (e) => console.warn('MQTT error', e.message));
  // Example subscription
  // client.subscribe('users/+/device/+/state');
  // client.on('message', (topic, payload) => {
  //   const io = app.get('io');
  //   io.emit('iot:stateChanged', { topic, payload: payload.toString() });
  // });
};

export const publish = (topic, message) => {
  if (!client) return;
  client.publish(topic, message);
};

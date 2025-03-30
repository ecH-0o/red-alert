import express from 'express';
import { VK } from 'vk-io';
import admin from 'firebase-admin';
import 'dotenv/config';

const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!base64Key) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT not set');
}
const serviceAccount = JSON.parse(
  Buffer.from(base64Key, 'base64').toString('utf8')
);
// Инициализируем Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://red-alert-1748e.firebaseio.com'  // замените на URL вашей базы
});
const app = express();

// Если используете Firestore:
const db = admin.firestore();

// Инициализируйте vk-io с токеном сообщества.
// Рекомендуется хранить токен в переменной окружения (VK_TOKEN)
const vk = new VK({
  token: process.env.VK_TOKEN || 'placeholder'
});

// Обработчик новых сообщений через Long Poll API
vk.updates.on('message_new', async (context) => {
  console.log(`Получено сообщение от peer_id ${context.peerId}: ${context.text}`);

  // Если текст равен 'a' (без учета регистра), отправляем ответ
  if (context.text && context.text.toLowerCase() === 'a') {
     // Запрос данных из коллекции (замените 'your_collection_name' на имя вашей коллекции)
     const snapshot = await db.collection('users').get();
      
     let result = '';
     snapshot.forEach(doc => {
       result += `${doc.data}`;
     });

     if (!result) {
       result = 'База пуста.';
     }
    try {
      await context.send(result);
      console.log(`Ответ отправлен в чат с peer_id ${context.peerId}`);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  }
});

// Запуск Long Poll
vk.updates.start().catch(console.error);

// Добавляем простой HTTP-сервер для работы на Railway.
// Railway требует, чтобы приложение слушало порт (из переменной окружения PORT).
app.get('/', (req, res) => {
  res.send('Bot is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express-сервер запущен на порту ${PORT}`);
});

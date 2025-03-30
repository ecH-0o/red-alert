import express from 'express';
import { VK } from 'vk-io';
import admin from 'firebase-admin';

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

const keyboard = {
  one_time: false, // клавиатура останется на экране после нажатия кнопки
  buttons: [
    [
      {
        action: {
          type: 'text',
          payload: JSON.stringify({ action: 'show_details' }),
          label: 'нажать'
        },
        color: 'primary'
      },
    ]
  ]
};


// Обработчик новых сообщений через Long Poll API
vk.updates.on('message_new', async (context) => {
  console.log(`Получено сообщение от peer_id ${context.peerId}: ${context.text}`);
  const payload = context.messagePayload; // или context.getMessagePayload()
  // Если текст равен 'a' (без учета регистра), отправляем ответ
  if (context.text && context.text.startsWith('ф')) {
    
    try {
      await context.send({
        message: 'жми на рычаг',
        keyboard: JSON.stringify(keyboard)
      });
      console.log(`Ответ отправлен в чат с peer_id ${context.peerId}`);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  }
  // Если пришло сообщение с payload (нажатие на кнопку)
  if (payload && payload.action === 'show_details') {
    let message = ''
    await db.collection('users').where("vkID", "==", context.senderId).get().then(async (user: any) => {
      console.log(user);
      if (user) {
        message+= `Участник: [id${context.senderId}|${user[0].name}]`;
        message+= `\n\nРоль: ${user[0].role}ㅤ★ㅤ${user[0].fandom.name}]`;
        message+= `\n\nТекущая локация: ${user[0].current_location.location} в регионе ${user[0].current_location.globalLocation.name}]`;
      }
    });
    await context.send(message);
    return;
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

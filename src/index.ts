import express from 'express';
import { VK } from 'vk-io';

const app = express();

// Инициализируйте vk-io с токеном сообщества.
// Рекомендуется хранить токен в переменной окружения (VK_TOKEN)
const vk = new VK({
  token: process.env.VK_TOKEN || 'vk1.a.I9jMXprw-Y2n9jD1QrtPG5-OT3kblogrwDOpIkRNgPV3BIJBvn83ocWePJIhMEJeFnepm4qnFePrgJKouzCsbLZ4PYtJwBad9pRZuRRlj6kZ0alUhEcDKx3lZgqEuVnm0urJiQMOsmegTFnvmudv4_u2fPPiKYkby3g1MMyKJX3bQGsg_e2PSIMmOVLc2TJRvUnikKBMtsRtmnqVqohBdA'
});

// Обработчик новых сообщений через Long Poll API
vk.updates.on('message_new', async (context) => {
  console.log(`Получено сообщение от peer_id ${context.peerId}: ${context.text}`);

  // Если текст равен 'a' (без учета регистра), отправляем ответ
  if (context.text && context.text.toLowerCase() === 'a') {
    try {
      await context.send('Ответ от Long Poll API в беседе!');
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

import { VK } from 'vk-io';
import { Request, Response } from 'express';


const express = require('express');
const bodyParser = require('body-parser');

// ВАЖНО: это ваш confirmation код, который ВК требует вернуть
const confirmationCode = '7c112053';

const app = express();
app.use(bodyParser.json()); // парсим JSON-тело

app.post('/api/callback', async (req: Request, res: Response) => {
  // Здесь req.body — входные данные
  // можно "привести" к интерфейсу CallbackRequestBody, если надо:
  // const body = req.body as CallbackRequestBody;

  const a: string = confirmationCode;

  // Указываем Content-Type: text/plain, чтобы вернуть чистую строку без кавычек
  res.type('text/plain');
  return res.send(a);
});
// app.post('/callback/vk', (req: Request, res: Response) => {
//   const { type, group_id } = req.body;

//   // Проверяем, что ВК шлёт запрос подтверждения
//   if (type === 'confirmation') {
//     // Можем дополнительно сверить group_id
//     if (group_id === 229906938) {
//       // Возвращаем тот самый confirmationCode
//       return res.send(confirmationCode);
//     } else {
//       return res.sendStatus(403);
//     }
//   }

//   // Если это не "confirmation", значит событие реальное (например, message_new)
//   // Обработка...
  
//   // По правилам ВК нужно отвечать "ok"
//   return res.send('ok');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// const vk = new VK({
//   token: 'vk1.a.Aa8fXGArMpnErXAZU-plD2BgXEPWktN7wukiRbLejwR11DxeuEPshJPv0Agi1uBMzyu-GyNO6kmx6xpEedk7CSiMHflwBubk5xf13IlOcAJNBzt49UL_5ecZrDPHn2ELK_cQtZROAhyatYlu9ItFajrfzSGlfLVZkaggYCee0slTapMNrww2894nPug1xIyq5FFRCB20aoPhRm-C3ETyfw'
// });

// // Запускаем longpoll
// vk.updates.start().catch(console.error);

// vk.updates.on('message_new', async (context, next) => {
//   // При получении нового сообщения отвечаем "Hello World!"
//   await context.send('Hello World!');
// });

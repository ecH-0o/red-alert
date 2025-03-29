import { VK } from 'vk-io';
import { Request, Response } from 'express';


const express = require('express');
const bodyParser = require('body-parser');

// ВАЖНО: это ваш confirmation код, который ВК требует вернуть
const confirmationCode = '7c112053';

const app = express();
app.use(bodyParser.json()); // парсим JSON-тело

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post('/callback/vk', (req: Request, res: Response) => {
      return res.send(confirmationCode);
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

import { Request, Response } from 'express';
import { VK } from 'vk-io';
const express = require('express');
const app = express();
app.use(express.json());

const vk = new VK({
  token: 'vk1.a.Aa8fXGArMpnErXAZU-plD2BgXEPWktN7wukiRbLejwR11DxeuEPshJPv0Agi1uBMzyu-GyNO6kmx6xpEedk7CSiMHflwBubk5xf13IlOcAJNBzt49UL_5ecZrDPHn2ELK_cQtZROAhyatYlu9ItFajrfzSGlfLVZkaggYCee0slTapMNrww2894nPug1xIyq5FFRCB20aoPhRm-C3ETyfw'
});

// Токены
const confirmationToken = '7c112053';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  if (!data || !data.type) {
    return res.end();
  }

  switch (data.type) {
    case 'confirmation':
      return res.send(confirmationToken);
    case 'message_new':
      const text = data.object?.message?.text?.toLowerCase();
      if (text === 'a') {
        await vk.api.messages.send({
          peer_id: data.object.message.peer_id,
          message: 'Ответ по Callback API',
          random_id: Date.now()
        });
      }
      return res.end('ok');
    default:
      return res.end('ok');
  }
});


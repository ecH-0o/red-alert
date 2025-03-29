import { Request, Response } from 'express';
import { VK } from 'vk-io';
const express = require('express');
const app = express();
app.use(express.json());

const vk = new VK({
  token: 'vk1.a.Aa8fXGArMpnErXAZU-plD2BgXEPWktN7wukiRbLejwR11DxeuEPshJPv0Agi1uBMzyu-GyNO6kmx6xpEedk7CSiMHflwBubk5xf13IlOcAJNBzt49UL_5ecZrDPHn2ELK_cQtZROAhyatYlu9ItFajrfzSGlfLVZkaggYCee0slTapMNrww2894nPug1xIyq5FFRCB20aoPhRm-C3ETyfw'
});

const confirmationToken = '7c112053';

app.post('/', async (req: Request, res: Response) => {
  console.log('Request received:', req.body);
  const { type, object } = req.body;
  if (!type) return res.end();

  if (type === 'confirmation') {
    console.log('Confirmation request');
    return res.send(confirmationToken);
  }

  if (type === 'message_new') {
    console.log('New message event:', object);
    const text = object?.message?.text?.toLowerCase();
    if (text === 'a') {
      try {
        await vk.api.messages.send({
          peer_id: object.message.peer_id,
          message: 'Ответ по Callback API',
          random_id: Date.now()
        });
        console.log('Message sent successfully.');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    return res.end('ok');
  }
  return res.end('ok');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { Request, Response } from 'express';
const express = require('express');
const app = express();
app.use(express.json());

// Токены
const confirmationToken = '7c112053';

// Обработка входящих запросов
app.post('/callback', (req: Request, res: Response) => {
  const data = req.body;

  if (!data || !data.type) {
    // Если нет "type", просто завершаем
    return res.end();
  }

  switch (data.type) {
    case 'confirmation':
      // Возвращаем строку для подтверждения (confirmationToken)
      return res.send("sdfksdjflksdjfsldkfjsl");
    default:
      // Если пришёл неизвестный тип, отвечаем чем-то формальным
      return res.end('ok');
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

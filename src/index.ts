import { Request, Response } from 'express';
const express = require('express');
const app = express();
app.use(express.json());

// Токены
const confirmationToken = '7c112053';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Обработка входящих запросов
app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  const data = req.body;

  if (!data || !data.type) {
    // Если нет "type", просто завершаем
    return res.end();
  }

  switch (data.type) {
    case 'confirmation':
      // Возвращаем строку для подтверждения (confirmationToken)
      return res.send(confirmationToken);
    default:
      // Если пришёл неизвестный тип, отвечаем чем-то формальным
      return res.end('ok');
  }
});



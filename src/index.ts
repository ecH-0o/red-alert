import { VK } from 'vk-io';

const vk = new VK({
  token: 'vk1.a.Aa8fXGArMpnErXAZU-plD2BgXEPWktN7wukiRbLejwR11DxeuEPshJPv0Agi1uBMzyu-GyNO6kmx6xpEedk7CSiMHflwBubk5xf13IlOcAJNBzt49UL_5ecZrDPHn2ELK_cQtZROAhyatYlu9ItFajrfzSGlfLVZkaggYCee0slTapMNrww2894nPug1xIyq5FFRCB20aoPhRm-C3ETyfw'
});

// Запускаем longpoll
vk.updates.start().catch(console.error);

vk.updates.on('message_new', async (context, next) => {
  // При получении нового сообщения отвечаем "Hello World!"
  await context.send('Hello World!');
});

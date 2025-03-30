// const mentionRegex = /\[id(\d+)\|[^\]]+\]/g;
// let context:any;
// let result = '';
// const matches = context.text.match(mentionRegex);
// if (matches) {
//       matches.forEach((match: any) => {
//         const [, id] = match.match(/\[id(\d+)\|/) || [];
//         result = 'Упомянутый ID: ' + id;
//       });
//     }
//     //  // Запрос данных из коллекции (замените 'your_collection_name' на имя вашей коллекции)
//     //  const snapshot = await db.collection('users').where(
//     //   "vkID", "==", context.senderId
//     //  ).get();
//     // //const user = await vk.api.users.get({user_ids: [context.senderId]})
//     //  let result = '';
//     //  if (user.length > 0) {
//     //   result += context.text;
//     //   result += JSON.stringify(user[0]);
//     //  }
//     // //  snapshot.forEach(doc => {
      
//     // //  });

//     //  if (!result) {
//     //    result = 'База пуста.';
//     //  }



//     const keyboard = {
//         one_time: false, // клавиатура останется на экране после нажатия кнопки
//         buttons: [
//           [
//             {
//               action: {
//                 type: 'text',
//                 payload: JSON.stringify({ action: 'show_details' }),
//                 label: 'нажать'
//               },
//               color: 'primary'
//             },
//           ]
//         ]
//       };
      
//       const payload = context.messagePayload; // или context.getMessagePayload()
//       if (context.text && context.text.startsWith('ф')) {

//         try {
//           await context.send({
//             message: 'жми на рычаг',
//             keyboard: JSON.stringify(keyboard)
//           });
//           console.log(`Ответ отправлен в чат с peer_id ${context.peerId}`);
//         } catch (error) {
//           console.error('Ошибка при отправке сообщения:', error);
//         }
//       }
//       // Если пришло сообщение с payload (нажатие на кнопку)
//       if (payload && payload.action === 'show_details') {
//         let message = '';
//         const snapshot = await db
//           .collection('users')
//           .where('vkID', '==', context.senderId)
//           .get();
    
//         if (!snapshot.empty) {
//           // Берем первый документ и получаем данные
//           const userData = snapshot.docs[0].data();
//           console.log(userData);
    
//           // Получаем данные из DocumentReference для fandom
//           let fandomData: any = {};
//           if (userData.fandom && typeof userData.fandom.get === 'function') {
//             const fandomSnap = await userData.fandom.get();
//             fandomData = fandomSnap.data() || {};
//           }
    
//           // Получаем данные из DocumentReference для current_location
//           let locationData: any = {};
//           if (userData.current_location && typeof userData.current_location.get === 'function') {
//             const locationSnap = await userData.current_location.get();
//             locationData = locationSnap.data() || {};
//           }
    
//           // Получаем документ глобальной локации (из поля locationData.global_location)
//           let globalLocationData: any = {};
//           if (locationData.globalLocation) {
//             const globalLocationSnap = await locationData.globalLocation.get();
//             globalLocationData = globalLocationSnap.data() || {};
//           }
    
//           message += `Участник: [id${context.senderId}|${userData.name}]\n\n`;
//           message += `Роль: ${userData.role} ㅤ★ㅤ ${fandomData.name || 'Нет данных'}\n\n`;
//           message += `Текущая локация: ${locationData.location || 'Мы не знаем'} в регионе ${globalLocationData.name || 'мы не знаем'}`;
//         } else {
//           message = 'Пользователь не найден в базе.';
//         }
    
//         await context.send(message);
//         return;}

// export { };

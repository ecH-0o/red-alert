const mentionRegex = /\[id(\d+)\|[^\]]+\]/g;
let context:any;
let result = '';
const matches = context.text.match(mentionRegex);
if (matches) {
      matches.forEach((match: any) => {
        const [, id] = match.match(/\[id(\d+)\|/) || [];
        result = 'Упомянутый ID: ' + id;
      });
    }
    //  // Запрос данных из коллекции (замените 'your_collection_name' на имя вашей коллекции)
    //  const snapshot = await db.collection('users').where(
    //   "vkID", "==", context.senderId
    //  ).get();
    // //const user = await vk.api.users.get({user_ids: [context.senderId]})
    //  let result = '';
    //  if (user.length > 0) {
    //   result += context.text;
    //   result += JSON.stringify(user[0]);
    //  }
    // //  snapshot.forEach(doc => {
      
    // //  });

    //  if (!result) {
    //    result = 'База пуста.';
    //  }
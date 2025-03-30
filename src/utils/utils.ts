

export const getData = async (db: any, context: any, userId: any): Promise<string> => {
    let message = '';
    const snapshot = await db
      .collection('users')
      .where('vkID', '==', userId)
      .get();

    if (!snapshot.empty) {
      // Берем первый документ и получаем данные
      const userData = snapshot.docs[0].data();
      console.log(userData);

      // Получаем данные из DocumentReference для fandom
      let fandomData: any = {};
      if (userData.fandom && typeof userData.fandom.get === 'function') {
        const fandomSnap = await userData.fandom.get();
        fandomData = fandomSnap.data() || {};
      }

      // Получаем данные из DocumentReference для current_location
      let locationData: any = {};
      if (userData.current_location && typeof userData.current_location.get === 'function') {
        const locationSnap = await userData.current_location.get();
        locationData = locationSnap.data() || {};
      }

      // Получаем документ глобальной локации (из поля locationData.global_location)
      let globalLocationData: any = {};
      if (locationData.globalLocation) {
        const globalLocationSnap = await locationData.globalLocation.get();
        globalLocationData = globalLocationSnap.data() || {};
      }

      message += `Участник: [id${context.senderId}|${userData.name}]\n\n`;
      message += `Роль: ${userData.role} ㅤ★ㅤ ${fandomData.name || 'Нет данных'}\n\n`;
      message += `Текущая локация: ${locationData.location || 'Мы не знаем'}`;
      message += `Регион: ${globalLocationData.name || 'Мы не знаем'}`;

    } else {
      message = 'Пользователь не найден в базе.';
    }
    return message;
}
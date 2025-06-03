const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);

    client.user.setPresence({
      status: 'online',
      activities: [
        {
          name: 'Ban Yemiyorum Anlasana Kardeşim',
          type: ActivityType.Custom
        }
      ]
    });
  }
};

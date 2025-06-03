const { Events } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return interaction.reply({ content: "Komut bulunamadı." });
      cmd.execute(interaction, client);
      return;
    }

    if (interaction.isModalSubmit() && interaction.customId === "dmDuyuruModal") {
      const mesaj = interaction.fields.getTextInputValue("duyuruMesaji");

      const all = await interaction.guild.members.fetch();
      const kullanıcı = all.filter(m => !m.user.bot);
      const toplam = kullanıcı.size;

      const Kullanıcıarasıbekleme = 2000;
      const estTime = Math.ceil((toplam * Kullanıcıarasıbekleme + Math.floor(toplam / 100) * 60000 + Math.floor(toplam / 500) * 1200000) / 1000);

      const msg = await interaction.reply({
        content: `Başlatıldı.\nTahmini süre: **${estTime} saniye**\nİlerleme: 0 / ${toplam}`,
        fetchReply: true
      });

      let index = 0;
      let hatalikullanici = 0;
      const list = Array.from(kullanıcı.values());

      for (const u of list) {
        if (index !== 0 && index % 500 === 0) {
          await msg.edit({ content: `500 kullanıcıya gönderildi. 20dk bekleniyor... (${index}/${toplam})` });
          await new Promise(r => setTimeout(r, 20 * 60 * 1000));
        } else if (index !== 0 && index % 100 === 0) {
          await msg.edit({ content: `100 kullanıcıya gönderildi. 1dk bekleniyor... (${index}/${toplam})` });
          await new Promise(r => setTimeout(r, 60 * 1000));
        }

        try {
          await u.send({ content: mesaj });
          hatalikullanici = 0;
        } catch {
          hatalikullanici++;
          if (hatalikullanici >= 30) {
            await msg.edit({ content: `Bot Ban Yemiş Olabılır Kontrol Ediniz Gönderim durduruldu. (${index}/${toplam})` });
            return;
          }
        }

        index++;
        await msg.edit({ content: `Gönderiliyor...\nTahmini süre: **${estTime} saniye**\nİlerleme: (${index} / ${toplam})` });
        await new Promise(r => setTimeout(r, Kullanıcıarasıbekleme));
      }

      await msg.edit({ content: `Tüm mesajlar gönderildi. Toplam (**${toplam}**) Kullanıcıya Gönderildi` });
    }
  }
};

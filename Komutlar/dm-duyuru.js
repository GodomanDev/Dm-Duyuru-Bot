const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const { sahipID } = require('../Settings/ayarlar.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm-duyuru")
    .setDescription("Sunucudaki herkese özel mesaj gönderir.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
  if (interaction.user.id !== sahipID) {
    return interaction.reply({
      content: `<:nono:1350155288774316155> **Bu komutu sadece <@${sahipID}> kullanabilir.**`,
      ephemeral: true
    });
  }

    const modal = new ModalBuilder()
      .setCustomId("dmDuyuruModal")
      .setTitle("DM Duyuru Mesajı");

    const mesajInput = new TextInputBuilder()
      .setCustomId("duyuruMesaji")
      .setLabel("Gönderilecek Mesaj")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(mesajInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  }
};
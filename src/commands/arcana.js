const {SlashCommandBuilder} = require('discord.js');

const {arcani} = require("../arcani/arcani.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('arcana')
        .setDescription('Draw a card (minor and major cards)'),
    async execute(interaction) {
        n = Math.floor(Math.random() * 78);
        const card = arcani[n];
        await interaction.reply(`${card.icon}\n${card.card}`);
    },
};
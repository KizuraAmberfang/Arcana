const {SlashCommandBuilder} = require('discord.js');

const {arcani} = require("../arcani/arcani.js");
const { getMazzo, estraiMaggiore } = require('../common.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maggiore')
        .setDescription('Draw a major card'),
    async execute(interaction) {
        message = 'Error';
        const mazzo = getMazzo(interaction.user.id, interaction.guildId, interaction.channelId);
        if (!mazzo.sine) {
            n = Math.floor(Math.random() * 22);
            console.log(n);
            const card = arcani[n];
            console.log(card.card);
            message = `${card.icon}\n${card.card}`;
        }
        else {
            message = estraiMaggiore(mazzo);
        }
        await interaction.reply(message);
    },
};
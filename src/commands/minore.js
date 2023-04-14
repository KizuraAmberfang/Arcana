const {SlashCommandBuilder} = require('discord.js');

const {arcani} = require("../arcani/arcani.js");
const { estraiMinore, getMazzo } = require('../common.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minore')
        .setDescription('Draw a minor card'),
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
            message = estraiMinore(mazzo);
        }
        await interaction.reply(message);
    },
};
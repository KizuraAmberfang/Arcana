const {SlashCommandBuilder} = require('discord.js');
const { arcani } = require('../arcani/arcani');
const { getMazzo } = require('../common');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deck')
        .setDescription('verify the deck')
        .addStringOption(option => 
            option
                .setName('type')
                .setDescription('major / minor')
                .setRequired(false)
                .addChoices(
                    {name: "minor", value: "minor"},
                    {name: "major", value: "major"}
                )),
    async execute(interaction) {
        const opt = interaction.options.getString('type');
        mazzo = getMazzo(interaction.user.id, interaction.guildId, interaction.channelId);
        message = 'Error';
        if (!opt) {
            message = 'Ultimo arcano maggiore: ' + mazzo.lastCardMaj +"\nCarte rimanenti: " + mazzo.carteMaj.length;
            message += '\nUltimo arcano minore: ' + mazzo.lastCardMin +"\nCarte rimanenti: " + mazzo.carteMin.length;
        }
        else if (opt == "minor") {
            message = 'Ultimo arcano minore: ' + mazzo.lastCardMin +"\nCarte rimanenti: " + mazzo.carteMin.length;
        }
        else if (opt == "major") {
            message = 'Ultimo arcano maggiore: ' + mazzo.lastCardMaj +"\nCarte rimanenti: " + mazzo.carteMaj.length;
        }
        await interaction.reply(message);
    },
};
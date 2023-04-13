const {SlashCommandBuilder} = require('discord.js');
const { arcani } = require('../arcani/arcani');
const { getMazzo } = require('../common');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the deck')
        .addStringOption(option => 
            option
                .setName('deck')
                .setDescription('major / minor')
                .setRequired(false)
                .addChoices(
                    {name: "minor", value: "minor"},
                    {name: "major", value: "major"}
                )),
    async execute(interaction) {
        const opt = interaction.options.getString('deck');
        mazzo = getMazzo(interaction.user.id, interaction.guildId, interaction.channelId);
        message = 'Error';
        if (!opt) {
            mazzo.carteMaj = arcani.slice(0, 22);
            mazzo.carteMin = arcani.slice(22, 78);
            message = 'Ho rimescolato i mazzi';
        }
        else if (opt == "minor") {
            mazzo.carteMin = arcani.slice(22, 78);
            message = 'Ho rimescolato il mazzo dei minori';
        }
        else if (opt == "major") {
            mazzo.carteMaj = arcani.slice(0, 22);
            message = 'Ho rimescolato il mazzo dei maggiori';
        }
        await interaction.reply(message);
    },
};
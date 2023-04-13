const {SlashCommandBuilder} = require('discord.js');
const { arcani } = require('../arcani/arcani');
const { getMazzo } = require('../common');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sine')
        .setDescription('Able/Disable sine set of rules'),
    async execute(interaction) {
        message = 'Error';
        const mazzo = getMazzo(interaction.user.id, interaction.guildId, interaction.channelId);
        if (!mazzo.sine) {
            message = 'Rimescolamento del mazzo: Sine Requie.\n';
        }
        else {
            message = 'Rimescolamento del mazzo: nessuna regola.\n';
        }
        mazzo.sine = !mazzo.sine;
        mazzo.carteMaj = arcani.slice(0, 22);
        mazzo.carteMin = arcani.slice(22, 78);
        message += 'Ho rimescolato i mazzi';  
        await interaction.reply(message);
    },
};
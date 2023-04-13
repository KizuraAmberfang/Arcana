const { arcani } = require("./arcani/arcani");

const mazzi = new Map();

// l'idea e' che ogni user ha un sottoinsieme di gilde
// in cui ha chiamato il bot, e in ogni gilda ci sono 
// dei canali. Dobbiamo verificare se esiste un set
// di regole per quel canale.

// un mazzo sara' fatto cosi:
// carteMin
// carteMaj
// sine
// mazzi [id - gilde]

function newMazzo() {
    major = arcani.slice(0, 22);
    minor = arcani.slice(22, 78);
    const mazzo = {
        carteMaj : major,
        carteMin : minor,
        sine : true,
    }
    return mazzo; 
}

function newChannel(channels, channel) {
    console.log("Non e' presente questo channel");
    const mazzo = newMazzo();
    channels.set(channel, mazzo);
    return (mazzo);
}

function newGuild(guilds, guild, channel) {
    console.log("Non e' presente questa gilda");
    const newChannel = new Map();
    const mazzo = newMazzo();
    newChannel.set(channel, mazzo);
    guilds.set(guild, newChannel);
    return (mazzo);
}

function newUser(id, guild, channel) {
    console.log("Non e' presente questo user");
    const newGuilds = new Map();
    const newChannel = new Map();
    const mazzo = newMazzo()
    newChannel.set(channel, mazzo);
    newGuilds.set(guild, newChannel);
    mazzi.set(id, newGuilds);
    return (mazzo);
}

function getMazzo(id, guild, channel) {
    const guilds = mazzi.get(id);
    if (!guilds) {
        return (newUser(id, guild, channel));
    }
    const channels = guilds.get(guild);
    if (!channels) {
        return (newGuild(guilds, guild, channel));
    }
    const mazzo = channels.get(channel);
    if (!mazzo) {
        return (newMazzo(channels, channel))
    }
    return (mazzo);
}

function estraiMaggiore(mazzo) {
    message = ""
    n = mazzo.carteMaj.length;
    if (n == 0) {
        mazzo.carteMaj = arcani.slice(0, 22);
        n = length;
        message = "Il mazzo e' vuoto, rimescolo\n";
    }
    else {
        nCarta = Math.floor(Math.random() * n)
        card = mazzo.carteMaj[nCarta];
        message += `${card.icon}\n${card.card}`
        if (nCarta == 0) {
            message += ("\nRimescolo il mazzo dei maggiori");
            mazzo.carteMaj = arcani.slice(0, 22);
        } else {
        mazzo.carteMaj.splice(nCarta, 1);
        }
    }
    return (message);
}

function estraiMinore(mazzo) {
    message = ""
    n = mazzo.carteMaj.length;
    if (n == 0) {
        mazzo.carteMin = arcani.slice(22, 76) + 22;
        n = length;
        message = "Il mazzo e' vuoto, rimescolo\n";
    }
    else {
        nCarta = Math.floor(Math.random() * n)
        card = mazzo.carteMin[nCarta];
        message += `${card.icon}\n${card.card}`
        if (nCarta == 0) {
            message += ("\nRimescolo il mazzo dei minori");
            mazzo.carteMin = arcani.slice(0, 22);
        } else {
        mazzo.carteMin.splice(nCarta, 1);
        }
    }
    return (message);
}

module.exports = {
    getMazzo,
    estraiMaggiore,
    estraiMinore
}
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    primaryCommand = primaryCommand.toLowerCase();
    
    switch (primaryCommand) {
        case 'arcana':
            receivedMessage.channel.send(receivedMessage.author.toString() + " " + arcana(0));
            break;
        case 'minore':
            receivedMessage.channel.send(receivedMessage.author.toString() + " " + arcana(2));
            break;
        case 'maggiore':
            receivedMessage.channel.send(receivedMessage.author.toString() + " " + arcana(1));
            break;
    }

}

function arcana(x) {
    switch (x) {
        case 0:
            n = Math.floor(Math.random() * 78);
            break;
        case 1:
            n = Math.floor(Math.random() * 22);
            break;
        case 2:
            n = Math.floor(Math.random() * 56) + 22;
            break;
    }
    switch (n) {
        case 0:
            str = '\n:black_joker: \nIl Matto';
            break;
        case 1:
            str = '\n:mage: \nIl Bagatto';
            break;
        case 2:
            str = '\n:woman_singer: \nLa Papessa';
            break;
        case 3:
            str = '\n:ring: \nL\'Imperatrice';
            break;
        case 4:
            str = '\n:crown: \nL\'Imperatore';
            break;
        case 5:
            str = '\n:place_of_worship: \nIl Papa';
            break;
        case 6:
            str = '\n:revolving_hearts: \nGli Amanti';
            break;
        case 7:
            str = '\n:auto_rickshaw: \nIl Carro';
            break;
        case 8:
            str = '\n:classical_building: \nLa Giustizia';
            break;
        case 9:
            str = '\n:mount_fuji: \nL\'Eremita';
            break;
        case 10:
            str = '\n:wheel_of_dharma:\nLa Ruota';
            break;
        case 11:
            str = '\n:muscle: \nLa Forza';
            break;
        case 12:
            str = '\n:upside_down: \nL\'Appeso';
            break;
        case 13:
            str = '\n:skull_crossbones: \nLa Morte';
            break;
        case 14:
            str = '\n:sake: \nLa Temperanza';
            break;
        case 15:
            str = '\n:smiling_imp: \nIl Diavolo';
            break;
        case 16:
            str = '\n:night_with_stars: \nLa Torre';
            break;
        case 17:
            str = '\n:sparkles: \nLe Stelle';
            break;
        case 18:
            str = '\n:crescent_moon: \nLa Luna';
            break;
        case 19:
            str = '\n:sunny: \nIl Sole';
            break;
        case 20:
            str = '\n:scales: \nIl Giudizio';
            break;
        case 21:
            str = '\n:earth_africa: \nIl Mondo';
            break;
        case 22:
            str = '\n:one::crossed_swords: \nAsso di Spade';
            break;
        case 23:
            str = '\n:two::crossed_swords: \nDue di Spade';
            break;
        case 24:
            str = '\n:three::crossed_swords: \nTre Spade';
            break;
        case 25:
            str = '\n:four::crossed_swords: \nQuattro di Spade';
            break;
        case 26:
            str = '\n:five::crossed_swords: \nCinque di Spade';
            break;
        case 27:
            str = '\n:six::crossed_swords: \nSei di Spade';
            break;
        case 28:
            str = '\n:seven::crossed_swords: \nSette di Spade';
            break;
        case 29:
            str = '\n:eight::crossed_swords: \nOtto di Spade';
            break;
        case 30:
            str = '\n:nine::crossed_swords: \nNove di Spade';
            break;
        case 31:
            str = '\n:one::zero::crossed_swords: \nDieci di Spade';
            break;
        case 32:
            str = '\n:crossed_swords::chess_pawn: \nFante di Spade';
            break;
        case 33:
            str = '\n:horse::crossed_swords: \nCavallo di Spade';
            break;
        case 34:
            str = '\n:crown::crossed_swords: \nRe di Spade';
            break;
        case 35:
            str = '\n:one::beer: \nAsso di Coppe';
            break;
        case 36:
            str = '\n:two::beers:\nDue di Coppe';
            break;
        case 37:
            str = '\n:three::beers:\nTre di Coppe';
            break;
        case 38:
            str = '\n:four::beers:\nQuattro di Coppe';
            break;
        case 39:
            str = '\n:five::beers:\nCinque di Coppe';
            break;
        case 40:
            str = '\n:six::beers:\nSei di Coppe';
            break;
        case 41:
            str = '\n:seven::beers:\nSette di Coppe';
            break;
        case 42:
            str = '\n:eight::beers:\nOtto di Coppe';
            break;
        case 43:
            str = '\n:nine::beers:\nNove di Coppe';
            break;
        case 44:
            str = '\n:one::zero::beers:\nDieci di Coppe';
            break;
        case 45:
            str = '\n:beer::chess_pawn:\nFante di Coppe';
            break;
        case 46:
            str = '\n:horse::beer:\nCavallo di Coppe';
            break;
        case 47:
            str = '\n:crown::beer:\nRe di Coppe';
            break;
        case 48:
            str = '\n:one::moneybag:\nAsso di Denari';
            break;
        case 49:
            str = '\n:two::moneybag:\nDue di Denari';
            break;
        case 50:
            str = '\n:three::moneybag:\nTre di Denari';
            break;
        case 51:
            str = '\n:four::moneybag:\nQuattro di Denari';
            break;
        case 52:
            str = '\n:five::moneybag:\nCinque di Denari';
            break;
        case 53:
            str = '\n:six::moneybag:\nSei di Denari';
            break;
        case 54:
            str = '\n:seven::moneybag:\nSette di Denari';
            break;
        case 55:
            str = '\n:eight::moneybag:\nOtto di Denari';
            break;
        case 56:
            str = '\n:nine::moneybag:\nNove di Denari';
            break;
        case 57:
            str = '\n:one::zero::moneybag:\nDieci di Denari';
            break;
        case 58:
            str = '\n:moneybag::chess_pawn:\nFante di Denari';
            break;
        case 59:
            str = '\n:horse::moneybag:\nCavallo di Denari';
            break;
        case 60:
            str = '\n:crown::moneybag:\nRe di Denari';
            break;
        case 61:
            str = '\n:one::french_bread:\nAsso di Bastoni';
            break;
        case 62:
            str = '\n:two::french_bread:\nDue di Bastoni';
            break;
        case 63:
            str = '\n:three::french_bread:\nTre di Bastoni';
            break;
        case 64:
            str = '\n:four::french_bread:\nQuattro di Bastoni';
            break;
        case 65:
            str = '\n:five::french_bread:\nCinque di Bastoni';
            break;
        case 66:
            str = '\n:six::french_bread:\nSei di Bastoni';
            break;
        case 67:
            str = '\n:seven::french_bread:\nSette di Bastoni';
            break;
        case 68:
            str = '\n:eight::french_bread:\nOtto di Bastoni';
            break;
        case 69:
            str = '\n:nine::french_bread:\nNove di Bastoni';
            break;
        case 70:
            str = '\n:one::zero::french_bread:\nDieci di Bastoni';
            break;
        case 71:
            str = '\n:french_bread::chess_pawn:\nFante di Bastoni';
            break;
        case 72:
            str = '\n:horse::french_bread:\nCavallo di Bastoni';
            break;
        case 73:
            str = '\n:princess::crossed_swords:\nRegina di Spade';
            break;
        case 74:
            str = '\n:princess::beer:\nRegina di Coppe';
            break;
        case 75:
            str = '\n:princess::moneybag:\nRegina di Denari';
            break;
        case 76:
            str = '\n:princess::french_bread:\nRegina di Bastoni';
            break;
        case 77:
            str = '\n:crown::french_bread:\nRe di Bastoni';
            break;
    }
    return str;
}

client.login(process.env.BOT_TOKEN);

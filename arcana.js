const Discord = require('discord.js')
const client = new Discord.Client()
const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODM2NDYwNDM3NTY5NTM3MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg5NDQ4NDgyfQ.OeLaG-FEPfUmvrIhSfcVcs_67PA-ydxyDEcd0MEfU8s', client);

// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

const mazzi = new Map();

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (!receivedMessage.content.startsWith("?")) {
        return
    }
  
    const chiaveMazzo = receivedMessage.guild.id + receivedMessage.author.id

    mazzoTrovato = mazzi.get(chiaveMazzo);

    if (!mazzoTrovato) {
        var major = new Array
        var minor = new Array
        major = ini_maggiore(major);
        minor = ini_minore(minor);
        const mazziConstruct = {
            mazzoMaggioreSine: major,
            mazzoMinoreSine: minor,
            mazzoEtmkUno: major,
            mazzoEtmkDue: major,
            sine: true,
            etemenanki: false
        };

        mazzi.set(chiaveMazzo, mazziConstruct);
        mazzoTrovato = mazzi.get(chiaveMazzo);
    }

    const serverMazzi = mazzoTrovato;

    let fullCommand = receivedMessage.content.substr(1) // Rimuove il ? iniziale
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let secondaryCommand = 1
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    primaryCommand = primaryCommand.toLowerCase(); //converto il comando principale in lower case

    //verifico quanti argomenti ci sono
    if (arguments.length > 0) {
        secondaryCommand = splitCommand[1]
        secondaryCommand = secondaryCommand / 1;
        if (typeof (secondaryCommand) == 'number') {
            if (isNaN(secondaryCommand)) {
                secondaryCommand = 1;
            }
            else {
                arguments = splitCommand.slice(2)
            }
            if (secondaryCommand > 50) {
                secondaryCommand = 50;
                receivedMessage.channel.send(receivedMessage.author.toString() + " \nIl numero massimo di carte pescabili di seguito e' 50");
            }
        }
    }

    if (arguments.length > 0) {
        descr = sistemaArguments(arguments);
    }
    else descr = "";

    switch (primaryCommand) {
        case 'arcana':
            arcana(0, secondaryCommand, descr, receivedMessage);
            break;
        case 'briscola':
        case 'bris':
            briscola(secondaryCommand, descr, receivedMessage);
            break;
        case 'minore':
        case 'minor':
            if (serverMazzi.sine)
                minore_sine(secondaryCommand, descr, receivedMessage, serverMazzi);
            else
                arcana(2, secondaryCommand, descr, receivedMessage);
            break;
        case 'maggiore':
        case 'major': 
            if (serverMazzi.sine)
                maggiore_sine(secondaryCommand, descr, receivedMessage, serverMazzi);
            else if (serverMazzi.etemenanki)
                maggiore_etmk(secondaryCommand, descr, receivedMessage, serverMazzi);
            else
                arcana(1, secondaryCommand, descr, receivedMessage);
            break;
        case 'draw_uno':
            maggiore_etmk_uno(secondaryCommand, descr, receivedMessage, serverMazzi);
            break;
        case 'draw_due':
            maggiore_etmk_due(secondaryCommand, descr, receivedMessage, serverMazzi);
            break;
        case 'shuffle':
        case 'mescola':
            secondaryCommand = splitCommand[1];
            switch (secondaryCommand) {
                case 'minore':
                case 'minor': 
                    serverMazzi.mazzoMinoreSine = ini_minore(serverMazzi.mazzoMinoreSine);
                    receivedMessage.channel.send("Ho rimescolato il mazzo degli arcani minori");
                    break;
                case 'maggiore':
                case 'major':
                    if (serverMazzi.sine)
                        serverMazzi.mazzoMaggioreSine = ini_maggiore(serverMazzi.mazzoMaggioreSine);
                    else if (serverMazzi.etemenanki) {
                        serverMazzi.mazzoEtmkUno = ini_maggiore(serverMazzi.mazzoEtmkUno);
                        serverMazzi.mazzoEtmkDue = ini_maggiore(serverMazzi.mazzoEtmkDue);
                    }
                    receivedMessage.channel.send("Ho rimescolato il mazzo degli arcani maggiori");
                    break;
                default:
                    serverMazzi.mazzoMinoreSine = ini_minore(serverMazzi.mazzoMinoreSine);
                    serverMazzi.mazzoMaggioreSine = ini_maggiore(serverMazzi.mazzoMaggioreSine);
                    receivedMessage.channel.send("Ho rimescolato tutti i mazzi");
            }
            break;
        case 'sine':
            if (serverMazzi.sine) {
                serverMazzi.sine = false;
                receivedMessage.channel.send("Rimescolamento del mazzo: nessuna regola.");
                serverMazzi.mazzoMinoreSine = ini_minore(serverMazzi.mazzoMinoreSine);
                serverMazzi.mazzoMaggioreSine = ini_maggiore(serverMazzi.mazzoMaggioreSine);
                receivedMessage.channel.send("Ho rimescolato i mazzi di Sine Requie");
            }
            else {
                serverMazzi.sine = true;
                serverMazzi.etemenanki = false;
                receivedMessage.channel.send("Rimescolamento del mazzo: Sine Requie.");
                serverMazzi.mazzoMinoreSine = ini_minore(serverMazzi.mazzoMinoreSine);
                serverMazzi.mazzoMaggioreSine = ini_maggiore(serverMazzi.mazzoMaggioreSine);
                receivedMessage.channel.send("Ho rimescolato i mazzi di Sine Requie");
            }
            break;
        case 'etemenanki':
            if (serverMazzi.etemenanki) {
                serverMazzi.etemenanki = false;
                receivedMessage.channel.send("Rimescolamento del mazzo: nessuna regola.");
                serverMazzi.mazzoEtmkUno = ini_maggiore(serverMazzi.mazzoEtmkUno);
                serverMazzi.mazzoEtmkDue = ini_maggiore(serverMazzi.mazzoEtmkDue);
                receivedMessage.channel.send("Ho rimescolato i mazzi di Etemenanki");
            }
            else {
                serverMazzi.etemenanki = true;
                serverMazzi.sine = false;
                receivedMessage.channel.send("Rimescolamento del mazzo: Etemenanki.");
                serverMazzi.mazzoEtmkUno = ini_maggiore(serverMazzi.mazzoEtmkUno);
                serverMazzi.mazzoEtmkDue = ini_maggiore(serverMazzi.mazzoEtmkDue);
                receivedMessage.channel.send("Ho rimescolato i mazzi di Etemenanki");
            }
            break;
    }

    });

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

function arcana(x, n_iter, arguments, message) {

    for (i = 0; i < n_iter; i++) {
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
        message.channel.send(message.author.toString() + " " + arguments + " " + str);
    }
    return;
}

function briscola(n_iter, arguments, message) {

    for (i = 0; i < n_iter; i++) {
        n = Math.floor(Math.random() * 40);
        switch (n) {
            case 0:
                str = '\n:one::crossed_swords: \nAsso di Spade';
                break;
            case 1:
                str = '\n:two::crossed_swords: \nDue di Spade';
                break;
            case 2:
                str = '\n:three::crossed_swords: \nTre Spade';
                break;
            case 3:
                str = '\n:four::crossed_swords: \nQuattro di Spade';
                break;
            case 4:
                str = '\n:five::crossed_swords: \nCinque di Spade';
                break;
            case 5:
                str = '\n:six::crossed_swords: \nSei di Spade';
                break;
            case 6:
                str = '\n:seven::crossed_swords: \nSette di Spade';
                break;
            case 7:
                str = '\n:crossed_swords::chess_pawn: \nFante di Spade';
                break;
            case 8:
                str = '\n:horse::crossed_swords: \nCavallo di Spade';
                break;
            case 9:
                str = '\n:crown::crossed_swords: \nRe di Spade';
                break;
            case 10:
                str = '\n:one::beer:\nAsso di Coppe';
                break;
            case 11:
                str = '\n:two::beers:\nDue di Coppe';
                break;
            case 12:
                str = '\n:three::beers:\nTre di Coppe';
                break;
            case 13:
                str = '\n:four::beers:\nQuattro di Coppe';
                break;
            case 14:
                str = '\n:five::beers:\nCinque di Coppe';
                break;
            case 15:
                str = '\n:six::beers:\nSei di Coppe';
                break;
            case 16:
                str = '\n:seven::beers:\nSette di Coppe';
                break;
            case 17:
                str = '\n:beer::chess_pawn:\nFante di Coppe';
                break;
            case 18:
                str = '\n:horse::beer:\nCavallo di Coppe';
                break;
            case 19:
                str = '\n:crown::beer:\nRe di Coppe';
                break;
            case 20:
                str = '\n:one::moneybag:\nAsso di Denari';
                break;
            case 21:
                str = '\n:two::moneybag:\nDue di Denari';
                break;
            case 22:
                str = '\n:three::moneybag:\nTre di Denari';
                break;
            case 23:
                str = '\n:four::moneybag:\nQuattro di Denari';
                break;
            case 24:
                str = '\n:five::moneybag:\nCinque di Denari';
                break;
            case 25:
                str = '\n:six::moneybag:\nSei di Denari';
                break;
            case 26:
                str = '\n:seven::moneybag:\nSette di Denari';
                break;
            case 27:
                str = '\n:moneybag::chess_pawn:\nFante di Denari';
                break;
            case 28:
                str = '\n:horse::moneybag:\nCavallo di Denari';
                break;
            case 29:
                str = '\n:crown::moneybag:\nRe di Denari';
                break;
            case 30:
                str = '\n:one::french_bread:\nAsso di Bastoni';
                break;
            case 31:
                str = '\n:two::french_bread:\nDue di Bastoni';
                break;
            case 32:
                str = '\n:three::french_bread:\nTre di Bastoni';
                break;
            case 33:
                str = '\n:four::french_bread:\nQuattro di Bastoni';
                break;
            case 34:
                str = '\n:five::french_bread:\nCinque di Bastoni';
                break;
            case 35:
                str = '\n:six::french_bread:\nSei di Bastoni';
                break;
            case 36:
                str = '\n:seven::french_bread:\nSette di Bastoni';
                break;
            case 37:
                str = '\n:french_bread::chess_pawn:\nFante di Bastoni';
                break;
            case 38:
                str = '\n:horse::french_bread:\nCavallo di Bastoni';
                break;
            case 39:
                str = '\n:crown::french_bread:\nRe di Bastoni';
                break;
        }
        message.channel.send(message.author.toString() + " " + arguments + " " + str);
    }
    return;
}

function maggiore_sine(n_iter, arguments, message, serverMazzi) {
    for (i = 0; i < n_iter; i++) {
        n = serverMazzi.mazzoMaggioreSine.length;
        if (n == 0) {
            message.channel.send("Il mazzo e' vuoto, rimescolo");
            serverMazzi.mazzoMaggioreSine = ini_maggiore(serverMazzi.mazzoMaggioreSine);
            n = serverMazzi.mazzoMaggioreSine.length;
        }
        else {
        }
        n_carta = Math.floor(Math.random() * n);
        str = serverMazzi.mazzoMaggioreSine[n_carta];
        message.channel.send(message.author.toString() + " " + arguments + " " + str);
        if (n_carta == 0) {
            message.channel.send("Rimescolo il mazzo dei maggiori");
            serverMazzi.mazzoMaggioreSine = ini_maggiore(serverMazzi.mazzoMaggioreSine);
        }
        else {
            serverMazzi.mazzoMaggioreSine.splice(n_carta, 1);
        }
    }
    return;
}

function maggiore_etmk_uno(n_iter, arguments, message, serverMazzi) {
    for (i = 0; i < n_iter; i++) {
        n = serverMazzi.mazzoEtmkUno.length;
        if (n == 0) {
            message.channel.send("Il mazzo Uno e' vuoto, rimescolo");
            serverMazzi.mazzoEtmkUno = ini_maggiore(serverMazzi.mazzoEtmkUno);
            n = serverMazzi.mazzoEtmkUno.length;
        }
        n_carta = Math.floor(Math.random() * n);
        str = serverMazzi.mazzoEtmkUno[n_carta];
        serverMazzi.mazzoEtmkUno.splice(n_carta, 1);
        message.channel.send(message.author.toString() + " " + arguments + " \nMazzo Uno" + str);
    }
    return;
}

function maggiore_etmk_due(n_iter, arguments, message, serverMazzi) {
    for (i = 0; i < n_iter; i++) {
        n = serverMazzi.mazzoEtmkDue.length;
        if (n == 0) {
            message.channel.send("Il mazzo Due e' vuoto, rimescolo");
            serverMazzi.mazzoEtmkDue = ini_maggiore(serverMazzi.mazzoEtmkDue);
            n = serverMazzi.mazzoEtmkDue.length;
        }
        else {
        }
        n_carta = Math.floor(Math.random() * n);
        str = serverMazzi.mazzoEtmkDue[n_carta];
        serverMazzi.mazzoEtmkDue.splice(n_carta, 1);
        message.channel.send(message.author.toString() + " " + arguments + " \nMazzo Due" + str);
    }
    return;
}

function ini_maggiore(array) {
    array = ['\n:black_joker: \nIl Matto',
        '\n:mage: \nIl Bagatto',
        '\n:woman_singer: \nLa Papessa',
        '\n:ring: \nL\'Imperatrice',
        '\n:crown: \nL\'Imperatore',
        '\n:place_of_worship: \nIl Papa',
        '\n:revolving_hearts: \nGli Amanti',
        '\n:auto_rickshaw: \nIl Carro',
        '\n:classical_building: \nLa Giustizia',
        '\n:mount_fuji: \nL\'Eremita',
        '\n:wheel_of_dharma:\nLa Ruota',
        '\n:muscle: \nLa Forza',
        '\n:upside_down: \nL\'Appeso',
        '\n:skull_crossbones: \nLa Morte',
        '\n:sake: \nLa Temperanza',
        '\n:smiling_imp: \nIl Diavolo',
        '\n:night_with_stars: \nLa Torre',
        '\n:sparkles: \nLe Stelle',
        '\n:crescent_moon: \nLa Luna',
        '\n:sunny: \nIl Sole',
        '\n:scales: \nIl Giudizio',
        '\n:earth_africa: \nIl Mondo'];
    return array;
}

function minore_sine(n_iter, arguments, message, serverMazzi) {
    for (i = 0; i < n_iter; i++) {
        n = serverMazzi.mazzoMinoreSine.length;
        if (n == 0) {
            message.channel.send("Il mazzo e' vuoto, rimescolo");
            serverMazzi.mazzoMinoreSine = ini_minore(serverMazzi.mazzoMinoreSine);
            n = serverMazzi.mazzoMinoreSine.length;
        }
        n_carta = Math.floor(Math.random() * n);
        str = serverMazzi.mazzoMinoreSine[n_carta];
        message.channel.send(message.author.toString() + " " + arguments + " " + str);
        if (n_carta == 0) {
            message.channel.send("Rimescolo il mazzo dei minori");
            serverMazzi.mazzoMinoreSine = ini_minore(serverMazzi.mazzoMinoreSine);
        }
        else {
            serverMazzi.mazzoMinoreSine.splice(n_carta, 1);
        }
    }
    return;
}

function ini_minore(array) {
    array = ['\n:one::crossed_swords: \nAsso di Spade',
        '\n:one::beer: \nAsso di Coppe',
        '\n:one::moneybag:\nAsso di Denari',
        '\n:one::french_bread:\nAsso di Bastoni',
        '\n:two::crossed_swords: \nDue di Spade',
        '\n:three::crossed_swords: \nTre Spade',
        '\n:four::crossed_swords: \nQuattro di Spade',
        '\n:five::crossed_swords: \nCinque di Spade',
        '\n:six::crossed_swords: \nSei di Spade',
        '\n:seven::crossed_swords: \nSette di Spade',
        '\n:eight::crossed_swords: \nOtto di Spade',
        '\n:nine::crossed_swords: \nNove di Spade',
        '\n:one::zero::crossed_swords: \nDieci di Spade',
        '\n:chess_pawn::crossed_swords: \nFante di Spade',
        '\n:horse::crossed_swords: \nCavallo di Spade',
        '\n:princess::crossed_swords:\nRegina di Spade',
        '\n:crown::crossed_swords: \nRe di Spade',
        '\n:two::beers:\nDue di Coppe',
        '\n:three::beers:\nTre di Coppe',
        '\n:four::beers:\nQuattro di Coppe',
        '\n:five::beers:\nCinque di Coppe',
        '\n:six::beers:\nSei di Coppe',
        '\n:seven::beers:\nSette di Coppe',
        '\n:eight::beers:\nOtto di Coppe',
        '\n:nine::beers:\nNove di Coppe',
        '\n:one::zero::beers:\nDieci di Coppe',
        '\n:chess_pawn::beer:\nFante di Coppe',
        '\n:horse::beer:\nCavallo di Coppe',
        '\n:princess::beer:\nRegina di Coppe',
        '\n:crown::beer:\nRe di Coppe',
        '\n:two::moneybag:\nDue di Denari',
        '\n:three::moneybag:\nTre di Denari',
        '\n:four::moneybag:\nQuattro di Denari',
        '\n:five::moneybag:\nCinque di Denari',
        '\n:six::moneybag:\nSei di Denari',
        '\n:seven::moneybag:\nSette di Denari',
        '\n:eight::moneybag:\nOtto di Denari',
        '\n:nine::moneybag:\nNove di Denari',
        '\n:one::zero::moneybag:\nDieci di Denari',
        '\n:chess_pawn::moneybag:\nFante di Denari',
        '\n:horse::moneybag:\nCavallo di Denari',
        '\n:princess::moneybag:\nRegina di Denari',
        '\n:crown::moneybag:\nRe di Denari',
        '\n:two::french_bread:\nDue di Bastoni',
        '\n:three::french_bread:\nTre di Bastoni',
        '\n:four::french_bread:\nQuattro di Bastoni',
        '\n:five::french_bread:\nCinque di Bastoni',
        '\n:six::french_bread:\nSei di Bastoni',
        '\n:seven::french_bread:\nSette di Bastoni',
        '\n:eight::french_bread:\nOtto di Bastoni',
        '\n:nine::french_bread:\nNove di Bastoni',
        '\n:one::zero::french_bread:\nDieci di Bastoni',
        '\n:chess_pawn::french_bread:\nFante di Bastoni',
        '\n:horse::french_bread:\nCavallo di Bastoni',
        '\n:princess::french_bread:\nRegina di Bastoni',
        '\n:crown::french_bread:\nRe di Bastoni'];
    return array;
}

function sistemaArguments(array) {
    n_iter = array.length;
    var str = "";
    for (i = 0; i < n_iter; i++) {
        str = str + " " + array[i];
    }
    return str;
}

client.login(process.env.BOT_TOKEN);

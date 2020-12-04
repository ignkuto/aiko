let dotenv = require('dotenv');
dotenv.config();


const { Client, Collection } = require('discord.js');
const bot = new Client({ partials: ['MESSAGE', 'REACTION']});

const keepAlive = require('./server.js');
keepAlive(bot);

['aliases', 'commands'].forEach(x => (bot[x] = new Collection()));
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(process.env.TOKEN);
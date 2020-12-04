const { Manager } = require("erela.js");
const fetch = require("node-fetch")
const db = require('quick.db');
const client = require('discord.js')
const { GiveawaysManager } = require("discord-giveaways");
client.rpg = []
client.rpg.stats = ["int", "str", "wis", "dex", "con", "cha"];
//console.log(client.rpg.stats)
module.exports = bot => {

   fetch(`https://top.gg/api/bots/764051652436819968/stats`, {
    method: "POST",
    headers: { 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NDA1MTY1MjQzNjgxOTk2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1OTYyNTE0fQ.I6bd5CAt6cKOrFW2BDI7yckpCifA-dhbtQMWBVTEtNw",
        "Content-Type": "application/json"
        },
        body: JSON.stringify({"server_count": bot.guilds.cache.size })
      }).then(response => response.text())
    .then(console.log).catch(console.error);


    console.log(`${bot.user.tag} is online`);

    bot.music = new Manager({
      nodes: [
        {
          host: process.env.HOST, 
          port: 3001,
          password: process.env.PASS
          },
          ],
            autoPlay: true,
            send: (id, payload) => {
              const guild = bot.guilds.cache.get(id);
              if (guild) guild.shard.send(payload);
            } 
          })
        .on("nodeConnect", node => console.log(`Successfully Connected To Node.`))
        .on("nodeError", (node, error) => console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`))
        .on("trackStart", (player, track) => {
          const channel = bot.channels.cache.get(player.textChannel);
          channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`);
          })
          .on("queueEnd", player => {
            const channel = bot.channels.cache.get(player.textChannel);
            channel.send("Queue has ended.");
            player.destroy();
            });

    bot.music.init(bot.user.id);
    bot.on("raw", d => bot.music.updateVoiceState(d))


const manager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#7289da",
        embedColorEnd: "#7289da",
        reaction: "🎉"
    }
});
bot.giveawaysManager = manager;


    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    bot.user.setPresence({
            status: 'online',
            activity: {
                name: 'Alex\'s VAULT',
               type: 'WATCHING'
            }
       })

  const { establish } = require('aiko-premium')
  const aiko = require('aiko-premium')

  establish('\;p"S&Ub2A7,%>\$=rfjX3AD:$X5)s#a"AJe-=5MD>zxKUY?]g~VK-`&"tqa')

  // aiko.check()
  // aiko.add()

  // aiko.generate().then(x => {
  //     console.log(x)
  // })

  
  
};
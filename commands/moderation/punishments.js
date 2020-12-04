const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json")
const db = require('quick.db')

module.exports = {
  config: {
    name: "punishments",
    aliases: ["puns", "infractions"],
    usage: "(command)",
    category: "moderation",
    description: "Shows a Player's punishments",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    
    const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'puns')
      if(perm === false) return message.channel.send('No Perms');
      
      let warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!warnee) return message.channel.send("Please supply a user to check their punishments");
      
        let embed = new MessageEmbed() 
        .setColor('7289da')
        .setTitle(`**${warnee.user.username}'s Punishments**`)

        let array = db.get(`punishment.${message.guild.id}.${warnee.id}`)
        if(!array) {
          embed.setDescription('No Punishments')
          return message.channel.send(embed);
        }

        let est = ""
        let i = 0
        let arrayLength = array.length + 1

        array.forEach(x => {
          i++
          est = `${est}\n${i} - ${x}`
          if(i == array.length) {
            embed.setDescription(est)
            message.channel.send(embed)
          }
        })
  }
}
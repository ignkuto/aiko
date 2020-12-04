const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json")
const db = require("quick.db");

module.exports = {
    config: {
        name: "unwarn",
        aliases: ["removewarn"],
        usage: "(command)",
        category: "moderation",
        description: "Displays your level",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      const { permCheck } = require('../../functions.js');
      
      let perm = permCheck(message, false, 'unwarn')
      if(perm === false) return message.channel.send('No Perms');
     
      
      let warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!warnee) return message.channel.send("Please supply a user to check his warns");
      
        let embed = new MessageEmbed() 
        .setColor("7289da")
        .setTitle(`**${warnee.user.username}'s Warns**`)

        let array = db.get(`${message.guild.id}.${warnee.id}.warns`)
        if(!array) {
          embed.setDescription('Error: The user has no warns')
          return message.channel.send(embed);
        }

        let number = args[1]
        if(!number) return message.channel.send('Please specify the warn number');
        if(number.isNaN) return message.channel.send('Please specify the warn number')

        let numbers = number - 1

        delete array[numbers]
        let sf = array.filter(s => s !== null)

        if(sf.length < 1) {
          db.delete(`${message.guild.id}.${warnee.id}.warns`)
        } else {
          db.set(`${message.guild.id}.${warnee.id}.warns`, sf)
        }

            
            embed.setDescription('Removed Warn')
            message.channel.send(embed)
        
        


        
    }
}
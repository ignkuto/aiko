const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json")
const db = require('quick.db')

module.exports = {
    config: {
        name: "cardealer59",
        aliases: ["changeprefix", "prefixchange"],
        usage: "(prefix)",
        category: "settings",
        description: "Change Bot's prefix in a guild",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
      
      const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'prefix')
      if(perm === false) return message.channel.send('No Perms');

      
      let prefix = args[0]
      if(!prefix) return message.channel.send('Please specify the prefix');

      db.set(`${message.guild.id}.prefix`, prefix)

      let embed = new MessageEmbed()
      .setColor(cyan)
      .setTitle('Success')
      .setDescription(`The prefix has been changed to ${prefix}`)
      message.channel.send(embed)
    }
}
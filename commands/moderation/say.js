let { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "say",
        description: "sends a message that was inputted to a channel",
        usage: "[channel] [embed] [message]",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["acc", "announcement"]
    },
    run: async (bot, message, args) => {
      
      const { permCheck } = require('../../functions.js')
      let perm = permCheck(message, false, 'say')
      if(perm === false) return message.channel.send('No Perms');

      let argsresult;
      let mChannel = message.mentions.channels.first()
      if(!mChannel) {
        let embedCheck = args[0]
      } else {
        let embedCheck = args[1]
      }
      

      message.delete()
      if(mChannel) {
        let embedCheck1 = args[1]
        if(embedCheck1 == "embed") {
          argsresult = args.slice(2).join(" ")
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription(argsresult)
        mChannel.send(embed)
        } else {
          argsresult = args.slice(1).join(" ")
          mChannel.send(argsresult)
        }
      } else if(args[0] == "embed") {
        argsresult = args.slice(1).join(" ")
        let embed = new MessageEmbed()
        .setColor('7289da')
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription(argsresult)
        message.channel.send(embed)
      } else  {
          argsresult = args.join(" ")
          message.channel.send(argsresult)
      }
    }
}
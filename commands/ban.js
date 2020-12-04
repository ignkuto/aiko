const { MessageEmbed } = require("discord.js")
const { green } = require("../../color.json")
const db = require('quick.db')
const { permCheck } = require('../../functions.js')

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "!ban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b", "banish", "remove"]
    },
    run: async (bot, message, args) => {
      
      let perm = permCheck(message, false, 'ban')
      if(perm === false) return message.channel.send('Not enough perms dummy');

   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason provided."

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

      await banMember.ban({reason: reason}).catch(err => message.channel.send(err));

      let wembed = new MessageEmbed()
          .setColor('7289da')
          .setAuthor(`⁣⁣ `, message.guild.iconURL)
          .addField(`You have been Banned from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      banMember.send(wembed).catch(err => {
          return;
        });
      

      message.channel.send(`**${banMember.user.tag}** has been banned`) 

    let embed = new MessageEmbed()
        .setColor('7289da')
        .setAuthor(`Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Ban")
        .addField("Banned member:", banMember.user.tag)
        .addField("Moderator:", message.author.tag)
        .addField("Reason:", reason)
        .setTimestamp()

        let chnl = message.guild.channels.cache.find('775524356238606386')
        if(chnl) {
          chnl.send(embed)
        }


          db.push(`punishment.${message.guild.id}.${banMember.id}`, `Type: Ban - Reason: ${reason} - Staff: ${message.author.username}`);

    }
}
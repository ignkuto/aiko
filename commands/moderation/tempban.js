const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "tempban",
        description: "Tempbans a user from the guild!",
        usage: "!tempban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["sb", "sbanish", "sremove"]
    },
    run: async (bot, message, args) => {
   
   const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'tempban')
      if(perm === false) return message.channel.send('No Perms');

   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

         let wembed = new MessageEmbed()
      .setColor("7289da")
      .setAuthor(`${message.guild.name} TempBan`, message.guild.iconURL)
      .addField(`You have been TempBanned from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      banMember.send(wembed).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new MessageEmbed()
    .setColor("7289da")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Tempbanned:", banMember.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())


        
          db.push(`punishment.${message.guild.id}.${banMember.id}`, `Type: Ban - Reason: ${reason} - Staff: ${message.author.username}`);



    }
}
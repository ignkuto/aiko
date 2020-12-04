const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const db = require('quick.db')

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "!unban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["ub", "unbanish"]
    },
    run: async (bot, message, args) => {


      const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'unban')
      if(perm === false) return message.channel.send('No Perms');

		
	if(isNaN(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await bot.users.fetch(args[0])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")|
    message.delete()
    try {
        message.guild.members.unban(bannedMember, reason)
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new MessageEmbed()
    .setColor("7289da")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unban")
    .addField("Unbanned member:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())


          db.push(`punishment.${message.guild.id}.${bannedMember.id}`, `Type: Unban - Reason: ${reason} - Staff: ${message.author.username}`);

    }
}

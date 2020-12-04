const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const db = require('quick.db')

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "!unmute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'unmute')
      if(perm === false) return message.channel.send('No Perms');

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

//define the reason and unmutee
let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be muted!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!")

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
mutee.roles.remove(muterole.id).then(() => {
    message.delete()
    message.channel.send(`${mutee.user.username} was unmuted!`)
})

//send an embed to the modlogs channel
let embed = new MessageEmbed()
.setColor("7289da")
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "unmute")
.addField("unmuted member:", mutee.user.tag)
.addField("Moderator:", message.author.tag)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())


          db.push(`punishment.${message.guild.id}.${mutee.id}`, `Type: Unmute - Reason: ${reason} - Staff: ${message.author.username}`);

        let wembed = new MessageEmbed()
      .setColor("7289da")
      .setAuthor(`${message.guild.name} Mute`, message.guild.iconURL)
      .addField(`You have been unmuted from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      mutee.send(wembed)

    }
}
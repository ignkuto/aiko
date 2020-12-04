const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const db = require("quick.db");
const { permCheck } = require('../../functions.js');

module.exports = {
    config: {
        name: "warn",
        description: "warms a member in the discord!",
        usage: "!warn <user> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["w"] 
    },
    run: async (bot, message, args) => {
      
      let perm = permCheck(message, false, 'warn')
      if(perm === false) return message.channel.send('No Perms');



let warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!warnee) return message.channel.send("Please supply a user to be warned!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

message.delete()
let wembed = new MessageEmbed()
    .setColor("7289da")
    .setAuthor(`${message.guild.name} Warn`, message.guild.iconURL)
    .addField(`You have been warned by ${message.author.tag}`, `Reason: ${reason}`)
warnee.send(wembed)
message.channel.send(`${warnee.user.username} was successfully warned.`)

let embed = new MessageEmbed()
    .setColor("7289da")
    .setAuthor(`${message.guild.name} modlogs`, message.guild.iconURL)
    .addField("Moderation:", "warn")
    .addField("warnee:", warnee.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())


    db.push(`${message.guild.id}.${warnee.id}.warns`, reason)
    }
}
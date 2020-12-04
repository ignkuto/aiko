const { MessageEmbed } = require("discord.js")
const { spec } = require("../../colours.json");
const db = require('quick.db')

module.exports = {
    config: {
        name: "kick",
        description: "Kick a user from the guild!",
        usage: "!kick",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["k"]
    },
    run: async (bot, message, args) => {
      
      const { permCheck } = require('../../functions.js')
      let perm = permCheck(message, false, 'kick')
      if(perm === false) return message.channel.send('No Perms')

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!kickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason provided."

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

          let sswembed = new MessageEmbed()
      .setColor('7289da')
      .setAuthor(``, message.guild.iconURL)
      .addField(`You were kicked from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      kickMember.send(sswembed).then(() => 
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

    let embed = new MessageEmbed()
    .setColor('7289da')
    .setAuthor(`Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("kicked member:", kickMember.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let chnl = message.guild.channels.cache.find('775524356238606386')
    if(chnl) {
      chnl.send(embed)
    }

      let swembed = new MessageEmbed()
      .setColor("#f94343")
      .setAuthor(`${message.guild.name} Kick`, message.guild.iconURL)
      .addField(`You have been Kicked from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      .setDescription(`Punishment ID: ${warnNum}`)
      kickMember.send(swembed)
    }
}
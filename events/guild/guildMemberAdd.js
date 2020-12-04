const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const db = require('quick.db');

module.exports = async (bot, member) => {

  let role = db.get(`data.${member.guild.id}.joinrole`)
  if (!role) {
     console.log(`No Join role added in guild ${member.guild.name}`)
  } else {
   let rolething = member.guild.roles.cache.get(role)
   if(rolething) {
    member.roles.add(rolething)
   }
  }

  let welcomeEmbed = new MessageEmbed()
      .setTitle('New Member')
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setDescription(`Welcome, ${member.user} To ***${member.guild.name}!***`)
      .setFooter(`There are now ${member.guild.memberCount} members on the server.`)
      
      let welcomeChannel = db.get(`settings.${member.guild.id}.joinchannel`)
      if(!welcomeChannel) return;
      let sdds = member.guild.channels.cache.find(r => r.id === welcomeChannel)
      if(!sdds) return console.log(`No welcome channel in ${member.guild.name}`)
      sdds.send(welcomeEmbed)
}

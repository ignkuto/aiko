const fs = require('fs');
const readline = require('readline');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const { green_light } = require('../../colours.json')
const companion = require('little-api-companion')

module.exports = async (bot, message) => { 

    if(message.author.bot || message.channel.type === "dm") return;


    let blacklist = db.get(`settings.${message.guild.id}.blacklist`)
    
    let ch = false
    let msgc = message.content.toLowerCase()
    
    if(blacklist) {

    blacklist.forEach(x => {
      if(message.content.includes(x)) {
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return ch = true
      }
    })
    }

    if(ch === true) {
      message.delete()
      return message.channel.send('Your message contained a blacklisted word!');
    }

   const level = new db.table('LEVEL_SYSTEM');
   const chx = level.fetch(`channel_${message.guild.id}`);
   const toggle = level.fetch(`toggle_${message.guild.id}`)
   
  
   let prefix = db.get(`${message.guild.id}.prefix`)
   if(!prefix) {
     db.set(`${message.guild.id}.prefix`, '?')
   }
if(toggle === 'on') {
  if(!message.content.startsWith(prefix)) {
          const levels = new db.table('level')
      levels.add(`points.${message.guild.id}.${message.author.id}`, 1)
	let points = levels.get(`points.${message.guild.id}.${message.author.id}`)
    let rank = levels.get(`rank.${message.guild.id}.${message.author.id}`)
    if(!rank) {
        levels.set(`rank.${message.guild.id}.${message.author.id}`, 1)
    }
    let check = rank * 25
    if(points >= check) {
        levels.add(`rank.${message.guild.id}.${message.author.id}`, 1)
        let ranksend = levels.get(`rank.${message.guild.id}.${message.author.id}`)
        let msg = level.fetch(`message_${message.guild.id}`);
        if(!msg) msg = `🎉 ${message.author} has levelled up to **${ranksend}** 🎉`;
        
        let user = msg.replace(/{user}/g, message.author);
        let usertag = user.replace(/{usertag}/g, message.author.tag);
        let username = usertag.replace(/{username}/g, message.author.username);
        let userlevel = username.replace(/{userlevel}/g, ranksend)


        let rankEmbed = new MessageEmbed()
        .setColor(green_light)
        .setTitle('Level Up')
        .setDescription(userlevel)
      
        const channel = bot.channels.cache.get(chx)
        if (channel) channel.send(rankEmbed);
        
        
      }
    }
} else if (toggle === 'off') {

        return console.log(`NO LEVELLING SYSTEM SET ${member.guild.name}`)
    }


    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    
    if(commandfile) commandfile.run(bot, message, args)
}

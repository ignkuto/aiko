const { MessageEmbed } = require("discord.js")
const ms = require("ms");
const db = require('quick.db')
const color = require('../../color.json')
 
module.exports = {
    config: {
        name: "mute",
        description: "tempmutes a user from the server",
        usage: "(user) (time. forever for perm) (reason)",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["tm", "m"]
    },
    run: async (bot, message, args) => {


const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'mute')
      if(perm === false) return message.channel.send('No Perms');


let mutee = message.mentions.members.first() || message.guild.members.fetch(args[0]);
  if(!mutee) return message.channel.send("Please mention the user that you want to mute");
    if (mutee.id === message.author.id) {
      return message.reply("You can't mute yourself...");
      }

let time = args[1];
if(!time) return message.channel.send('Specify the time please');
if(!time == "forever") {
  console.log('not perm')
      
      let reason = args.slice(2).join(" ");
      if(!reason) reason = "No reason provided."
      let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
      if(!muterole) {
        message.guild.roles.create({
          data: {
            name: 'Muted',
          }
        }).then(role => {
          message.guild.channels.cache.forEach(x => {
            x.updateOverwrite(role, { SEND_MESSAGES: false });
          })
        })
        muterole = message.guild.roles.cache.find(r => r.name === "Muted")
      }
      mutee.roles.add(muterole)
        setTimeout(function(){
          if(mutee.roles.cache.some(r => r.id === muterole)) return;
          mutee.roles.remove(muterole)
          mutee.send(`You have been unmuted on \`${message.guild.name}\``)
          }, ms(time)).catch(err => {
            return;
          })
          message.channel.send(`${mutee.user.tag} has been muted for ${ms(ms(time))}`)

          db.push(`punishment.${message.guild.id}.${mutee.id}`, `Type: TempMute - Reason: ${reason} - Staff: ${message.author.username}`)
        
        let wembed = new MessageEmbed()
          .setColor('7289da')
          .setAuthor(``, message.guild.iconURL)
          .setDescription(`**You have been temporarily muted on ${message.guild.name}** \n Punished by: ${message.author.tag} \n Reason: ${reason} \n Length: ${time}`)
          mutee.send(wembed).catch(err => {
            return;
          })

        let embed = new MessageEmbed()
          .setColor('7289da')
          .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
          .addField("Moderation:", "mute")
          .addField("Mutee:", mutee.user.tag)
          .addField("Moderator:", message.author.tag)
          .addField("Reason:", reason)
          .addField("Length:", time)
          .setTimestamp()

          let chnl = message.guild.channels.cache.find('775524356238606386')
        if(chnl) {
          chnl.send(embed)
        }
} else {


  console.log('perm')
  
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason given"
  
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
  if(!muterole) {
        message.guild.roles.create({
          data: {
            name: 'Muted',
          }
        }).then(role => {
          message.guild.channels.cache.forEach(x => {
            x.updateOverwrite(role, { SEND_MESSAGES: false });
          })
        })
        muterole = message.guild.roles.cache.find(r => r.name === "Muted")
      }
  mutee.roles.add(muterole).then(() => {
    message.channel.send(`${mutee.user.username} was successfully muted.`)
    })
    let embed = new MessageEmbed()
        .setColor('7289da')
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "mute")
        .addField("Muted:", mutee.user.tag)
        .addField("Moderator:", message.author.tag)
        .addField("Reason:", reason)
        .setTimestamp()

        let chnl = message.guild.channels.cache.find('775524356238606386')
        if(chnl) {
          chnl.send(embed)
        }
        
          db.push(`punishment.${message.guild.id}.${mutee.id}`, `Type: Mute - Reason: ${reason} - Staff: ${message.author.username}`)

        let wembed = new MessageEmbed()
          .setColor('7289da')
          .setAuthor(``, message.guild.iconURL)
          .addField(`You have been muted on ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
        mutee.send(wembed).catch(err => {
          return;
        })
}
    }
}

const Discord = module.require('discord.js');
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "slowmode",
        description: "Slow chat!",
        usage: "slowmode",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["sm"]
    },
    run: async (bot, message, args) => {
      
      const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'slowmode')
      if(perm === false) return message.channel.send('No Perms');

      if(!args[0]) return message.channel.send("Spefify the length of slowmode in seconds! (1-21600 Seconds)")
      let duration = args[0]
      message.channel.setRateLimitPerUser(duration)
        .catch(() => {
        message.channel.send("Failed to set slowmode in this channel, check your slowmode length.")
      })
      message.channel.send("I have set the slowmode in this channel to " + duration + " seconds!")
    }
}
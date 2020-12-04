const ms = require ("ms");
const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
  config: {
    name: "giveaway",
    category: "f",
    aliases: ["g"],
    description: "Delete a running giveaway with the giveaway message ID",
    usage: "?giveaway (argument)"
    },
    run: async (client, message, args) => {
      const noone = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('Awh')
          .setDescription('No one entered the giveaway.')
      if( args[0] == 'start') {
        const invalidEmbed = new Discord.MessageEmbed()
              .setAuthor("Giveaway Command", client.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
              .setColor("#eb0936")
              .setTitle("Invalid Arguments")
              .addFields({
                  name: "USAGE",
                  value: "```giveaway <channel mention> <time> <number of winners> <prize>```"
              }, {
                  name: "EXAMPLES",
                  value: "`giveaway #giveaways 1hr 1 NINTENDO SWITCH`\n`giveaway #public-chat 50d 5 DISCORD NITRO`"
              });

        const { permCheck } = require('../../functions.js')
        let perm = permCheck(message, false, 'giveawaystart')
        if(perm === false) return message.channel.send('Not enough perms dummy');

        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" I don't have permission to perform this command! I need **MANAGE MESSAGES** permission to perform this command!");

        const giveawayChannels = message.mentions.channels.first();
        

        if (! args[1]) return message.channel.send(invalidEmbed);
        
        if(!giveawayChannels) {
          giveawayDuration =  args[1]
          giveawayWinners =  args[2];
          giveawayPrize = args.slice(3).join(" ");
          giveawayChannel = message.channel;
        } else {
          giveawayDuration =  args[2];
          giveawayWinners =  args[3];
          giveawayPrize = args.slice(3).join(" ");
          giveawayChannel = giveawayChannels;
        }

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send({embed: {color:'#de2121', description:" Please provide a valid duration. \n**Example:** `>giveaway start 10d 1 Discord Nitro`"}});

        if (!giveawayPrize) return message.channel.send({embed: {color:'#de2121', description:" Please provide a reward."}});

        const mentions = message.mentions;
        if (/<@&?!?\d{18}>|@everyone|@here/g.test(message.content)) return message.channel.send({embed: {color:'#de2121', description:" Don't think about abusing commands by adding `@everyone`."}});

        if (isNaN(giveawayWinners) || parseInt(giveawayWinners) < 1) return message.channel.send({embed: {color:'#de2121', description:" Please provide a valid number of winners!"}});

        const giveaway = client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: message.author,
            embedcolorend: "#7289da",
            messages: {
                giveaway: ":tada:  **GIVEAWAY** :tada: ",
                giveawayEnded: ":tada:   **GIVEAWAY ENDED**  :tada: ",
                timeRemaining: "Time remaining: **{duration}**",
                inviteToParticipate: "React with :tada: to enter",
                winMessage: "Congrats {winners}, you won **{prize}**",
                embedFooter: "Giveaway time!",
                noWinner: "**NO ONE PARTICIPATED IN THE GIVEAWAY.**" ,
                hostedBy: "Hosted by {user}",
                winners: "Winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds"||"sec",
                    minutes: "minutes"||"mins"||"m",
                    hours: "hours"||"hr",
                    days: "days"||"d",
                    pluralS: false,
                },
            }
        });
    } else if(args[0] == 'reroll') {
      let messageID = args[1];
      if(!args[1] || isNaN(args[1])) {
        return message.channel.send('Please enter the giveaway\'s Message ID.')
      } else if(args[1] >= 18) {
        client.giveawaysManager.reroll(messageID).then(() => {
            message.channel.send("Giveaway rerolled.");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
    } else {
      return message.channel.send('Please enter the giveaway\'s Message ID.')
    }
    }
    }
};
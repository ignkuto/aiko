const { MessageEmbed } = require('discord.js')

module.exports = { 
    config: {
        name: "invites",
        aliases: ["whois", "id", "ud"],
        description: "info about user",
        category: "miscellaneous",
        usage: "userinfo <user>",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }

                let embed = new MessageEmbed()
                .setTitle(`${user.username}'s Invites`)
                .setColor('7289da')
                .setDescription(`${user} has ${userInviteCount} invites.`);

                message.channel.send(embed)
            }
        )
    }
}
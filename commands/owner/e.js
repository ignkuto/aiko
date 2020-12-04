const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "info",
        description: "self explanitory.",
        usage: "(command)",
        category: "moderation",
        accessableby: "members",
        aliases: ["rule"]
    },
    run: async (bot, message, args) => {
      let terms = 'https://discord.com/terms'
      let guidelines = 'https://discord.com/guidelines'
        let rules = new MessageEmbed()
            .setColor('7289da')
            .setThumbnail(message.guild.iconURL({ dynamic : true }))
            .addField('Information', [
              '\u200b',
              //1
              `**Are we Legit?**`,
              'Yes. We do give out our rewards, and also have proof of that in the <#771414714093797401> channel.',
              '\u200b',
              `**How can I enter giveaways?**`,
              'If you would like to enter a giveaway, you will have to first meet the requirements.'
              
            ])
            .setFooter('Alex VAULT')
            if(message.author == '774340378933067806' || '588236633535676416') {
              message.delete()
              return message.channel.send(rules);
            } else {
              return;
            }
    }
}
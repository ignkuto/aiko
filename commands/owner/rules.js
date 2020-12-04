const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "rules",
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
            .setTitle('Rules & Regulations')
            .setThumbnail(message.guild.iconURL({ dynamic : true }))
            .addField('General Rules', [
              '\u200b',
              //1
              `**Spamming**`,
              'Spamming is not allowed. It makes it hard for our Moderators to moderate the server, and is very annoying.',
              '\u200b',
              //2
              `**Cussing**`,
              'Swearing is allowed as long as it is not used offensively toward other members.',
              '\u200b',
              //3
              `**Racial Slurs**`,
              'Racial slurs will not be tolerated whatsoever. Those who say slurs will be punished immediately.',
              '\u200b',
              //4
              `**Discrimination**`,
              'Discrimination is treated the same as Racial Slurs and/or any slurs whatsoever. Those who discriminate others will be punished immediately.',
              '\u200b',
              //5
              `**Advertisement**`,
              'Advertisement will not be tolerated whatsoever.',
              '\u200b'
            ])
            .addField('Voice Chat Rules', [
              '\u200b',
              //1
              `**Earrape**`,
              'Earrape will not be tolerated whatsoever. If you are caught doing this, you will be muted from Voice Channels.',
              '\u200b',
              //2
              `**Voice Changers**`,
              'Voice Changers are only allowed if everyone else in the Voice Channel are alright with it.',
              '\u200b',
              //3
              `**Blasting Music**`,
              'Blasting Music is not allowed. If you do this, you will be blocked from using our Music Commands.',
              '\u200b'
            ])
            .addField('Additional Rules', [
              '\u200b',
              `**-** Make sure to follow the [Discord TOS](${terms}).`,
              `**-** Make sure to follow the [Discord Guidelines](${guidelines}).`
            ])
            if(message.author == '774340378933067806' || '588236633535676416') {
              message.delete()
              message.channel.send(rules);
            } else {
              return;
            }
    }
}

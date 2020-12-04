const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: "!serverinfo",
        category: "information",
        accessableby: "Members",
        aliases: ["si", "serverdesc"]
    },
    run: async (bot, message, args) => {
    let sEmbed = new MessageEmbed()
        .setColor("7289da")
        .setTitle("Server Info")
        .setAuthor('Alex\'s VAULT', bot.user.displayAvatarURL())
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
        .setFooter(`${message.guild.name} | ServerInfo`, bot.user.displayAvatarURL());
    message.channel.send(sEmbed);
    }
}
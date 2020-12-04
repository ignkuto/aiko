module.exports = { 
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: async (bot, message, args) => {
       const { channel } = message.member.voice;

        const player = bot.music.players.get(message.guild.id);
        
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!channel) return message.channel.send("You need to be in a voice channel to use the leave command.");

        if (!args[0]) return message.channel.send(`Current Volume: ${player.volume}`);
        if(isNaN(args[0])) return message.channel.send('Must be a number')
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("You may only set the volume to 1-100");

        player.setVolume(Number(args[0]));
        return message.channel.send(`Successfully set the volume to: ${args[0]}`)
    }
}
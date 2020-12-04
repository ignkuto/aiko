module.exports = { 
    config: {
        name: "leave",
        aliases: ["lev", "stop"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const player = bot.music.players.get(message.guild.id);
        
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!channel) return message.channel.send("You need to be in a voice channel to use the leave command.");
        
        
        player.destroy(channel);
        return message.channel.send("Successfully stopped the music.")
    }
}

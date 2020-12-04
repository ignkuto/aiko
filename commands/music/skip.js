module.exports = { 
    config: {
        name: "skip",
        aliases: ["next"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: (bot, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const player = bot.music.players.get(message.guild.id);
        
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!channel) return message.channel.send("You need to be in a voice channel to use the leave command.");
        
        
        player.stop();
        return message.channel.send("Skipped the current song!");
    }
}
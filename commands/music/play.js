const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "play",
        description: "plays music",
        usage: "#play",
        category: "music",
        accessableby: "Members",
        aliases: ["p", "pplay"]
    },
    run: async (bot, message, args) => {
 
        const { channel } = message.member.voice;

    if (!channel) return message.channel.send("You need to be in a voice channel to play music.");
    if (!args[0]) return message.channel.send("Please provide a song name or link to search.");

    const player = bot.music.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
    });

    player.connect();

    const search = args.join(' ');
    let res;

    try {
      res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw new Error(res.exception.message);
      }
    } catch (err) {
      return message.reply(`there was an error while searching: ${err.message}`);
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.reply('there were no results found.');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.length) player.play();
        return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
        return message.reply(`enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
      case "SEARCH_RESULT":
              let index = 1;
              const tracks = res.tracks.slice(0, 5);
              const embed = new MessageEmbed()
              .setColor("RANDOM")
                  .setAuthor("Song Selection.", message.author.displayAvatarURL)
                  .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                  .setColor("7289da")
                  .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                await message.channel.send(embed);

                const collector = message.channel.createMessageCollector(m => {
                    return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                }, { time: 30000, max: 1});

                collector.on("collect", m => {
                    if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                    const track = tracks[Number(m.content) - 1];
                    player.queue.add(track)
                    message.channel.send(`Enqueuing \`${track.title}\``);
                    if(!player.playing) player.play();
                });

                collector.on("end", (_, reason) => {
                    if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                });
                break;
    
            if (!player.playing && !player.paused && !player.queue.length) player.play();
            return message.reply(`enqueuing \`${track.title}\`.`);
    }
    }
}
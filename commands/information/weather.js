const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = { 
    config: {
        name: "weather",
        description: "Shows the weather of a country",
        usage: "(country)",
        category: "information",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
    let city = args.join(" ");
    let degreetype = "C";

    await weather.find({search: city, degreetype: degreetype}, function(err, result) {
        if (!city) return message.channel.send("Please input a city and try again."); //change to an embed if u want lol -dark
        if(err || result === undefined || result.length === 0) return message.channel.send("Please input an existing city and try again."); //u can also change this to an embed -dark

        let current = result[0].current;
        let location = result[0].location;

        const weatherembed = new MessageEmbed()
            .setAuthor(current.observationpoint)
            .setDescription(`**-** ${current.skytext}`)
            .setThumbnail(current.imageURL)
            .setColor('7289da')

            weatherembed.addField("Latitude", location.lat, true)
                .addField("Longitude", location.long, true)
                .addField("Feels Like", `${current.feelslike}° Degrees`, true)
                .addField("Winds", current.winddisplay, true)
                .addField("Humidity", `${current.humidity}%`, true)
                .addField("Timezone", `GMT ${location.timezone}`, true)
                .addField("Temperature", `${current.temperature}° Degrees`)
                .addField("Observation Time", current.observationtime, true)
            return message.channel.send(weatherembed);
    })
    }
}
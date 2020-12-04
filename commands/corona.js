const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "corona",
        aliases: ["covid"],
        description: "Covid-19 stats of a country",
        usage: "(country)",
        category: "information",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
    let countries = args.join(" ");
    if(!countries) return message.channel.send('Please specify the country!')
    if(countries === "Israel") {
      countries = "Palestine"
    }

    fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
    .then(res => res.json())
    .then(data => {
      if(data.message) return message.channel.send('invalid country')
      let flag = data.countryInfo.flag;
      let confirmed = data.cases.toLocaleString();
      let deaths = data.deaths.toLocaleString();
      let recovered = data.recovered.toLocaleString();
      let critical = data.critical.toLocaleString();
      let active = data.active.toLocaleString();
      let covid = 'https://www.vicksburgnews.com/wp-content/uploads/2020/02/Coronavirus-2019-nCoV-CDC-23312_without_background.png';

      const covidembed = new MessageEmbed()
        .setColor("7289da")
        .setTimestamp(new Date())
        .setAuthor("Coronavirus Statistics", covid)
        .setDescription(`**Confirmed:** ${confirmed}\n**Deaths:** ${deaths}\n**Recovered:** ${recovered}\n**Critical:** ${critical}\n**Active:** ${active}`)
        .setThumbnail(flag)
      message.channel.send(covidembed);
    })
  }
}
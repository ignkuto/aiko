const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "meme",
        description: "Sends a meme from a website!",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
      
      let array = ["dankmemes", "cleanmemes", "memes", "funny", "teenagers"]
      
      let arrayNum = Math.floor(Math.random() * array.length)
      let type = array[arrayNum]

      loadCuties(message)
      
      function loadCuties() {
        fetch(`https://www.reddit.com/r/${type}.json?limit=300&?sort=top&t=all`)
          .then(res => res.json())
          .then(json => json.data.children.map(v => v.data.url))
          .then(urls => postRandomCutie(urls));
      }

      function postRandomCutie(urls) {
        const randomURL = urls[Math.floor(Math.random() * urls.length) + 1];
        const embed = new MessageEmbed({
          image: {
            url: randomURL
          }
        });
            let sembed = new MessageEmbed()
            .setColor('7289da')
            .setAuthor(`Meme`, message.guild.iconURL)
            .setImage(randomURL)
            .setTimestamp()
        
        message.channel.send(sembed)
    }
    }
}
      
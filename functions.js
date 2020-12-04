const db = require("quick.db")

module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    shuffle: function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
},


permCheck: function(message,perms,command) {
  const db = require('quick.db')
      let array = db.get(`${command}.perms.${message.guild.id}`)
      if(!array) {
        if(message.member.hasPermission(["ADMINISTRATOR"])) {
          perms = true
        }
        if(message.author.id == "255327008576241674") {
          perms = true
        }
        
      } else {
        array.forEach(x => {
          if(message.member.roles.cache.some(r => r.id === x)) {
            perms = true
      } else {
        if(message.member.hasPermission(["ADMINISTRATOR"])) {
          perms = true
        }
        
      }
        })
      }

        
      return perms;
      
    }


    
}
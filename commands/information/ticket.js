const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");
const randomstring = require("randomstring");
const date = require('date-and-time');
const hastebin = require('hastebin');

module.exports = {
    config: {
        name: "ticket",
        description: "Creates a ticket",
        usage: "create",
        category: "f",
        accessableby: "",
        aliases: [""]
    },
    run: async (bot, message, args) => {
  message.delete()
  const ticket = new db.table("TICKET_SYSTEM");
if(args[0] == 'create'){
  let permembed = new Discord.MessageEmbed()
  .setColor('#7289da')
  .setDescription(`Error. Give Me The Permission: Manage Channels`)

  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(permembed);

  const user2 = message.author;
  const timeout = 180000;
  const daily = await ticket.fetch(`ticketcooldown_${message.guild.id}_${message.author.id}`);

  const check = ticket.fetch(`${message.guild.id}_${message.author.name}`)
  if(check) return message.channel.send({embed: {color:"RED", description:`You already have a ticket opened - <#${check}>`}})

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
  const timeEmbed = new Discord.MessageEmbed()
    .setColor("#7289da")
    .setDescription(`You have a cooldown of ${time.minutes}m ${time.seconds}s until you can open another ticket`);
  message.channel.send(timeEmbed)
  
  } else {
  const numbers = randomstring.generate({
    length: 5,
    charset: 'numeric'
  });

  const authorsend2 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`You already have a ticket open`)

  let topic1 = ticket.fetch(`${message.guild.id}-topic1`)
  let topic2 = ticket.fetch(`${message.guild.id}-topic2`)
  let topic3 = ticket.fetch(`${message.guild.id}-topic3`)
  let topic4 = ticket.fetch(`${message.guild.id}-topic4`)
  let topic5 = ticket.fetch(`${message.guild.id}-topic5`)


  if(topic1 == null) topic1 = 'Not Set';
  if(topic2 == null) topic2 = 'Not Set';
  if(topic3 == null) topic3 = 'Not Set';
  if(topic4 == null) topic4 = 'Not Set';
  if(topic5 == null) topic5 = 'Not Set';


  ticket.add(`${message.guild.id}-ticketcount`, 1)
  ticket.set(message.guild.id, {
    no: numbers,
    ticketopener: message.author.id,
  });

  const ticketcount = ticket.fetch(`${message.guild.id}-ticketcount`)

  const channelsend1 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`Hello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n`)

  const channelsend2 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n`)

  const channelsend3 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n`)

  const channelsend4 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n`)

  const channelsend5 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n`)

  const cancelembed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`Ticket Cancelled`)

  const input = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`Please choose from one of the following ticket topics: \n\n1: Sell\n2: Buy Something\n3: Question\n4: Issue\n5: Claim Prize`)
    .setFooter(`This will expire in 40 seconds then you will be put on a 3 minute cooldown`)

  const msg = await message.channel.send(input)
    await msg.react("1️⃣")
    await msg.react("2️⃣")
    await msg.react("3️⃣")
    await msg.react("4️⃣")
    await msg.react("5️⃣")
    await msg.react("❌")

  const categoryName = "TICKETS";
  const category = message.guild.channels.cache.find(channel => channel.type === "category" && channel.name === categoryName);
  const ticketlog = ticket.get(`${message.guild.id}_ticketlog`)
  const logchannel = bot.channels.cache.get(ticketlog);
  const role = db.get(`${message.guild.id}-ticketrole`)

  const filter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
  msg.awaitReactions(filter, {
    max: 1,
    time: 40000
  }).then(collected => {
        const reaction = collected.first();
        switch (reaction.emoji.name) {

          case '1️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                console.log(topic1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username} - Sell`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                const chname = createdchannel.id
                
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                    }).catch(console.error);;

                  role.forEach(x => {
                    let y = message.guild.roles.cache.find(r => r.id === x);
                    if(!y) return;
                    
                    createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                  })
                
              })

              msg.delete()

            break;

          case '2️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                msg.delete()
                const chname = createdchannel.id
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                    }).catch(console.error);;

                    role.forEach(x => {
                    let y = message.guild.roles.cache.find(r => r.id === x);
                    if(!y) return;
                    
                    createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                  })

              })
              msg.delete()
                
            break;

          case '3️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                msg.delete()
                const chname = createdchannel.id
                console.log("T3")
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                }).catch(console.error);;

                role.forEach(x => {
                  let y = message.guild.roles.cache.find(r => r.id === x);
                  if(!y) return;
                    
                  createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                });
                
              });
              msg.delete()

            break;

          case '4️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                console.log("T4")
                const chname = createdchannel.id
                msg.delete()
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                }).catch(console.error);;


                role.forEach(x => {
                  let y = message.guild.roles.cache.find(r => r.id === x);
                  if(!y) return;
                    
                  createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                });
                
              });
              msg.delete()
                
            break;

          case '5️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                const chname = createdchannel.id
                msg.delete()
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                }).catch(console.error);;
                console.log("T5")

                role.forEach(x => {
                  let y = message.guild.roles.cache.find(r => r.id === x);
                  if(!y) return;
                    
                  createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                });
                
              });
              msg.delete()
        
            break;
            
          case '❌':
          msg.delete()
          ticket.subtract(`${message.guild.id}-ticketcount`, 1) 
          return message.channel.send(cancelembed)
        }
      });
    ticket.set(`ticketcooldown_${message.guild.id}_${message.author.id}`, Date.now())
      }

    } else if(args[0] == 'close') {
      const ticket = new db.table("TICKET_SYSTEM");
  const channel = message.channel;

  const whoopsembed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`Ticket Is Already Closed`)

  if(channel.parent == message.guild.channels.cache.find(c => c.name == "Closed Tickets" && c.type == "category")) return message.channel.send(whoopsembed)

  let ticketcount = ticket.fetch(`${message.guild.id}-ticketcount`)

  let reason = args.join(" ");
  if(!reason) reason = 'None Provided'

  let user = ticket.fetch(`${message.guild.id}.ticketopener`);
  const u = message.guild.members.cache.get(user);

  message.channel.messages.fetch()
  .then(messages => {
    let text = "";

  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }

  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'

      })
      .then(data => {
          const authorsend = new Discord.MessageEmbed()
            .setColor('#7289da')
            .setDescription(`[Message Transcript](${data}) Of Your Ticket In **${message.guild.name}**`)
        
          u.send(authorsend)

          let closedticket = new Discord.MessageEmbed()
            .setColor('#7289da')
            .setDescription(`Ticket Closed. This Ticket Will Be Deleted In 30 seconds.\n\n[Ticket Transcript](${data}).`)

    const logchannelembed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .setTitle(`Ticket Closed`)
        .addField("Ticket By:", u)
        .addField("Closed By:", message.author.username)
        .addField("Ticket Number:", `\`${ticketcount}\``)
        .addField("Close Reason:", `${reason ? reason: "*None*"}`)
        .addField("Transcript:", `[Here](${data})`)

    const logchannel = message.guild.channels.cache.find(cl => cl.name == "ticket-logs" && cl.type == "text")
    logchannel.send(logchannelembed);
    ticket.delete(`${message.guild.id}_${message.author.name}`)  
    message.channel.send(closedticket);

    setTimeout(() => {
        message.channel.delete()
    }, 30000);

      })
  })
    } else if(args[0] == 'add') {
      const notallowed = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setDescription(`You Don't have permission to add users to ths ticket!`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketadd')
    if(perm === false) return message.channel.send(notallowed);

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send('Please specify the user!')

    let channelsend = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setTitle(`Added User`)
      .setDescription(`${message.author} Has Added ${user} To This Ticket`)


    message.channel.updateOverwrite(user, {
      'VIEW_CHANNEL': true, 
      'SEND_MESSAGES': true, 
      'MENTION_EVERYONE': false
    })
    message.channel.send(channelsend)
    } else if(args[0] == 'remove') {
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    const notallowed = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setDescription(`You Need The **Support Team** Role To Remove Users From Tickets`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketremove')
    if(perm === false) return message.channel.send(notallowed);

    const channelsend = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setTitle(`Removed User`)
      .setDescription(`${message.author} Has Removed ${user} From This Ticket`)


    message.channel.updateOverwrite(user, {
      'VIEW_CHANNEL': false, 
      'SEND_MESSAGES': false, 
      'MENTION_EVERYONE': false
      })
    message.channel.send(channelsend)
    } else if(args[0] == 'rename') {
    const ticket = new db.table("TICKET_SYSTEM");
    let notallowed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`You Need The **Support Team** Role To Rename Tickets`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketrename')
    if(perm === false) return message.channel.send(notallowed);

    const numbers = ticket.fetch(`${message.guild.id}.no`)

    const authorsend2 = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setDescription(`Input something to rename the ticket to`)

    const rename = args.join(" ").slice(7).trim();
    if(!rename) return message.channel.send(authorsend2)

      message.channel.setName(`${rename}-${numbers}`)

    ticket.set(`${message.guild.id}_${message.author.name}`, message.channel.id)

    let embed = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setDescription(`Ticket renamed to ${rename}`)
    message.channel.send(embed)
    } else if(args[0] == 'settopic') {
      const ticket = new db.table("TICKET_SYSTEM")

      let notallowed = new Discord.MessageEmbed()
          .setColor('#7289da')
          .setDescription(`You Don't Have Permission To Do This`)

      const { permCheck } = require('../../functions.js')
      let perm = permCheck(message, false, 'tickettopic')
      if(perm === false) return message.channel.send(notallowed);


      let permembed = new Discord.MessageEmbed()
          .setColor('#7289da')
          .setDescription(`Error. Give Me The Permission: Manage Channels`)

      if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(permembed);

      ticket.set(`${message.guild.id}-topic1`, args.join(" ").slice(2))

          const type = args[1]
          switch(type){

            case "1":
              top1 = args.slice(2).join(" ")
              ticket.set(`${message.guild.id}-topic1`, top1)
              message.channel.send(`Setted Topic-1 as ${top1}`)
            break;

            case "2":
              top2 = args.slice(2).join(" ")
              ticket.set(`${message.guild.id}-topic2`, top2)
              message.channel.send(`Setted Topic-2 as ${top2}`)
            break;

            case "3":
              top3 = args.slice(2).join(" ")
              ticket.set(`${message.guild.id}-topic3`, top3)
              message.channel.send(`Setted Topic-3 as ${top3}`)
            break;

            case "4":
              top4 = args.slice(2).join(" ")
              ticket.set(`${message.guild.id}-topic4`, top4)
              message.channel.send(`Setted Topic-4 as ${top4}`)
            break;

            case "5":
              top5 = args.slice(2).join(" ")
              ticket.set(`${message.guild.id}-topic5`, top5)
              message.channel.send(`Setted Topic-5 as ${top5}`)  
            break;

            default:
              message.channel.send("Please enter a topic number and then topic. Example `?set 1 User Complain`")
          }
    } else if(args[0] == 'setup') {
      let notallowed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`You Don't Have Permission To Do This`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketsetup')
    if(perm === false) return message.channel.send(notallowed);

    let setupcheck2 = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`This Server Has Already Been Setup`)


  message.guild.roles.create({
    data:{
      name: 'Support Team',
      color: 'BLUE',
      permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']
    }
  })
    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
    .catch(console.error)

    let categorycreate = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Server Setup Successfully`)
    .setDescription(`Support Team Role: **Support Team** | Open Ticket Category: **Tickets** | Closed Ticket Category: **Closed Tickets**`);

    message.guild.channels.create("TICKETS", { type: "category" })

    message.channel.send(categorycreate)

    const categoryName = "TICKET LOGS"

    const category = message.guild.channels.cache.find(channel => channel.type === "category" && channel.name === categoryName)
                || await message.guild.channels.create(categoryName, { type: "category" });

    const role = message.guild.roles.cache.find(r => r.name === "Support Team")

    var name = `ticket-logs`;
    message.guild.channels.create(name, {
        type: 'text',
        parent: category,
        setTopic: 'Ticket Logs Channel For Support Tickets Bot',
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: role.id,
            allow: ['VIEW_CHANNEL'],
          },
        ],
      });
    } else if(args[0] == 'supportrole') {
    let notallowed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`You Don't Have Permission To Do This`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketrole')
    if(perm === false) return message.channel.send(notallowed);

    let role = message.guild.roles.cache.find(r => r.name == args[0]) || message.guild.roles.cache.find(r => r.id == args[0]) || message.mentions.roles.first()

    if(!role) return message.channel.send('Please specify the role you want to give access to support tickets!')

    let sry = db.get(`${message.guild.id}-ticketrole`) || []
    sry.push(role.id)

    db.set(`${message.guild.id}-ticketrole`, sry)

    let channelsend = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setTitle(`Added User`)
      .setDescription(`The role now has permission to see any new ticket made!`)

      message.channel.send(channelsend)
    } else if(args[0] == 'help') {
      let embed = new Discord.MessageEmbed()
    .setTitle("Support Tickets Help")
    .addField("Creating a Ticket", "`?ticket create`")
    .addField("Closing a Ticket", "`?ticket close [reason]`")
    .addField("Adding a User To The Ticket", "`?ticket add [usermention]`")
    .addField("Removing a User From The Ticket", "`?ticket remove [usermention]`")
    .addField("ADMIN | Rename a Ticket", "`?ticket rename [name]`")
    .setColor("#7289da")
    message.channel.send(embed)
    } else if(args[0] == 'info') {
      let ticketcount = db.fetch(`${message.guild.id}-ticketcount`)

  let reasonfetch = db.fetch(`${message.guild.id}-closeticketreason`)

  let user = db.fetch(`${message.guild.id}-ticketopener`)

  let reasonfetch2 = db.fetch(`${message.guild.id}-ticketreason`)

  let transcriptfetch = db.fetch(`${message.guild.id}_${user.id}-transcript`)

  if(ticketcount == null) ticketcount = 0
  if(reasonfetch == null) reasonfetch = 'None'
  if(user == null) user = 'None'
  if(reasonfetch2 == null) reasonfetch2 = 'None'
  if(transcriptfetch == null) transcriptfetch = 'None'

  let embed = new Discord.MessageEmbed()
  .setColor('#7289da')
  .setTitle(`Ticket Information`)
  .setDescription(`Opened By: ${message.author}\nTicket Reason: \`${reasonfetch2}\`\nClose Reason: \`${reasonfetch}\`\nTicket Number: \`${ticketcount}\`\nTranscript: [Here](${transcriptfetch})`)
    message.channel.send(embed)
    } else if(args[0] == 'logs') {
      let notallowed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`You Don't Have Permission To Do This`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketlog')
    if(perm === false) return message.channel.send(notallowed);

    let ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if(!ch) return message.channel.send('Please specify the channel you want to log tickets in!')
    const ticket = new db.table("TICKET_SYSTEM")
    ticket.set(`${message.guild.id}_ticketlog`, ch.id)

    let channelsend = new Discord.MessageEmbed()
      .setColor('#7289da')
      .setTitle(`Added User`)
      .setDescription(`The channel <#${ch}> will now log ticket logs`)

      message.channel.send(channelsend)
    } else if(args[0] == 'timeout') {
      let notallowed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`You Don't have enough permissions!`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'tickettimeout')
    if(perm === false) return message.channel.send(notallowed);

  const ticket = new db.table("TICKET_SYSTEM");

  let cancelembed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`Timeout Stopped`)

  let input = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`Timeout Started\n\nThis Ticket Will Close In 15 Minutes If No One Reacts To This Message`)

  let msg = await message.channel.send(input)
  await msg.react("✅")

  bot.on('messageReactionAdd', (messageReaction, user) => {
    if(user.bot) return;
  })
  
  let user = ticket.fetch(`${message.guild.id}.ticketopener`)

  message.channel.messages.fetch()
  .then(messages => {
    let text = "";

  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }

  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'

      })
      .then(data => {
          console.log(`Created paste: ${data}`);
          
  
    let ticketcount = ticket.fetch(`${message.guild.id}-ticketcount`)



    let closedticket = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setDescription(`Ticket Closed. This Ticket Will Be Deleted In 10 Minutes\n\n[Ticket Transcript](${data}) Or Run \`ticket.last\` To Get Additional Info`)



    let logchannelembed = new Discord.MessageEmbed()
    .setColor('#7289da')
    .setTitle(`Ticket Closed`)
    .setDescription(`Closed By: ${message.author}\nTicket Number: \`${ticketcount}\`\nClose Reason: \`Timeout\`\nTranscript: [Here](${data})`)

    let logchannel = message.guild.channels.cache.find(cl => cl.name == "ticket-logs" && cl.type == "text")

    const filter = (reaction, user) => ['✅'].includes(reaction.emoji.name) && !user.bot;

      msg.awaitReactions(filter, {
        max: 1,
        time: 900000
      }).then(collected => {
        const reaction = collected.first();
        switch (reaction.emoji.name) {
          case '✅':
            msg.delete()
          return message.channel.send(cancelembed)
        }
      }).catch(collected => {
        logchannel.send(logchannelembed) 
        ticket.delete(`${message.guild.id}_${message.author.name}`)  
        message.channel.send(closedticket)
        msg.delete()
        setTimeout(() => {
          message.channel.delete()
        }, 600000);
        
      })
    })
      

    })
    } else {
      return;
    }
    }
}
const db = require('quick.db');
const express = require('express');

const levelServers = new db.table('LEVEL_SYSTEM');
const levels = new db.table('level');

function listen(app, bot) {
  app.use((req, res, next) => {
    const url = req.url.split('/');
    url.shift();
    if (url[0] === 'api' && url[1] !== '9Uj3k5KtaMbraZJK2piDNXkxpv5ZyU2T')
      return res.send({ error: 'An invalid authentication token was provided' });
    
    next();
  });

  app.get('/api/:auth', (req, res) => {
    res.send({ error: 'No API was specified' });
  });

  app.get('/api/:auth/leaderboard', (req, res) => {
    res.send({ error: 'No server ID was specified' });
  });

  app.get('/api/:auth/leaderboard/:guildID', (req, res) => {
    const guildID = req.params['guildID'];
    const amount = parseInt(req.query.amount) || Infinity;

    const levelsEnabled = levelServers.get(`toggle_${guildID}`);
    if (levelsEnabled) {
      let users = levels.get(`points.${guildID}`);
      let ranks = levels.get(`rank.${guildID}`);
      users = Object.entries(users);
      users = users.sort((a, b) => b[1] - a[1]);

      let rankedUsers = [];
      for ([userID, points] of users) {
        const user = bot.users.cache.get(userID);
        if (!user) continue;

        const rank = ranks[userID];

        rankedUsers.push([user.username, { points, rank }]);

        if (rankedUsers.length === amount) break;
      }

      let server = bot.guilds.cache.get(guildID);
      server = server && server.name || 'Unknown';

      return res.send({ data: {
          users: rankedUsers,
          server
      } });
    }

    res.send({ error: 'The specified server either does not exist or has levels disabled' });
  });

  app.get('/api/:auth/guild', (req, res) => {
    res.send({ error: 'No server ID was specified' });
  });

  app.get('/api/:auth/guild/:guildID', (req, res) => {
    const guildID = req.params['guildID'];

    const guild = bot.guilds.cache.get(guildID);
    if (!guild) return res.send({ error: 'The specified guild could not be found' });

    res.send({ data: guild });
  });

  /* channel endpoint */
  app.get('/api/:auth/channel', (req, res) => {
    res.send({ error: 'No channel ID was specified' });
  });

  app.get('/api/:auth/channel/:channelID', (req, res) => {
    const channelID = req.params['channelID'];

    const channel = bot.channels.cache.get(channelID);
    if (!channel) return res.send({ error: 'The specified channel could not be found' });

    res.send({ data: channel });
  });

  /* user endpoint */
  app.get('/api/:auth/user', (req, res) => {
    res.send({ error: 'No user ID was specified' });
  });

  app.get('/api/:auth/user/:userID', (req, res) => {
    const userID = req.params['userID'];

    const user = bot.users.cache.get(userID);
    if (!user) return res.send({ error: 'The specified user could not be found' });

    res.send({ data: user });
  });

  console.log('REST API attached');
}

module.exports = listen;
const express = require('express');
const server = express();
const path = require('path')
const http = express()

server.use(express.static("website", {
    extensions: ['html', 'htm'],
}));

let site = './website/index.html';

function keepAlive(bot){
  require('./REST.js')(server, bot);

  server.get("*", function(req, res, next){
    res.status(404).sendFile(__dirname + "/website/404.html");
  });

  server.listen(3000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive
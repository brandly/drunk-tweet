var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var env = require('node-env-file');
var twitterAPI = require('twitter');

env(__dirname + '/.env');

server.listen(3000);

var client = new twitterAPI({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

io.on('connection', function (socket) {
  console.log('Connected!');

  client.stream('statuses/filter', {track: 'drunk'},function (stream){
    stream.on('data', function (tweet) {
      console.log('--------------------------');
      console.log(tweet.text);

      io.sockets.emit('stream', tweet);
    });

    stream.on('error', function(error) {
      console.log('erroring');
      throw error;
    });
  });
});


app.get('/', function (req, res) {
  res.sendFile(__dirname +  '/index.html');
});

// var server = app.listen(3001, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//
//   console.log('Listenin\\' for drunk tweets...');
// });

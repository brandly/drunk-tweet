var express = require('express');
var app = express();
var env = require('node-env-file');
var twitterAPI = require('twitter');

var app = express();

env(__dirname + '/.env');

var client = new twitterAPI({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.stream('statuses/filter', {track: '#drunk'}, function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);
    });

    stream.on('error', function(error) {
      throw error;
    });
});

app.get('/', function (req, res) {
  res.send('yo yo yo');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listenin\' for drunk tweets...');
});

var express = require('express');
var path = require('path');
var StreamGameModel = require('../models/StreamGameModel.js');
var router = express.Router();

var meta = {
  title: "scatter.live",
  description: "twitch streamer, developer, content creator, person",
  url: "http://scatter.live",
  image: "http://scatter.live/favicon-96x96.png",
  type: "website",
  card: "summary",
};

var projects = [
  { name: "spurts", description: "DK64 Randomizer tracker I made in like 2 hours. Very WIP" },
  { name: "cubewave", description: "I made this for no reason. Nothing happens. It's therapeutic or something" },
  { name: "gravity", description: "Make planets and watch them interact gravitationally. Incredibly accurate simulation" },
  { name: "radii", description: "Dumb game thing where you shoot dumb green things. Cool prototype maybe" },
  { name: "rocket", description: "Try to do loops. It's pretty hard, until you figure it out and it gets easy" },
  { name: "wowiebot", description: "Semi-fully-featured Twitch chatbot. No servers, run entirely locally by you", link: "https://github.com/scatter-dev/wowiebot" },
  { name: "zootr-sim", description: "If you feel like playing a randomizer seed without playing randomizer, do this" },
];

var icons = [
  { link: "https://twitch.tv/scatter", image: "iconmonstr-twitch-1-240.png" },
    { link: "https://www.youtube.com/channel/UCZ8iLdNnq61GtOW4k_v5twg", image: "iconmonstr-youtube-6-240.png" },
    { link: "https://twitter.com/scattertv", image: "iconmonstr-twitter-1-240.png" },
    { link: "https://discord.gg/NdSKEzC ", image: "iconmonstr-discord-1-240.png" },
    { link: "https://github.com/scatter-dev ", image: "iconmonstr-github-1-240.png" },
];

streams = [
  { title: "Speedruns", games: [
    { title: "Super Mario 64", status: "In progress" },
    { title: "Donkey Kong Country", status: "In progress"},
    { title: "La-Mulana", status: "Not started"},
  ]},
  { title: "Randomizers", games: [
    { title: "Donkey Kong 64", status: "In progress"},
    { title: "La-Mulana", status: "Not started"},
    { title: "Ocarina of Time", status: "In progress"},
  ]},
  { title: "Puzz Gang", games: [
    { title: "Myst 3: Exile", status: "In progress", image: "Myst 3"},
    { title: "The Witness", status: "Not started"},
    { title: "Myst", status: "Complete"},
    { title: "Riven", status: "Complete"},
  ]},
  { title: "Metroidvanias", games: [
    { title: "La-Mulana 2", status: "In progress"},
    { title: "Axiom Verge", status: "Not started"},
    { title: "Environmental Station Alpha", status: "Not started"},
  ]},
  { title: "Misc", games: [
    { title: "Tetris 99", status: "In progress"},
    { title: "Stardew Valley", status: "Not started"},
    { title: "Celeste", status: "Not started"},
    { title: "itch.io new queue", status: "Not started"},
  ]},
];

/* GET home page. */
router.get('/', function(req, res, next) {
  StreamGameModel.find(function(err, result) {
    var doc;
    if (err) console.log(err);
    res.render('index', { title: req.hostname, meta: meta, icons: icons, projects: projects, streams: streams, upvotes: result });
  });
});

router.post('/upvoteGame', function(req, res) {
  StreamGameModel.find({title: req.body.title}, function(err, result) {
    var doc;
    if (err) console.log(err);
    else if (result.length == 0){
      doc = new StreamGameModel({title: req.body.title, upvotes: 1});
      doc.save();
    }
    else {
      result[0].upvotes++;
      result[0].save();
      doc = result[0];
    }
    res.send({upvotes: doc.upvotes});
  });
});

router.post('/downvoteGame', function(req, res) {
  StreamGameModel.find({title: req.body.title}, function(err, result) {
    var upvToSend;
    if (err) {
      console.log(err);
      upvToSend = 0;
    }
    else if (result.length == 0){
      res.send("Error: Game not found");
      upvToSend = 0;
    }
    else {
      result[0].upvotes--;
      result[0].save();
      upvToSend = result[0].upvotes
    }
    res.send({upvotes: upvToSend});
  });
});

router.get('/cubewave', function(req, res, next) {
  res.render('cubewave');
});

router.get('/rocket', function(req, res, next) {
  res.render('rocket');
});

router.get('/gravity', function(req, res, next) {
  res.render('gravity');
});

router.get('/assetcreator', function(req, res, next) {
  res.render('assetcreator');
});

router.get('/rhythm-of-the-primes', function(req, res, next) {
  res.render('rhythm-of-the-primes');
});

router.get('/crossword', function(req, res, next) {
  res.render('crossword');
})

router.get('/democracy', function(req, res, next) {
  if (req.query.channel) {
    res.render('democracy-chart');
  }
  else {
    res.render('democracy');
  }
})

module.exports = router;

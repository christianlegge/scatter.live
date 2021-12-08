var express = require('express');
var path = require('path');
var StreamGameModel = require('../models/StreamGameModel.js');
var MovieModel = require('../models/MovieModel.js');
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
	{ name: "zootr-sim", description: "Single page application browser game meant to simulate The Legend of Zelda: Ocarina of Time Randomizer playthroughs.", tech: ["AngularJS", "Express.js", "MongoDB", "Node.js", "netcode"] },
	{ name: "wowiebot", description: "Semi-fully-featured Twitch chatbot. No servers, run entirely locally by you.", link: "https://github.com/scatter-dev/wowiebot", tech: ["C#", "web sockets"] },
	{ name: "moonshot", description: "Made for Weekly Game Jam 129. Space-based survival game.", link: "https://scatter.itch.io/moonshot", tech: ["Unity"] },
	{ name: "dice n' slice", description: "Made for Miz Jam 1. Fight your way through a dungeon using dice rolls.", link: "https://scatter.itch.io/dice-n-slice", tech: ["Unity", "shaders"] },
	{ name: "inside", description: "Made for Weekly Game Jam 146. Mountain climbing platformer.", link: "https://scatter.itch.io/inside", tech: ["Godot"] },
	{ name: "spurts", description: "Single page application to track information about Donkey Kong 64 randomizer playthroughs.", tech: ["AngularJS"] },
	{ name: "rocket", description: "Try to do loops. It's pretty hard, until you figure it out and it gets easy.", tech: ["p5.js", "projectile motion"] },
	{ name: "radii", description: "Dumb game thing where you shoot dumb green things. Cool prototype maybe.", tech: ["Unity"]},
	{ name: "gravity", description: "Make planets and watch them interact gravitationally.", tech: ["p5.js", "physics simulation"] },
	{ name: "cubewave", description: "I made this for no reason. Nothing happens. It's therapeutic or something.", tech: ["p5.js", "WebGL"] },
];

var christian_socials = [
	{ link: "https://www.linkedin.com/in/christian-legge/", image: "linkedin.png" },
	{ link: "https://github.com/scatter-dev", image: "iconmonstr-github-1-240.png" },
	{ link: "https://scatter.itch.io", image: "itchio.png" },
];

var scatter_socials = [
	{ link: "https://github.com/scatter-dev", image: "iconmonstr-github-1-240.png" },
	{ link: "https://twitter.com/cool_scatter", image: "iconmonstr-twitter-1-240.png" },
	{ link: "https://twitch.tv/scatter", image: "iconmonstr-twitch-1-240.png" },
	{ link: "https://www.youtube.com/channel/UCZ8iLdNnq61GtOW4k_v5twg", image: "iconmonstr-youtube-6-240.png" },
	{ link: "https://scatter.itch.io", image: "itchio.png" },
	{ link: "https://discord.gg/NdSKEzC", image: "iconmonstr-discord-1-240.png" },
];

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: req.hostname, email: req.hostname == "scatter.live" ? "scatter@scatter.live" : "christian@christianlegge.dev", meta: meta, socials: req.hostname == "scatter.live" ? scatter_socials : christian_socials, projects: projects });
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

router.get('/crossword', function (req, res, next) {
	res.render('crossword');
});

router.get('/silph', function (req, res, next) {
	res.render('silph');
});

router.get('/wordlengths', function (req, res, next) {
	res.render('wordlengths');
});

router.get('/democracy', function(req, res, next) {
	if (req.query.channel) {
		res.render('democracy-chart');
	}
	else {
		res.render('democracy');
	}
});

// oscar movie stuff, personal use only
router.get('/watched_nominees.json', function (req, res, next) {
	MovieModel.find({}, function (err, movies) {
		toSend = {};
		toSend.titles = [];
		for (i in movies) {
			toSend.titles.push(movies[i].title);
		}
		res.send(toSend);
	});
});

router.post('/watched_nominees.json', function (req, res, next) {
	if (req.body.key != process.env.MOVIE_KEY) {
		res.sendStatus(401);
		next();
	}
	MovieModel.find({}, function (err, movies) {
		for (var i = 0; i < req.body.movies.length; i++) {
			if (!movies  || movies.filter(x => x.title == req.body.movies[i]).length == 0) {
				var movie = new MovieModel({title: req.body.movies[i]});
				movie.save();
			}
		}
		res.sendStatus(200);
	});
});

module.exports = router;

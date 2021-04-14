var express = require('express');
var fs = require('fs');
var path = require('path');
var axios = require('axios');
var csv_parse = require('csv-parse/lib/sync');
var OscarPredictionModel = require('../models/OscarPredictionModel.js');
var router = express.Router();

var movieInfo = {};

var meta = {
	title: "Spurts Tracker",
	description: "DK64 Rando Tracker",
	url: "http://scatter.live/spurts",
	image: "http://scatter.live/images/spurts.png",
	type: "website",
	card: "summary",
};

var ids = {
	"Collective": "618363",
	"The Life Ahead (La Vita Davanti a Se)": "667869",
	"Notturno": "539529",
	"The Painter and the Thief": "654170",
	"Charlatan": "501738",
	"Two of Us": "621744",
	"Better Days": "575813",
	"Hope": "616561",
	"A Sun": "622951",
	"Pinocchio": "413518",
	"Belly of the Beast": "717245",
	"Opera": "750249",
	"Out": "706860",
	"Time": "653729",
	"Traces": "638382",
	"The Present": "678801",
	"The Van": "596253",
};

var overwrites = {
	"Colette": {
		"synopsis": "On the anniversary of the start of the Nuremberg trials, 90-year-old Colette Marin-Catherine confronts her past by visiting the German concentration camp Mittelbau-Dora where her brother was killed. As a young girl, she fought Hitler's Nazis as a member of the French Resistance. For 74 years, she has refused to step foot in Germany, but that changes when a young history student named Lucie enters her life. Prepared to  re-open old wounds and revisit the terrors of that time, Marin-Catherine offers important lessons for us all.",
		"date": "2020-11-18",
		"poster": "http://i3.ytimg.com/vi/J7uBf1gD6JY/maxresdefault.jpg",
		"runtime": 25
	}
}

var nominees_file = fs.readFileSync("data/oscar-nominees-2021.csv", "utf8");
var nominees_object = csv_parse(nominees_file, {columns: true});

var categories = {};

for (movie in nominees_object) {
	var lines = nominees_object[movie].Description.split(/\r?\n/);
	for (var i = 0; i < lines.length; i += 3) {
		if (!(lines[i] in categories)) {
			categories[lines[i]] = [];
		}
		var item = { "Name": nominees_object[movie].Name, "Nominee": lines[i+1] };
		categories[lines[i]].push(item);
	}
}

router.get('/', async function(req, res, next) {
	for (movieidx in nominees_object) {
		var movie = nominees_object[movieidx].Name
		if (!(movie in movieInfo)) {
			var response, info = {};
			if (movie in ids) {
				response = await axios.get("https://api.themoviedb.org/3/movie/"+ids[movie]+"?api_key=f3a8bea9ebdec460c1a9aca029660a24");
				response = response["data"];
			}
			else {
				response = await axios.get("https://api.themoviedb.org/3/search/movie?api_key=f3a8bea9ebdec460c1a9aca029660a24&query=" + encodeURI(movie));
				response = await axios.get("https://api.themoviedb.org/3/movie/" + response["data"]["results"][0]["id"] + "?api_key=f3a8bea9ebdec460c1a9aca029660a24");
				response = response["data"];
			}
			info["synopsis"] = response["overview"];
			info["poster"] = "https://image.tmdb.org/t/p/w500" + response["poster_path"];
			info["date"] = response["release_date"];
			info["runtime"] = response["runtime"];
			info["genres"] = [];
			for (let genre of response["genres"]) {
				info["genres"].push(genre["name"]);
			}
			movieInfo[movie] = info;
		}
	}
	for (movie in overwrites) {
		movieInfo[movie] = overwrites[movie];
	}
	res.render('oscar-predictions', { categories: categories, movieInfo: movieInfo });
});

router.post('/submit-responses', async function(req, res, next) {
	if (!req.body.responses || !req.body.user) {
		res.sendStatus(400);
		return;
	}
	var user = req.body.user;
	for (category in req.body.responses) {
		for (type in req.body.responses[category]) {
			if (req.body.responses[category][type] == "") {
				continue;
			}
			var doc = await OscarPredictionModel.findOne({user: user, category: category, wanted: type == "want"});
			if (doc) {
				if (!req.body.confirmed && doc.film != req.body.responses[category][type]) {
					res.send({overwrite: true});
					return;
				}
				doc.film = req.body.responses[category][type];
			}
			else {
				doc = new OscarPredictionModel({
					user: user,
					category: category,
					film: req.body.responses[category][type],
					wanted: type == "want"
				});
			}
			doc.save();
		}
	}
	res.sendStatus(200);
});

module.exports = router;


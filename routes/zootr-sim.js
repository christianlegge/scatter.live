var express = require('express');
var path = require('path');
var request = require('request');
var uuid = require('uuid');
var simHelper = require("../zootr-sim/helper.js");
var router = express.Router();
var playthroughModel = require('../models/SimPlaythroughModel.js')

var meta = {
	title: "ZOoTR Sim",
	description: "Simulator to practice and play Ocarina of Time Randomizer seeds.",
	url: "http://scatter.live/zootr-sim",
	image: "http://scatter.live/images/zootr-sim/ocarina.png",
	type: "website",
	card: "summary",
};

function parseLog(logfile) {
	if (typeof logfile == 'string') {
		logfile = JSON.parse(logfile);
	}
	if(!(":version" in logfile) || logfile[":version"] != "5.2.0 Release") {
		throw "Incorrect version.";
	}
		
	/*
	$scope.currentSpoilerLog = logfile;
	if (logfile['settings']['entrance_shuffle'] != "off") {
		alert("Error! Entrance shuffle is not supported.");
		return;
	}
	else if (logfile['settings']['world_count'] != 1) {
		alert("Error! Multiworld is not supported.");
		return;
	}
	try {
		$scope.currentSeed = logfile[':seed'];
		var results = logfile['locations'];
		$scope.fsHash = logfile['file_hash'];
		$scope.isShopsanity = logfile['settings']['shopsanity'] != 'off';

		$scope.totalChecks = results.length;
		for (var loc in results) {
			item = typeof results[loc] == 'object' ? results[loc]['item'] : results[loc];
			var shop = getShop(loc);
			if (shop != '') {
				var cost = results[loc]['price'];
				if (!(shop in $scope.shopContents)) {
					$scope.shopContents[shop] = [];
				}
				var shopItem = {};
				var refill = item.includes('Buy');
				shopItem['item'] = refill ? item.split('Buy')[1].trim() : item;
				shopItem['item'] = shopItem['item'].split('[')[0].trim();
				shopItem['cost'] = cost;
				shopItem['refill'] = refill;
				shopItem['bought'] = false;
				$scope.shopContents[shop].push(shopItem);
			}
			$scope.allLocations[loc] = item;
			$scope.itemCounts[item] = 0;
		}
		for (var hint in logfile['gossip_stones']) {
			region = hint.split('(')[0].trim();
			if (region == 'Zoras River') region = 'Zora River';
			if (region == 'Graveyard') region = 'Above Graveyard';
			if (region == 'Kakariko') region = 'Kakariko Village';
			stone = hint.split('(')[1].split(')')[0].trim();
			if (!(region in $scope.gossipHints)) {
				$scope.gossipHints[region] = {};
			}
			$scope.gossipHints[region][stone] = logfile['gossip_stones'][hint]['text'].replace(/#/g, '');
		}
		$scope.checkedLocations.push('Links Pocket');
		$scope.currentItemsAll.push($scope.allLocations['Links Pocket']);
		$scope.numChecksMade++;
		$scope.knownMedallions['Free'] = $scope.allLocations['Links Pocket'];
		$scope.medallions['Free'] = $scope.allLocations['Links Pocket'];
		$scope.medallions['Deku Tree'] = $scope.allLocations['Queen Gohma'];
		$scope.medallions['Dodongos Cavern'] = $scope.allLocations['King Dodongo'];
		$scope.medallions['Jabu Jabus Belly'] = $scope.allLocations['Barinade'];
		$scope.medallions['Forest Temple'] = $scope.allLocations['Phantom Ganon'];
		$scope.medallions['Fire Temple'] = $scope.allLocations['Volvagia'];
		$scope.medallions['Water Temple'] = $scope.allLocations['Morpha'];
		$scope.medallions['Shadow Temple'] = $scope.allLocations['Bongo Bongo'];
		$scope.medallions['Spirit Temple'] = $scope.allLocations['Twinrova'];
		$scope.playing = true;
		$scope.route += '---- CHILD ' + $scope.currentChild + ' ----\n\n';
		$scope.updateForage();
	}
	catch (err) {
		console.log(err);
		alert('Error parsing file! Please choose a randomizer spoiler log.');
	}

	*/
	var doc = new playthroughModel({
		locations: logfile["locations"],
		checked_locations: ["Links Pocket"],
		current_items: Object.keys(logfile["starting_items"]).concat(logfile["locations"]["Links Pocket"]),
		start_time: Date.now(),
		hash: logfile["file_hash"],
		entrances: logfile["entrances"],
		hints: logfile["gossip_stones"],
		known_hints: {},
		current_age: logfile["settings"]["starting_age"] == "random" ? logfile["randomized_settings"]["starting_age"] : logfile["settings"]["starting_age"],
		known_medallions: new Map(),
		settings: logfile["settings"],
		dungeons: logfile["dungeons"],
		trials: logfile["trials"],
	});
	if (!doc.current_age) {
		doc.current_age = "child";
	}
	doc.current_region = doc.current_age == "child" ? "Kokiri Forest" : "Temple of Time";
	doc.known_medallions.set("Free", logfile["locations"]["Links Pocket"]);
	doc.save();
	return {
		id: doc._id,
		hash: logfile["file_hash"],
		locations: Object.keys(logfile["locations"]),
		current_items: Object.keys(logfile["starting_items"]).concat(logfile["locations"]["Links Pocket"]),
		current_age: doc.current_age,
		current_region: doc.current_region,
		checked_locations: ["Links Pocket"],
		known_hints: {},
		known_medallions: doc.known_medallions,
	};
}

router.get('/', function(req, res, next) {
	res.render('zootr-sim', {meta: meta});
});

router.get('/resume', function(req, res, next) {
	var id = req.query.id;
	playthroughModel.findById(id, function(err, result) {
		if (err) {
			res.sendStatus(400);
			return;
		}
		if (result == null) {
			res.sendStatus(404);
			return;
		}
		var info = {
			id: result._id,
			hash: result.hash,
			locations: Array.from(result.locations.keys()),
			current_items: result.current_items,
			current_age: result.current_age,
			current_region: result.current_region,
			checked_locations: result.checked_locations,
			known_hints: result.known_hints,
			known_medallions: result.known_medallions,
		};
		res.send(info);
	});
});

router.get('/checklocation/:playthroughId/:location', function(req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (result.checked_locations.includes(req.params["location"])) {
			res.send(400);
			return;
		}
		if (simHelper.canCheckLocation(result, req.params["location"])) {
			var item = result.locations.get(req.params["location"]);
			if (typeof item == "object") {
				item = item["item"];
			}
			if (!(req.params["location"] in result.locations) && req.params["location"].startsWith("GS ")) {
				item = "Gold Skulltula Token";
			}
			if (!(req.params["location"] in result.locations) && req.params["location"] == "Gift from Saria") {
				item = "Ocarina";
			}
			result.current_items.push(item);
			result.checked_locations.push(req.params["location"]);
			result.save();
			res.send(item);
		}
		else {
			res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.location));
		}
	});
});

router.get('/checkhint/:playthroughId/:stone', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (result.checked_locations.includes(req.params["stone"])) {
			res.send(400);
			return;
		}
		if (simHelper.canCheckLocation(result, req.params["stone"])) {
			var hint = simHelper.getHint(result, req.params["stone"]);
			if (result.known_hints.has(hint.hint[0])) {
				result.known_hints.get(hint.hint[0]).push(hint.hint[1]);
			}
			else {
				result.known_hints.set(hint.hint[0], [hint.hint[1]]);
			}
			result.checked_locations.push(req.params["stone"]);
			result.save();
			res.send({ text: hint.hint_text, known_hints: result.known_hints });
		}
		else {
			res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.stone));
		}
	});
});

router.get('/updateregion/:playthroughId/:region/:age', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		result.current_region = req.params["region"];
		result.current_age = req.params["age"];
		result.save();
		res.sendStatus(200);
	});
});

router.get('/testallrules', function (req, res, next) {
	playthroughModel.findOne({ _id: "5edd4aae9a4af366f4600dbb" }, function (err, result) {
		try {
			res.send(simHelper.testAllRules(result));
		}
		catch (err) {
			res.send(err);
		}
	});
});

router.get('/getlocations/:playthroughId/:region', function(req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		var locs = simHelper.getLocations(result, req.params["region"]);
		res.send(locs);
	});
})

router.get('/badgateway', function(req, res, next) {
	res.sendStatus(502);
});

router.get('/getspoiler', function(req, res, next) {
	if (req.query.valid) {
		request('https://www.ootrandomizer.com/api/seed/create?key=' + process.env.ZOOTRAPIKEY + '&version=5.2.0&settingsString=' + req.query.settings + '&seed=' + req.query.seed, function (error, response, body) {
			if (error && error.code == "ETIMEDOUT") {
				res.sendStatus(408);
				return;
			}
			else if (response.statusCode == 502) {
				res.sendStatus(502);
				return;
			}
			else if (body.includes("Invalid API Key")) {
				res.sendStatus(401);
				return;
			}
			else if (body.includes("Invalid randomizer settings")) {
				res.sendStatus(403);
				return;
			}
			else if (body.includes("Game unbeatable")) {

			}
			else if (body.includes("Traceback")) {
				if (body.includes("get_settings_from_command_line_args")) {
					res.sendStatus(400);
					return;
				}
			}
			res.send(parseLog(body));
		});
	}
	else {
		res.sendStatus(403);
	}
});

router.post('/uploadlog', function(req, res, next) {
	try {
		res.send(parseLog(req["body"]));
	}
	catch (e) {
		res.send(e, status=400);
	}
});

module.exports = router;


var express = require('express');
var path = require('path');
var request = require('request');
var uuid = require('uuid');
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
	}/*
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
		if (logfile['settings']['starting_age'] == 'adult' || (logfile['settings']['starting_age'] == 'random' && logfile['randomized_settings']['starting_age'] == 'adult')) {
			$scope.currentAge = "Adult";
			$scope.currentRegion = "Temple of Time";
		}
		else {
			$scope.currentAge = "Child";
			$scope.currentRegion = "Kokiri Forest";
		}
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
		if (!('Kokiri Sword Chest' in $scope.allLocations)) {
			$scope.allLocations['Kokiri Sword Chest'] = 'Kokiri Sword';
		}
		if (logfile['settings']['start_with_deku_equipment']) {
			$scope.itemCounts['Deku Shield'] = 1;
		}
		$scope.itemCounts['Ocarina'] = 0;
		$scope.itemCounts['Bombchus'] = 0;
		$scope.itemCounts['Gold Skulltula Token'] = 0;
		$scope.itemCounts['Kokiri Sword'] = 0;
		$scope.itemCounts['Nayrus Love'] = 0;
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
	});
	console.log(doc);
	doc.save();
	return {
		id: doc._id,
		hash: logfile["file_hash"],
		locations: Object.keys(logfile["locations"]),
		current_items: Object.keys(logfile["starting_items"]).concat(logfile["locations"]["Links Pocket"]),
		starting_age: logfile["settings"]["starting_age"] == "random" ? logfile["randomized_settings"]["starting_age"] : logfile["settings"]["starting_age"],
		checked_locations: ["Links Pocket"],
	};
}


router.get('/', function(req, res, next) {
	res.render('zootr-sim', {meta: meta});
});

router.get('/resume', function(req, res, next) {
	var id = req.query.id;
	console.log(typeof id);
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
			locations: Object.keys(result.locations),
			current_items: result.current_items,
			starting_age: "Child",
			checked_locations: result.checked_locations,
		};
		res.send(info);
	});
});

router.get('/checklocation/:playthroughId/:location', function(req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (result.checkedLocations.includes(req.params["location"])) {
			res.send(400);
			return;
		}
		var item = result.locations.get(req.params["location"]);
		if (typeof item == "object") {
			item = item["item"];
		}
		result.currentItems.push(item);
		result.checkedLocations.push(req.params["location"]);
		result.save();
		res.send(item);
	});
});

router.get('/getspoiler', function(req, res, next) {
	if (req.query.valid) {
		request('https://www.ootrandomizer.com/api/seed/create?key='+process.env.ZOOTRAPIKEY+'&version=5.1.0&settingsString='+req.query.settings+'&seed='+req.query.seed, function (error, response, body) {
			res.send(parseLog(body));
		});
	}
	else {
		res.sendStatus(403);
	}
});

router.post('/uploadlog', function(req, res, next) {
	res.send(parseLog(req["body"]));
});

module.exports = router;


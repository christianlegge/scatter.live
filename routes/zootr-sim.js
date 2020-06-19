var express = require('express');
var path = require('path');
var request = require('request');
var uuid = require('uuid');
var simHelper = require("../zootr-sim/helper.js");
var router = express.Router();
var playthroughModel = require('../models/SimPlaythroughModel.js');
var leaderboardModel = require('../models/SimLeaderboardModel.js');
var multiworldModel = require('../models/MultiworldPlaythroughModel.js');
var mongoose = require('mongoose');

function regexEscape(str) {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var multiworld_callbacks = {};
var lobby_callbacks = {};

var meta = {
	title: "ZOoTR Sim",
	description: "Simulator to practice and play Ocarina of Time Randomizer seeds.",
	url: "http://scatter.live/zootr-sim",
	image: "http://scatter.live/images/zootr-sim/ocarina.png",
	type: "website",
	card: "summary",
};

if (process.env.DEBUG) {
	router.get("/populatelb", function(req, res, next) {
		for (var i = 0; i < 200; i++) {
			var total_checks = Math.floor(Math.random() * 200 + 200);
			var checked_locations = Math.floor(Math.random() * total_checks);
			var lb = new leaderboardModel({
				name: Math.random().toString(36).substring(7),
				checked_locations: checked_locations,
				total_locations: total_checks,
				settings: {},
				playtime: Math.floor(Math.random() * 86400),
				finish_date: Math.floor(Math.random() * 1000000000 + Date.now()),
			});
			lb.save();
		}
		res.send("Success");
	});
}

function toAgeString(s) {
	var age = (Date.now() - s)/1000;
	var unit, factor;
	if (age < 60) {
		unit = "second";
		factor = 1;
	}
	else if (age < 60*60) {
		unit = "minute";
		factor = 60;
	}
	else if (age < 60*60*24) {
		unit = "hour";
		factor = 60*60;
	}
	else if (age < 60*60*24*7) {
		unit = "day";
		factor = 60*60*24;
	}
	else if (age < 60*60*24*30) {
		unit = "week";
		factor = 60*60*24*7;
	}
	else if (age < 60*60*24*365) {
		unit = "month";
		factor = 60*60*24*30;
	}
	else {
		unit = "year";
		factor = 60*60*24*365;
	}
	var amount = Math.floor(age/factor);
	return `${amount} ${unit}${amount == 1 ? "" : "s"} ago`;
}

function submitToLeaderboard(playthrough) {
	if (!playthrough.use_logic) {
		return;
	}
	var lb = new leaderboardModel({
		_id: playthrough._id,
		checked_locations: playthrough.num_checks_made,
		total_locations: playthrough.total_checks,
		settings: playthrough.settings,
		playtime: playthrough.playtime,
		finish_date: playthrough.start_time + playthrough.playtime,
	});
	lb.save();
}

function getPercentiles(playthrough) {
	return Promise.all([
		leaderboardModel.countDocuments().where("playtime").gt(playthrough.playtime),
		leaderboardModel.countDocuments().where("checked_locations").gt(playthrough.num_checks_made),
		leaderboardModel.estimatedDocumentCount()
	]);
}

function parseLog(logfile, use_logic) {
	if (typeof logfile == 'string') {
		logfile = JSON.parse(logfile);
	}
	if(!(":version" in logfile) || logfile[":version"] != "5.2.0 Release") {
		throw "Incorrect version.";
	}

	if (logfile.settings.world_count == 1) {
		for (loc in logfile.locations) {
			if (typeof logfile.locations[loc] == "object") {
				var newname = logfile.locations[loc].item.split("[")[0].trim();
				logfile.locations[loc].item = newname;
			}
		}
		var doc = new playthroughModel({
			use_logic: use_logic,
			locations: logfile["locations"],
			entrances: logfile.entrances,
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
			child_wind: "",
			adult_wind: "",
			bombchu_count: 0,
			route: [],
			playtime: 0,
			num_checks_made: 0,
		});
		if (!doc.current_age) {
			doc.current_age = "child";
		}
		doc.route.push(doc.current_age.toUpperCase() + " 1");
		doc.current_region = doc.current_age == "child" ? "Kokiri Forest" : "Temple of Time";
		doc.current_subregion = doc.current_age == "child" ? "Links House" : "Temple of Time";
		doc.known_medallions.set("Free", logfile["locations"]["Links Pocket"]);
		doc.save();

		return {
			id: doc._id,
			start_time: doc.start_time,
			hash: logfile["file_hash"],
			locations: Object.keys(logfile["locations"]),
			current_items: Object.keys(logfile["starting_items"]).concat(logfile["locations"]["Links Pocket"]),
			current_age: doc.current_age,
			current_region: doc.current_region,
			current_subregion: doc.current_subregion,
			checked_locations: ["Links Pocket"],
			known_hints: {},
			known_medallions: doc.known_medallions,
			child_wind: doc.child_wind,
			adult_wind: doc.adult_wind,
			bombchu_count: 0,
			logic_rules: logfile.settings.logic_rules,
			player_count: logfile.settings.world_count,
		};
	}
	else {
		var mw_doc = new multiworldModel({
			log: logfile,
			active: false,
			num_players: logfile.settings.world_count,
			players: [],
			created_at: Date.now(),
		});
		mw_doc.save();
		return {
			multiworld_id: mw_doc._id,
			players: mw_doc.players,
		};
	}
}

router.get('/', function(req, res, next) {
	res.render('zootr-sim', {meta: meta});
});

router.get('/getmwgames', function (req, res, next) {
	multiworldModel.find({ active: false }).sort({ created_at: "desc" }).then(function (result) {
		var games = result.map(x => ({ id: x._id, total_players: x.num_players, current_players: x.players.length, name: x.players.length > 0 ? x.players[0].name : "-", age: toAgeString(x.created_at) }));
		res.send(games);
	});
});

router.get('/getlobbyinfo/:id', function (req, res, next) {
	multiworldModel.findById(req.params.id).then(function (result) {
		res.send(result.players);
	});
});

router.get('/readyup/:id', function (req, res, next) {
	playthroughModel.findById(req.params.id).then(function (result) {
		multiworldModel.findById(result.multiworld_id).then(function(mw) {
			mw.players.filter(x => x.id == req.params.id)[0].ready = true;
			mw.save();
			if (mw._id in lobby_callbacks) {
				lobby_callbacks[mw._id].forEach(function (callback) {
					callback({ readied: result._id });
				});
			}
		})
	});
});

router.get('/lobbyconnect/:id', function(req, res, next) {
	if (!(req.params.id in lobby_callbacks)) {
		lobby_callbacks[req.params.id] = [];
	}
	var callback = function (message) {
		res.write(`data: ${JSON.stringify(message)}\n\n`);
	};
	lobby_callbacks[req.params.id].push(callback);

	res.set({
		"Cache-Control": "no-cache",
		"Content-Type": "text/event-stream",
		"Connection": "keep-alive",
	});
	res.flushHeaders();
	res.write("retry: 10000\n\n");

	req.on("close", function () {
		var index = lobby_callbacks[req.params.id].indexOf(callback);
		lobby_callbacks[req.params.id].splice(index, 1);
		if (lobby_callbacks[req.params.id].length == 0) {
			delete lobby_callbacks[req.params.id];
		}
	});
});

router.get('/joinlobby/:id/:name', function(req, res, next) {
	multiworldModel.findById(req.params.id).then(function(result) {
		if (result.players.length >= result.num_players) {
			res.sendStatus(400);
			return;
		}
		var new_player = {
			name: req.params.name,
			id: new mongoose.Types.ObjectId(),
			ready: false,
			num: result.players.length + 1,
		};
		var player_doc = new playthroughModel({
			_id: new_player.id,
			multiworld_id: result._id,
		});
		player_doc.save();
		if (result._id in lobby_callbacks) {
			lobby_callbacks[result._id].forEach(function(callback) {
				callback({joined: new_player});
			});
		}
		if (result.players.length < result.num_players) {
			result.players.push(new_player);
			result.save();
		}
		res.send(new_player.id);
	});
});

router.get('/resume', async function(req, res, next) {
	var id = req.query.id;
	playthroughModel.findById(id, async function(err, result) {
		if (err) {
			res.sendStatus(400);
			return;
		}
		if (result == null) {
			res.sendStatus(404);
			return;
		}
		var percentiles, mw_doc;
		if (result.finished) {
			percentiles = await getPercentiles(result);
		}
		if (result.multiworld_id) {
			mw_doc = await multiworldModel.findById(result.multiworld_id)
		}
		var info = {
			playing: mw_doc ? mw_doc.active : true,
			multiworld_id: result.multiworld_id,
			id: result._id,
			players: mw_doc.players,
			in_mw_party: mw_doc ? true : false,
			hash: result.hash,
			locations: result.locations ? Array.from(result.locations.keys()) : null,
			current_items: result.current_items,
			current_age: result.current_age,
			current_region: result.current_region,
			current_subregion: result.current_subregion,
			checked_locations: result.checked_locations,
			known_hints: result.known_hints,
			known_medallions: result.known_medallions,
			bombchu_count: result.bombchu_count,
			start_time: result.start_time,
			route: result.route,
			playtime: result.playtime,
			finished: result.finished,
			child_wind: result.child_wind,
			adult_wind: result.adult_wind,
			num_checks_made: result.num_checks_made,
			total_checks: result.total_checks,
			used_logic: result.use_logic,
			percentiles: percentiles ? {time: (100*percentiles[0]/percentiles[2]).toFixed(2), checks: (100*percentiles[1]/percentiles[2]).toFixed(2)} : null
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
		if (simHelper.canCheckLocation(result, req.params["location"]) || (result.current_age == "child" && req.params["location"] == "Treasure Chest Game" && Math.floor(Math.random() * 32) == 0)) {
			if (req.params["location"] == "Check Pedestal") {
				result.known_medallions = simHelper.checkPedestal(result, result.current_age, result.known_medallions);
				result.save();
				if (result.current_age == "adult") {
					result.checked_locations.push("Check Pedestal");
				}
				res.send(result.known_medallions);
				return;
			}
			else if (req.params["location"] == "Master Sword Pedestal") {
				result.current_age = result.current_age == "child" ? "adult" : "child";
				result.route.push("");
				if (result.current_age == "child") {
					result.route.push(`CHILD ${result.route.filter(x => x.includes("CHILD")).length + 1}`);
				}
				else {
					result.route.push(`ADULT ${result.route.filter(x => x.includes("ADULT")).length + 1}`);
				}
				result.save();
				res.send(result.current_age);
				return;
			}
			else if (req.params.location == "Ganon") {
				result.finished = true;
				result.playtime = Date.now() - result.start_time;
				result.num_checks_made = result.checked_locations.length;
				result.total_checks = Array.from(result.locations.keys()).length;
				result.save();
				if (result.use_logic) {
					submitToLeaderboard(result);
				}
				getPercentiles(result).then(function(percentiles) {
					res.send({ percentiles: { time: (100 * percentiles[0] / percentiles[2]).toFixed(2), checks: (100 * percentiles[1] / percentiles[2]).toFixed(2) }, used_logic: result.use_logic, route: result.route, finished: true, playtime: result.playtime, num_checks_made: result.num_checks_made, total_checks: result.total_checks });
				});
				return;
			}
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
			if (req.params.location == "Impa at Castle") {
				result.current_items.push("Zeldas Letter");
			}
			if (item.startsWith("Buy ")) {
				item = item.substr(4, item.length - 4);
			}
			else {
				result.checked_locations.push(req.params["location"]);
			}
			result.route.push(`${req.params.location}${simHelper.isEssentialItem(item) ? " (" + item + ")" : ""}`);
			result.current_items.push(item);
			
			if (["Kokiri Emerald", "Goron Ruby", "Zora Sapphire", "Light Medallion", "Forest Medallion", "Fire Medallion", "Water Medallion", "Spirit Medallion", "Shadow Medallion"].includes(item) && !(result.known_medallions.has(result.current_region))) {
				result.known_medallions.set(result.current_region, item);
			}
			if (item.includes("Bombchu")) {
				result.bombchu_count += parseInt(item.substring(item.lastIndexOf('(') + 1, item.lastIndexOf(')')), 10);
				if (result.settings.get("bombchus_in_logic")) {
					result.bombchu_count += 10000;
				}
			}
			if (simHelper.needChus(result, req.params.location)) {
				result.bombchu_count--;
			}
			var subregion = simHelper.subregionFromLocation(req.params.location);
			result.current_subregion = subregion;
			var response_obj = { item: item, checked_locations: result.checked_locations, region: result.current_region, subregion: result.current_subregion, known_medallions: result.known_medallions, bombchu_count: result.bombchu_count };
			if (req.params.location in simHelper.region_changing_checks) {
				result.current_region = simHelper.region_changing_checks[req.params.location][0];
				response_obj.region = result.current_region;
				result.current_subregion = simHelper.region_changing_checks[req.params.location][1];
				response_obj.subregion = result.current_subregion;
				response_obj.region_changed = true;
			}
			result.save();
			res.send(response_obj);
		}
		else {
			res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.location));
		}
	});
});

router.get('/throwaway/:playthroughId', function(req, res, next) {
	playthroughModel.deleteOne({_id: req.params.playthroughId}, function(err, result) {
		res.sendStatus(200);
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
			var subregion = simHelper.subregionFromLocation(req.params.stone);
			result.current_subregion = subregion;
			if (result.known_hints.has(hint.hint[0])) {
				var arr = result.known_hints.get(hint.hint[0]);
				arr.push(hint.hint[1]);
				result.known_hints.set(hint.hint[0], arr);
			}
			else {
				result.known_hints.set(hint.hint[0], [hint.hint[1]]);
			}
			if (simHelper.needChus(result, req.params.stone)) {
				result.bombchu_count--;
			}
			result.checked_locations.push(req.params["stone"]);
			result.save();
			res.send({ text: hint.hint_text, subregion: subregion, bombchu_count: result.bombchu_count, known_hints: result.known_hints });
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

router.get('/submitname/:playthroughId/:name', function (req, res, next) {
	leaderboardModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (!result.name) {
			result.name = req.params.name;
			result.save();
			res.sendStatus(200);
		}
		else {
			res.sendStatus(403);
		}
	});
});

router.get('/takeentrance/:playthroughId/:entrance', function(req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (req.params.entrance.includes("Savewarp")) {
			if (result.current_age == "child") {
				result.current_region = "Kokiri Forest";
				result.current_subregion = "Links House";
			}
			else if (result.current_age == "adult") {
				result.current_region = "Temple of Time";
				result.current_subregion = "Temple of Time";
			}
			result.save();
			res.send({ region: result.current_region, subregion: result.current_subregion });
			return;
		}
		if (simHelper.canCheckLocation(result, req.params["entrance"])) {
			result.current_region = simHelper.getParentRegion(req.params["entrance"]);
			result.current_subregion = req.params["entrance"];
			result.save();
			res.send({region: result.current_region, subregion: result.current_subregion});
		}
		else {
			res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.entrance));
		}
	});
})

router.get('/testallrules', function (req, res, next) {
	playthroughModel.findOne({ _id: "5edd858f985c1a72d9ea49bf" }, function (err, result) {
		try {
			res.send(simHelper.testAllRules(result));
		}
		catch (err) {
			res.send(err);
		}
	});
});

router.get('/getlocations/:playthroughId/:region', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		var locs = simHelper.getLocations(result, req.params["region"]);
		var shops = simHelper.getShops(result, req.params.region);
		res.send({locations: locs, shops: shops});
	});
})

router.get('/getentrances/:playthroughId/:region', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		var entrances = simHelper.getEntrances(result, req.params["region"]);
		res.send(entrances);
	});
})

router.get('/setwind/:playthroughId/:age/:region', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (result.current_items.includes("Farores Wind") && result.current_items.includes("Magic Meter")) {
			if (result.current_age == "child") {
				result.child_wind = req.params.region;
			}
			else {
				result.adult_wind = req.params.region;
			}
			result.save();
			res.sendStatus(200);
		}
		else {
			res.sendStatus(403);
		}
	});
})

router.get('/recallwind/:playthroughId/:age', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (result.current_items.includes("Farores Wind") && result.current_items.includes("Magic Meter")) {
			if (result.current_age == "child") {
				if (result.child_wind) {
					res.send(result.child_wind);
					result.child_wind = "";
					result.save();
				}
				else {
					res.sendStatus(400);
				}
			}
			else {
				if (result.adult_wind) {
					res.send(result.adult_wind);
					result.adult_wind = "";
					result.save();
				}
				else {
					res.sendStatus(400);
				}
			}
		}
		else {
			res.sendStatus(403);
		}
	});
})

router.get('/peek/:playthroughId/:location', function (req, res, next) {
	playthroughModel.findOne({ _id: req.params["playthroughId"] }, function (err, result) {
		if (simHelper.parseLogicRule(result, `can_reach('${simHelper.subregionFromLocation(req.params.location)}')`)) {
			if (result.known_hints.has(req.params.location)) {
				result.known_hints.get(req.params.location).push(result.locations.get(req.params.location));
			}
			else {
				result.known_hints.set(req.params.location, [result.locations.get(req.params.location)]);
			}
			if (simHelper.needChus(result, simHelper.subregionFromLocation(req.params.location))) {
				result.bombchu_count--;
			}
			result.save();
			res.send({bombchu_count: result.bombchu_count, known_hints: result.known_hints, item: result.locations.get(req.params.location)});
		}
		else {
			res.sendStatus(403);
		}
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
			res.send(parseLog(body, req.query.logic));
		});
	}
	else {
		res.sendStatus(403);
	}
});

router.post('/uploadlog', function(req, res, next) {
	try {
		var parsed_log = parseLog(req.body, req.query.logic);
		res.send(parsed_log);
	}
	catch (e) {
		console.error(e);
		res.send(e, status=400);
	}
});

router.get('/leaderboard', function(req, res, next) {
	leaderboardModel.estimatedDocumentCount().then(function(count) {
		res.render("zootr-sim-leaderboard", { meta: meta, count: count });
	});
});

router.get('/getleaderboardentries/:count/:sortfield/:ascdesc/:page', function(req, res, next) {
	var sortObj = {};
	sortObj[req.params.sortfield] = req.params.ascdesc;
	leaderboardModel.find({name: new RegExp(regexEscape(req.query.name, "i"))}).limit(Math.min(req.params.count, 100)).sort(sortObj).skip(Math.min(req.params.count, 100) * (req.params.page - 1)).then(function(entries) {
		if (req.query.name) {
			leaderboardModel.countDocuments().where({ name: new RegExp(regexEscape(req.query.name, "i")) }).then(function(count) {
				res.send({entries: entries, count: count});
			})
		}
		else {
			res.send({entries: entries});
		}
	}, function(error) {
		console.error(error);
		res.status(500).send(error);
	});
});

router.get('/multiworldconnect', function(req, res, next) {
	res.set({
		"Cache-Control": "no-cache",
		"Content-Type": "text/event-stream",
		"Connection": "keep-alive",
	});
	res.flushHeaders();
	res.write("retry: 10000\n\n");
	res.write(`data: ${Math.random()}\n\n`);
	var count = 0;
	multiworld_callbacks[0] = function() {
		res.write(`data: ${Math.random()}\n\n`);
	}

	req.on("close", function() {
	});
});

router.get('/multiworldsend', function(req, res, next) {
	multiworld_callbacks[0]();
	res.sendStatus(200);
})

module.exports = router;


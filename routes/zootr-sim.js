var express = require('express');
var request = require('request');
var simHelper = require("../zootr-sim/helper.js");
var router = express.Router();
var playthroughModel = require('../models/SimPlaythroughModel.js');
var leaderboardModel = require('../models/SimLeaderboardModel.js');
var multiworldModel = require('../models/MultiworldPlaythroughModel.js');
var mongoose = require('mongoose');
const MultiworldPlaythroughModel = require('../models/MultiworldPlaythroughModel.js');

function regexEscape(str) {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var warp_songs = {
	"Prelude of Light": {
		region: "Temple of Time",
		subregion: "Temple of Time",
	},
	"Minuet of Forest": {
		region: "Sacred Forest Meadow",
		subregion: "Sacred Forest Meadow",
	},
	"Bolero of Fire": {
		region: "Death Mountain Crater",
		subregion: "Death Mountain Crater Central Local",
	},
	"Serenade of Water": {
		region: "Lake Hylia",
		subregion: "Lake Hylia",
	},
	"Nocturne of Shadow": {
		region: "Graveyard",
		subregion: "Shadow Temple Warp Region",
	},
	"Requiem of Spirit": {
		region: "Desert Colossus",
		subregion: "Desert Colossus",
	},
}

var multiworld_callbacks = {};
var lobby_callbacks = {};
var playthrough_timeouts = {};

var meta = {
	title: "ZOoTR Sim",
	description: "Simulator to practice and play Ocarina of Time Randomizer seeds.",
	url: "http://scatter.live/zootr-sim",
	image: "http://scatter.live/images/zootr-sim/ocarina.png",
	type: "website",
	card: "summary",
};

function notify_lobby(id, message) {
	if (!(id in lobby_callbacks)) {
		return;
	}
	lobby_callbacks[id].forEach(function (callback) {
		callback(message);
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
		seed: playthrough.seed,
		settings_string: playthrough.settings_string,
		name: "",
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

async function start_multiworld(mw_doc) {
	mw_doc.active = true;
	await Promise.all(mw_doc.players.map(function(player) {
		return playthroughModel.findById(player._id).then(function(player_doc) {
			var log = mw_doc.log;
			var locations = log.get("locations")[`World ${player.num}`];
			for (loc in locations) {
				if (typeof locations[loc] == "object") {
					var newname = locations[loc].item.split("[")[0].trim();
					locations[loc].item = newname;
				}
			}
			player_doc.seed = log.get(":seed");
			player_doc.settings_string = log.get(":settings_string");
			player_doc.multiworld_num = player.num;
			player_doc.missed_items = [];
			player_doc.settings = mw_doc.log.get("settings");
			player_doc.use_logic = mw_doc.use_logic;
			player_doc.locations = locations;
			player_doc.entrances = log.get("entrances")[`World ${player.num}`];
			player_doc.checked_locations = ["Links Pocket"];
			player_doc.current_items = Object.keys(log.get("starting_items")[`World ${player.num}`]).concat(player_doc.locations.get("Links Pocket").item);
			player_doc.start_time = Date.now();
			player_doc.hash = log.get("file_hash");
			player_doc.hints = log.get("gossip_stones")[`World ${player.num}`];
			player_doc.known_hints = {};
			player_doc.current_age = player_doc.settings.get("starting_age") == "random" ? log.get("randomized_settings")[`World ${player.num}`]["starting_age"] : player_doc.settings.get("starting_age");
			player_doc.known_medallions = new Map();
			player_doc.dungeons = log.get("dungeons")[`World ${player.num}`];
			player_doc.trials = log.get("trials")[`World ${player.num}`];
			player_doc.child_wind = "";
			player_doc.adult_wind = "";
			player_doc.child_wind_sub = "";
			player_doc.adult_wind_sub = "";
			player_doc.bombchu_count = 0;
			player_doc.route = [];
			player_doc.playtime = 0;
			player_doc.num_checks_made = 0;

			if (!player_doc.current_age) {
				player_doc.current_age = "child";
			}
			player_doc.route.push(player_doc.current_age.toUpperCase() + " 1");
			player_doc.current_region = player_doc.current_age == "child" ? "Kokiri Forest" : "Temple of Time";
			player_doc.current_subregion = player_doc.current_age == "child" ? "Links House" : "Temple of Time";
			player_doc.known_medallions.set("Free", player_doc.locations.get("Links Pocket").item);
			player_doc.save();
		});
	}));
	mw_doc.save().catch(error => console.error(error.message));
}

function parseLog(logfile, use_logic) {
	if (typeof logfile == 'string') {
		logfile = JSON.parse(logfile);
	}
	if(!(":version" in logfile) || logfile[":version"] != "5.2.0 Release") {
		throw "Incorrect version.";
	}
	if (logfile.settings.entrance_shuffle != "off") {
		throw "Entrance shuffle is not supported.";
	}
	if (logfile.settings.world_count == 1) {
		for (loc in logfile.locations) {
			if (typeof logfile.locations[loc] == "object") {
				var newname = logfile.locations[loc].item.split("[")[0].trim();
				logfile.locations[loc].item = newname;
			}
		}
		var doc = new playthroughModel({
			seed: logfile[":seed"],
			settings_string: logfile[":settings_string"],
			use_logic: use_logic,
			locations: logfile["locations"],
			entrances: logfile.entrances,
			checked_locations: ["Links Pocket"],
			current_items: Object.keys(logfile["starting_items"]).concat(logfile["locations"]["Links Pocket"]),
			start_time: Date.now(),
			hash: logfile["file_hash"],
			hints: logfile["gossip_stones"],
			known_hints: {},
			current_age: logfile["settings"]["starting_age"] == "random" ? logfile["randomized_settings"]["starting_age"] : logfile["settings"]["starting_age"],
			known_medallions: new Map(),
			settings: logfile["settings"],
			dungeons: logfile["dungeons"],
			trials: logfile["trials"],
			child_wind: "",
			adult_wind: "",
			child_wind_sub: "",
			adult_wind_sub: "",
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
			seed: doc.seed,
			settings_string: doc.settings_string,
			playing: true,
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
			child_wind_sub: doc.child_wind_sub,
			adult_wind_sub: doc.adult_wind_sub,
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
			use_logic: use_logic,
		});
		mw_doc.save();
		setTimeout(function () {
			multiworldModel.findById(mw_doc._id).then(function (result) {
				try {
					if (result.players.length == 0) {
						multiworldModel.findByIdAndDelete(result._id).exec();
					}
				}
				catch (error) {
					console.error(error.message);
				}
			}, function (error) {
				console.error(error.message);
			});
		}, 1000 * 60 * 10);
		setTimeout(function () {
			multiworldModel.findById(mw_doc._id).then(function (result) {
				try {
					if (!result.active) {
						result.players.forEach(function(player) {
							playthroughModel.findByIdAndDelete(player._id).exec();
						})
						multiworldModel.findByIdAndDelete(result._id).exec();
					}
				}
				catch (error) {
					console.error(error.message);
				}
			}, function (error) {
				console.error(error.message);
			});
		}, 1000 * 60 * 60 * 24);
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
		try {
			var games = result.map(x => ({ id: x._id, total_players: x.num_players, current_players: x.players.length, name: x.players.length > 0 ? x.players[0].name : "-", age: toAgeString(x.created_at) }));
		}
		catch(error) {
			res.status(500).send(error.message);
		}
		res.send(games);
	}, function(error) {
		res.status(500).send(error.message);
	});
});

router.get('/getlobbyinfo/:id', function (req, res, next) {
	multiworldModel.findById(req.params.id).then(function (result) {
		try {
			res.send({players: result.players, total_players: result.num_players, id: result._id});
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
});

router.get('/readyup/:id', async function (req, res, next) {
	playthroughModel.findById(req.params.id).then(function (result) {
		multiworldModel.findById(result.multiworld_id).then(async function (mw) {
			try {
				mw.players.filter(x => x._id == req.params.id)[0].ready = true;
				mw.save();
				if (mw._id in lobby_callbacks) {
					for (player in lobby_callbacks[mw._id]) {
						lobby_callbacks[mw._id][player]({ readied: result._id });
					}
				}
				if (mw.players.length == mw.num_players && mw.players.every(x => x.ready)) {
					await start_multiworld(mw);
					notify_lobby(mw._id, { starting: true });
				}
				res.sendStatus(200);
			}
			catch (error) {
				res.status(500).send(error.message);
			}
		}, function (error) {
			res.status(500).send(error.message);
		})
	}, function (error) {
		res.status(500).send(error.message);
	});
});

router.get('/unready/:id', async function (req, res, next) {
	playthroughModel.findById(req.params.id).then(function (result) {
		multiworldModel.findById(result.multiworld_id).then(async function (mw) {
			try {
				mw.players.filter(x => x._id == req.params.id)[0].ready = false;
				mw.save();
				if (mw._id in lobby_callbacks) {
					for (player in lobby_callbacks[mw._id]) {
						lobby_callbacks[mw._id][player]({ unreadied: result._id });
					}
				}
				res.sendStatus(200);
			}
			catch (error) {
				res.status(500).send(error.message);
			}
		}, function (error) {
			res.status(500).send(error.message);
		})
	}, function (error) {
		res.status(500).send(error.message);
	});
});

router.get('/lobbyconnect/:multi_id/', function (req, res, next) {
	if (!(req.params.multi_id in lobby_callbacks)) {
		lobby_callbacks[req.params.multi_id] = [];
	}
	var callback = function (message) {
		try {
			res.write(`data: ${JSON.stringify(message)}\n\n`);
		}
		catch (error) {
			console.error(error);
		}
	};
	lobby_callbacks[req.params.multi_id].push(callback);

	res.writeHead(200, {
		"Cache-Control": "no-cache",
		"Content-Type": "text/event-stream",
		"Connection": "keep-alive",
	});

	req.on("close", function () {
		try {
			var index = lobby_callbacks[req.params.multi_id].indexOf(callback);
			lobby_callbacks[req.params.multi_id].splice(index, 1);
			if (lobby_callbacks[req.params.multi_id].length == 0) {
				delete lobby_callbacks[req.params.multi_id];
			}
		}
		catch (error) {
			console.error(error);
		}
	});
});

router.get('/multiworldconnect/:multi_id/:player_id', async function (req, res, next) {
	if (!(req.params.multi_id in multiworld_callbacks)) {
		multiworld_callbacks[req.params.multi_id] = {};
	}
	var callback = function (message) {
		try {
			res.write(`data: ${JSON.stringify(message)}\n\n`);
		}
		catch (error) {
			console.error(error);
		}
	};
	var mw_doc = await MultiworldPlaythroughModel.findById(req.params.multi_id);
	var player_num = mw_doc.players.filter(x => x._id == req.params.player_id)[0].num;
	multiworld_callbacks[req.params.multi_id][player_num] = callback;

	res.writeHead(200, {
		"Cache-Control": "no-cache",
		"Content-Type": "text/event-stream",
		"Connection": "keep-alive",
	});

	req.on("close", function () {
		try {
			if (player_num in multiworld_callbacks[req.params.multi_id]) {
				delete multiworld_callbacks[req.params.multi_id][player_num];
			}
			if (Object.keys(multiworld_callbacks[req.params.multi_id]).length == 0) {
				delete multiworld_callbacks[req.params.multi_id];
			}
		}
		catch(error) {
			console.error(error);
		}
	});
});

router.get('/joinlobby/:id/:name', function (req, res, next) {
	if (req.params.name.length > 20) {
		res.status(400).send("Name too long!");
		return;
	}
	multiworldModel.findById(req.params.id).then(function (result) {
		try {
			if (result.players.length >= result.num_players) {
				res.status(400).send("Lobby already full!");
				return;
			}
			if (result.players.filter(x => x.name == req.params.name).length > 0) {
				res.status(400).send("Duplicate name not allowed!");
				return;
			}
			var new_player = {
				name: req.params.name,
				_id: new mongoose.Types.ObjectId(),
				ready: false,
				num: result.players.length + 1,
				finished: false,
			};
			var player_doc = new playthroughModel({
				_id: new_player._id,
				multiworld_id: result._id,
			});
			player_doc.save();

			notify_lobby(result._id, { joined: new_player });

			result.players.push(new_player);
			result.save();

			res.send(new_player._id);
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	}, function (error) {
		res.status(500).send(error.message);
	});
});

router.get('/leavelobby/:multi_id/:player_id', function (req, res, next) {
	multiworldModel.findById(req.params.multi_id).then(function (result) {
		try {
			if (result.players.length <= 0) {
				res.sendStatus(400);
				return;
			}
			result.players.remove(req.params.player_id);
			result.save();
			playthroughModel.findByIdAndDelete(req.params.player_id).then(function () {
				try {
					notify_lobby(req.params.multi_id, { left: req.params.player_id });
					res.sendStatus(200);
				}
				catch (error) {
					res.status(500).send(error.message);
				}
			}, function (error) {
				res.status(500).send(error.message);
			});
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	}, function (error) {
		res.status(500).send(error.message);
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
		try {
			if (result._id in playthrough_timeouts) {
				clearTimeout(playthrough_timeouts[result._id]);
				delete playthrough_timeouts[result._id];
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
				mw_players: mw_doc ? mw_doc.players.map(x => ({name: x.name, finished: x.finished})) : null,
				multiworld_id: result.multiworld_id,
				seed: result.seed,
				settings_string: result.settings_string,
				id: result._id,
				players: mw_doc ? mw_doc.players : [],
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
				child_wind_sub: result.child_wind_sub,
				adult_wind_sub: result.adult_wind_sub,
				num_checks_made: result.num_checks_made,
				total_checks: result.total_checks,
				used_logic: result.use_logic,
				missed_items: result.missed_items,
				percentiles: percentiles ? {time: (100*percentiles[0]/percentiles[2]).toFixed(2), checks: (100*percentiles[1]/percentiles[2]).toFixed(2)} : null
			};
			result.missed_items = [];
			result.save();
			res.send(info);
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	});
});

router.get('/checklocation/:playthroughId/:location', function(req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(async function (result) {
		try {
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
				else if (req.params.location == "Ganondorf Hint") {
					var light_arrow_loc = Array.from(result.locations.keys()).filter(x => result.locations.get(x) == "Light Arrows")[0];
					if (!light_arrow_loc) {
						light_arrow_loc = Array.from(result.locations.keys()).filter(x => typeof result.locations.get(x) == "object" && result.locations.get(x).item == "Light Arrows")[0];
					}
					var light_arrow_region;
					if (light_arrow_loc) {
						light_arrow_region = simHelper.getParentRegion(simHelper.subregionFromLocation(light_arrow_loc));
						if (!result.known_hints.has(light_arrow_region)) {
							result.known_hints.set(light_arrow_region, []);
						}
						result.known_hints.get(light_arrow_region).push("Light Arrows");
						result.markModified("known_hints");
					}
					else if (result.current_items.includes("Light Arrows")) {
						light_arrow_region = "your pocket";
					}
					else {
						res.status(501).send("Unable to find Light Arrows in the world. Please report this.");
						return;
					}
					result.checked_locations.push("Ganondorf Hint");
					result.save();
					res.send({light_arrow_region: light_arrow_region, known_hints: result.known_hints});
					return;
				}
				else if (req.params.location == "Ganon") {
					if (result.multiworld_id) {
						await multiworldModel.updateOne({_id: result.multiworld_id, "players._id": result._id}, {$set: {"players.$.finished": true}});
					}
					result.playtime = Date.now() - result.start_time;
					result.total_checks = Array.from(result.locations.keys()).length;
					var mw_players;
					if (result.use_logic && !result.finished) {
						submitToLeaderboard(result);
						if (result.multiworld_id) {
							var mw_doc = await multiworldModel.findById(result.multiworld_id);
							mw_players = mw_doc.players.map(x => ({name: x.name, finished: x.finished}));
							var all_players_finished = mw_doc.players.every(x => x.finished);
							if (all_players_finished) {
								mw_doc.players.forEach(function(player) {
									setTimeout(function() {
										try {
											playthroughModel.findByIdAndDelete(player._id).exec();
										}
										catch (error) {
											console.error(error.message);
										}
									}, 1000*60*60*24);
								});
								setTimeout(function () {
									try {
										multiworldModel.findByIdAndDelete(mw_doc._id).exec();
									}
									catch (error) {
										console.error(error.message);
									}
								}, 1000 * 60 * 60 * 24);
							}
						}
						else {
							setTimeout(function() {
								try {
									playthroughModel.findByIdAndDelete(result._id).exec();
								}
								catch (error) {
									console.error(error.message);
								}
							}, 1000*60*60*24);
						}
					}
					result.finished = true;
					result.save();
					getPercentiles(result).then(function(percentiles) {
						try {
							res.send({ mw_players: mw_players, percentiles: { time: (100 * percentiles[0] / percentiles[2]).toFixed(2), checks: (100 * percentiles[1] / percentiles[2]).toFixed(2) }, used_logic: result.use_logic, route: result.route, finished: true, playtime: result.playtime, num_checks_made: result.num_checks_made, total_checks: result.total_checks });
						}
						catch(error) {
							res.status(500).send(error.message);
						}
					}, function(error) {
						res.status(500).send(error.message);
					});
					return;
				}
				var item = result.locations.get(req.params["location"]);
				if (/Clear .* Trial/.test(req.params.location)) {
					item = req.params.location;
				}
				if (result.locations.has(req.params.location)) {
					result.num_checks_made++;
				}
				var other_player;
				if (item && result.multiworld_id) {
					var mw_doc = await MultiworldPlaythroughModel.findById(result.multiworld_id);
					player = item.player;
					item = item.item;
					if (player != result.multiworld_num) {
						other_player = mw_doc.players.filter(x => x.num == player)[0];
						my_name = mw_doc.players.filter(x => x._id == req.params.playthroughId)[0].name;
						var other_doc = await playthroughModel.findById(other_player._id);
						other_doc.current_items.push(item);
						var finish_obj = null;
						if (item == "Triforce Piece" &&  other_doc.current_items.filter(x => x == "Triforce Piece").length >= other_doc.settings.get("triforce_goal_per_world")) {
							other_doc.current_items.push("Boss Key (Ganons Castle)");
							await multiworldModel.updateOne({ _id: other_doc.multiworld_id, "players._id": other_doc._id }, { $set: { "players.$.finished": true } });
							other_doc.playtime = Date.now() - other_doc.start_time;
							other_doc.total_checks = Array.from(other_doc.locations.keys()).length;
							var mw_players;
							if (other_doc.use_logic && !other_doc.finished) {
								submitToLeaderboard(other_doc);
								var mw_doc = await multiworldModel.findById(other_doc.multiworld_id);
								mw_players = mw_doc.players.map(x => ({ name: x.name, finished: x.finished }));
								var all_players_finished = mw_doc.players.every(x => x.finished);
								if (all_players_finished) {
									mw_doc.players.forEach(function (player) {
										setTimeout(function () {
											try {
												playthroughModel.findByIdAndDelete(player._id).exec();
											}
											catch (error) {
												console.error(error.message);
											}
										}, 1000 * 60 * 60 * 24);
									});
									setTimeout(function () {
										try {
											multiworldModel.findByIdAndDelete(mw_doc._id).exec();
										}
										catch (error) {
											console.error(error.message);
										}
									}, 1000 * 60 * 60 * 24);
								}
							}
							other_doc.finished = true;
							other_doc.save();
							var percentiles = await getPercentiles(other_doc);
							finish_obj = { current_items: other_doc.current_items, mw_players: mw_players, percentiles: { time: (100 * percentiles[0] / percentiles[2]).toFixed(2), checks: (100 * percentiles[1] / percentiles[2]).toFixed(2) }, used_logic: other_doc.use_logic, route: other_doc.route, finished: true, playtime: other_doc.playtime, num_checks_made: other_doc.num_checks_made, total_checks: other_doc.total_checks };
						}
						other_doc.save();
						try {
							multiworld_callbacks[result.multiworld_id][player]({ item: item, from: my_name, finish_obj: finish_obj });
						}
						catch (error) {
							other_doc.missed_items.push({item: item, from: my_name});
						}
					}
				}
				if (typeof item == "object") {
					item = item["item"];
				}
				if (!result.locations.has(req.params.location) && req.params["location"].startsWith("GS ")) {
					item = "Gold Skulltula Token";
				}
				if (!(result.locations.has(req.params.location)) && req.params["location"] == "Gift from Saria") {
					item = "Ocarina";
				}
				if (req.params.location == "Kokiri Sword Chest" && !result.settings.get("shuffle_kokiri_sword")) {
					item = "Kokiri Sword";
				}
				if (req.params.location == "Zelda" && result.settings.get("shuffle_ganon_bosskey") == "lacs_medallions") {
					item = "Boss Key (Ganons Castle)";
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

				if (!other_player) {
					result.current_items.push(item);
					if (item.includes("Bombchu")) {
						result.bombchu_count += parseInt(item.substring(item.lastIndexOf('(') + 1, item.lastIndexOf(')')), 10);
						if (result.settings.get("bombchus_in_logic")) {
							result.bombchu_count += 10000;
						}
					}
					if (item == "Triforce Piece" && result.current_items.filter(x => x == "Triforce Piece").length >= result.settings.get("triforce_goal_per_world")) {
						result.current_items.push("Boss Key (Ganons Castle)");
						if (result.multiworld_id) {
							await multiworldModel.updateOne({ _id: result.multiworld_id, "players._id": result._id }, { $set: { "players.$.finished": true } });
						}
						result.playtime = Date.now() - result.start_time;
						result.total_checks = Array.from(result.locations.keys()).length;
						var mw_players;
						if (result.use_logic && !result.finished) {
							submitToLeaderboard(result);
							if (result.multiworld_id) {
								var mw_doc = await multiworldModel.findById(result.multiworld_id);
								mw_players = mw_doc.players.map(x => ({ name: x.name, finished: x.finished }));
								var all_players_finished = mw_doc.players.every(x => x.finished);
								if (all_players_finished) {
									mw_doc.players.forEach(function (player) {
										setTimeout(function () {
											try {
												playthroughModel.findByIdAndDelete(player._id).exec();
											}
											catch (error) {
												console.error(error.message);
											}
										}, 1000 * 60 * 60 * 24);
									});
									setTimeout(function () {
										try {
											multiworldModel.findByIdAndDelete(mw_doc._id).exec();
										}
										catch (error) {
											console.error(error.message);
										}
									}, 1000 * 60 * 60 * 24);
								}
							}
							else {
								setTimeout(function () {
									try {
										playthroughModel.findByIdAndDelete(result._id).exec();
									}
									catch (error) {
										console.error(error.message);
									}
								}, 1000 * 60 * 60 * 24);
							}
						}
						result.finished = true;
						result.save();
						getPercentiles(result).then(function (percentiles) {
							try {
								res.send({ current_items: result.current_items, mw_players: mw_players, percentiles: { time: (100 * percentiles[0] / percentiles[2]).toFixed(2), checks: (100 * percentiles[1] / percentiles[2]).toFixed(2) }, used_logic: result.use_logic, route: result.route, finished: true, playtime: result.playtime, num_checks_made: result.num_checks_made, total_checks: result.total_checks });
							}
							catch (error) {
								res.status(500).send(error.message);
							}
						}, function (error) {
							res.status(500).send(error.message);
						});
						return;
					}
				}
				
				if (["Kokiri Emerald", "Goron Ruby", "Zora Sapphire", "Light Medallion", "Forest Medallion", "Fire Medallion", "Water Medallion", "Spirit Medallion", "Shadow Medallion"].includes(item) && !(result.known_medallions.has(result.current_region))) {
					result.known_medallions.set(result.current_region, item);
				}
				
				if (simHelper.needChus(result, req.params.location)) {
					result.bombchu_count--;
					if (result.current_subregion == "Zora River Front") {
						result.current_items.push("Opened Child River");
					}
				}

				if (req.params.location.includes("Grotto")) {
					result.current_subregion = simHelper.subregionFromLocation(req.params.location);
				}

				var response_obj = { item: item, checked_locations: result.checked_locations, region: result.current_region, subregion: result.current_subregion, known_medallions: result.known_medallions, bombchu_count: result.bombchu_count };
				if (req.params.location in simHelper.region_changing_checks) {
					result.current_region = simHelper.region_changing_checks[req.params.location][0];
					response_obj.region = result.current_region;
					result.current_subregion = simHelper.region_changing_checks[req.params.location][1];
					response_obj.subregion = result.current_subregion;
					response_obj.region_changed = true;
				}
				if (other_player) {
					response_obj.other_player = other_player.name;
				}

				result.save();
				res.send(response_obj);
			}
			else {
				res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.location));
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
});

router.get('/throwaway/:playthroughId', function(req, res, next) {
	playthrough_timeouts[req.params.playthroughId] = setTimeout(function () {
		playthroughModel.findByIdAndDelete(req.params.playthroughId).catch(function (error) {
			console.error(error.message);
		});
	}, 1000 * 60 * 60 * 24);
	res.sendStatus(200);
});

router.get('/checkhint/:playthroughId/:stone', function (req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
			if (result.checked_locations.includes(req.params["stone"])) {
				res.send(400);
				return;
			}
			if (simHelper.canCheckLocation(result, req.params["stone"])) {
				var hint = simHelper.getHint(result, req.params["stone"]);
				if (result.known_hints.has(hint.hint[0])) {
					result.known_hints.get(hint.hint[0]).push(hint.hint[1]);
					result.markModified("known_hints");
				}
				else {
					result.known_hints.set(hint.hint[0], [hint.hint[1]]);
				}
				if (simHelper.needChus(result, req.params.stone)) {
					result.bombchu_count--;
				}
				if (req.params.stone.includes("Grotto")) {
					result.current_subregion = simHelper.subregionFromLocation(req.params.stone);
				}
				result.checked_locations.push(req.params["stone"]);
				result.save();
				res.send({ text: hint.hint_text, bombchu_count: result.bombchu_count, known_hints: result.known_hints });
			}
			else {
				res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.stone));
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
});

router.get('/submitname/:playthroughId/:name', function (req, res, next) {
	if (req.params.name.length > 20) {
		res.status(400).send("Name too long!");
		return;
	}
	leaderboardModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
			if (!result.name) {
				result.name = req.params.name;
				result.save();
				res.sendStatus(200);
			}
			else {
				res.sendStatus(403);
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
});

router.get('/takeentrance/:playthroughId/:entrance', function(req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
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
			else if (req.params.entrance in warp_songs && simHelper.canPlay(result, req.params.entrance)) {
				result.current_region = warp_songs[req.params.entrance].region;
				result.current_subregion = warp_songs[req.params.entrance].subregion;
				result.save();
				res.send({ region: result.current_region, subregion: result.current_subregion });
			}
			else if (simHelper.canCheckLocation(result, req.params["entrance"])) {
				if (simHelper.needChus(result, req.params.entrance)) {
					result.bombchu_count--;
				}
				if (req.params.entrance == "Goron City" && result.current_region == "Lost Woods" ||
				req.params.entrance == "Lost Woods" && result.current_region == "Goron City") {
					result.current_items.push("Goron City Woods Warp Open");
				}
				result.current_region = simHelper.getParentRegion(req.params["entrance"]);
				result.current_subregion = req.params["entrance"];
				result.save();
				res.send({region: result.current_region, subregion: result.current_subregion, bombchu_count: result.bombchu_count});
			}
			else {
				res.status(403).send(simHelper.buildRule(result, result["current_region"], req.params.entrance));
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
})

router.get('/getlocations/:playthroughId/:region', function (req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(async function (result) {
		try {
			var locs = simHelper.getLocations(result, req.params["region"]);
			var mw_doc = null;
			if (result.multiworld_id) {
				mw_doc = await multiworldModel.findById(result.multiworld_id);
			}
			var shops = simHelper.getShops(result, req.params.region, mw_doc);
			res.send({locations: locs, shops: shops});
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
})

router.get('/getentrances/:playthroughId/:region', function (req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
			var entrances = simHelper.getEntrances(result, req.params["region"]);
			res.send(entrances);
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
});

router.get('/setwind/:playthroughId/:age/:region/:subregion', function (req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
			if (result.current_items.includes("Farores Wind") && result.current_items.includes("Magic Meter")) {
				if (result.current_age == "child") {
					result.child_wind = req.params.region;
					result.child_wind_sub = req.params.subregion;
				}
				else {
					result.adult_wind = req.params.region;
					result.adult_wind_sub = req.params.subregion;
				}
				result.save();
				res.sendStatus(200);
			}
			else {
				res.sendStatus(403);
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
})

router.get('/recallwind/:playthroughId/:age', function (req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
			if (result.current_items.includes("Farores Wind") && result.current_items.includes("Magic Meter")) {
				if (result.current_age == "child") {
					if (result.child_wind) {
						result.current_region = result.child_wind;
						result.current_subregion = result.child_wind_sub;
						res.send({region: result.child_wind, subregion: result.child_wind_sub});
						result.child_wind = "";
						result.child_wind_sub = "";
						result.save();
					}
					else {
						res.sendStatus(400);
					}
				}
				else {
					if (result.adult_wind) {
						result.current_region = result.adult_wind;
						result.current_subregion = result.adult_wind_sub;
						res.send({ region: result.adult_wind, subregion: result.adult_wind_sub });
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
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
})

router.get('/peek/:playthroughId/:location', function (req, res, next) {
	playthroughModel.findById(req.params["playthroughId"]).then(function (result) {
		try {
			if (simHelper.parseLogicRule(result, `can_reach('${simHelper.subregionFromLocation(req.params.location)}')`) &&
			(simHelper.canCheckLocation(result, req.params.location) || !simHelper.noPeekIfCantGet.includes(req.params.location) ||
			(req.params.location == "Lake Hylia Sun" && result.current_age == "adult" && result.current_items.includes("Bow")))) {
				var item = result.locations.get(req.params.location);
				if (typeof item == "object") {
					item = item.item;
				}
				if (result.known_hints.has(req.params.location)) {
					result.known_hints.get(req.params.location).push(item);
					result.markModified("known_hints");
				}
				else {
					result.known_hints.set(req.params.location, [item]);
				}
				if (simHelper.needChus(result, simHelper.subregionFromLocation(req.params.location))) {
					result.bombchu_count--;
				}
				result.save();
				res.send({bombchu_count: result.bombchu_count, known_hints: result.known_hints, item: item});
			}
			else {
				res.sendStatus(403);
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
})

router.get('/getspoiler', function(req, res, next) {
	try {
		if (req.query.valid) {
			request('https://www.ootrandomizer.com/api/seed/create?key=' + process.env.ZOOTRAPIKEY + '&version=5.2.0&settingsString=' + req.query.settings + '&seed=' + req.query.seed, function (error, response, body) {
				try {
					if (error) {
						if (error.code == "ETIMEDOUT") {
							res.sendStatus(408);
							return;
						}
						else {
							res.status(500).send(error.message);
							return;
						}
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
				}
				catch (error) {
					if (error == "Entrance shuffle is not supported.") {
						res.status(400).send(error);
					}
					else {
						res.status(500).send(error.message);
					}
				}
			});
		}
		else {
			res.sendStatus(403);
		}
	}
	catch(error) {
		res.status(500).send(error.message);
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

router.get('/leaderboard', function (req, res, next) {
	leaderboardModel.estimatedDocumentCount().then(function (count) {
		res.render("zootr-sim-leaderboard", { meta: meta, count: count });
	}, function (error) {
		res.status(500).send(error.message);
	});
});

router.get('/changelog', function (req, res, next) {
	res.render("zootr-sim-changelog", {meta: meta});
});

router.get('/getleaderboardentries/:count/:sortfield/:ascdesc/:page', function(req, res, next) {
	var sortObj = {};
	sortObj[req.params.sortfield] = req.params.ascdesc;
	leaderboardModel.find({ name: new RegExp(regexEscape(req.query.name, "i"), "i"), settings_string: new RegExp(regexEscape(req.query.settings_string, "i"), "i")}).limit(Math.min(req.params.count, 100)).sort(sortObj).skip(Math.min(req.params.count, 100) * (req.params.page - 1)).then(function(entries) {
		try {
			if (req.query.name) {
				leaderboardModel.countDocuments().where({ name: new RegExp(regexEscape(req.query.name, "i")) }).then(function(count) {
					res.send({entries: entries, count: count});
				}, function(error) {
					res.status(500).send(error.message);
				});
			}
			else {
				res.send({entries: entries});
			}
		}
		catch(error) {
			res.status(500).send(error.message);
		}
	}, function(error) {
		res.status(500).send(error.message);
	});
});

module.exports = router;


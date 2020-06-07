var jsons = ['Overworld', 'Bottom of the Well', 'Deku Tree', 'Dodongos Cavern', 'Fire Temple', 'Forest Temple', 'Ganons Castle', 'Gerudo Training Grounds', 'Ice Cavern', 'Jabu Jabus Belly', 'Shadow Temple', 'Spirit Temple', 'Water Temple'];
var mqjsons = jsons.map(x => x + " MQ");
mqjsons = mqjsons.filter(x => x != "Overworld MQ");
//jsons = jsons.concat(mqjsons);
console.log(jsons);

var locationsLogic = {};

var subregions = {
	'Kokiri Forest': ['Root', 'Root Exits', 'Kokiri Forest', 'Outside Deku Tree', 'Links House', 'Mido House', 'Saria House', 'House of Twins', 'Know It All House', 'Kokiri Shop', 'Kokiri Forest Storms Grotto'],
	'Lost Woods': ['Lost Woods Forest Exit', 'Lost Woods', 'Lost Woods Beyond Mido', 'Lost Woods Bridge From Forest', 'Lost Woods Bridge', 'Lost Woods Generic Grotto', 'Deku Theater', 'Lost Woods Sales Grotto'],
	'Sacred Forest Meadow': ['Sacred Forest Meadow Entryway', 'Sacred Forest Meadow', 'Meadow Fairy Grotto', 'Meadow Storms Grotto', 'Front of Meadow Grotto'],
	'Hyrule Field': ['Hyrule Field', 'Remote Southern Grotto', 'Field Near Lake Outside Fence Grotto', 'Field Near Lake Inside Fence Grotto', 'Field Valley Grotto', 'Field West Castle Town Grotto', 'Field Far West Castle Town Grotto', 'Field Kakariko Grotto', 'Field North Lon Lon Grotto'],
	'Lon Lon Ranch': ['Lon Lon Ranch', 'Talon House', 'Ingo Barn', 'Lon Lon Corner Tower', 'Lon Lon Grotto'],
	'Lake Hylia': ['Lake Hylia', 'Lake Hylia Owl Flight', 'Lake Hylia Lab', 'Fishing Hole', 'Lake Hylia Grotto'],
	'Gerudo Valley': ['Gerudo Valley', 'Gerudo Valley Stream', 'Gerudo Valley Crate Ledge', 'Gerudo Valley Far Side', 'Carpenter Tent', 'Gerudo Valley Octorok Grotto', 'Gerudo Valley Storms Grotto'],
	'Gerudo Fortress': ['Gerudo Fortress', 'Gerudo Fortress Outside Gate', 'Gerudo Fortress Storms Grotto'],
	'Haunted Wasteland': ['Haunted Wasteland Near Fortress', 'Haunted Wasteland', 'Haunted Wasteland Near Colossus'],
	'Desert Colossus': ['Desert Colossus', 'Colossus Fairy', 'Desert Colossus Grotto'],
	'Market': ['Castle Town Entrance', 'Castle Town', 'Castle Town Rupee Room', 'Castle Town Bazaar', 'Castle Town Mask Shop', 'Castle Town Shooting Gallery', 'Castle Town Bombchu Bowling', 'Castle Town Potion Shop', 'Castle Town Treasure Chest Game', 'Castle Town Bombchu Shop', 'Castle Town Dog Lady', 'Castle Town Man in Green House'],
	'Temple of Time': ['Temple of Time Exterior', 'Temple of Time', 'Beyond Door of Time'],
	'Hyrule Castle': ['Castle Grounds', 'Hyrule Castle Grounds', 'Hyrule Castle Garden', 'Hyrule Castle Fairy', 'Castle Storms Grotto'],
	'Outside Ganons Castle': ['Ganons Castle Grounds', 'Ganons Castle Fairy'],
	'Kakariko Village': ['Kakariko Village', 'Kakariko Impa Ledge', 'Kakariko Rooftop', 'Kakariko Village Backyard', 'Carpenter Boss House', 'House of Skulltula', 'Impas House', 'Impas House Back', 'Impas House Near Cow', 'Windmill', 'Kakariko Bazaar', 'Kakariko Shooting Gallery', 'Kakariko Potion Shop Front', 'Kakariko Potion Shop Back', 'Odd Medicine Building', 'Kakariko Village Behind Gate', 'Kakariko Bombable Grotto', 'Kakariko Back Grotto'],
	'Graveyard': ['Graveyard', 'Shield Grave', 'Heart Piece Grave', 'Composer Grave', 'Dampes Grave', 'Dampes House', 'Shadow Temple Warp Region'],
	'Death Mountain Trail': ['Death Mountain', 'Death Mountain Summit', 'Death Mountain Summit Owl Flight', 'Dodongos Cavern Entryway', 'Mountain Summit Fairy', 'Mountain Bombable Grotto', 'Mountain Storms Grotto'],
	'Goron City': ['Goron City', 'Goron City Woods Warp', 'Darunias Chamber', 'Goron Shop', 'Goron City Grotto'],
	'Death Mountain Crater': ['Death Mountain Crater Upper Nearby', 'Death Mountain Crater Upper Local', 'Death Mountain Crater Ladder Area Nearby', 'Death Mountain Crater Lower Nearby', 'Death Mountain Crater Lower Local', 'Death Mountain Crater Central Nearby', 'Death Mountain Crater Central Local', 'Fire Temple Entrance', 'Crater Fairy', 'Top of Crater Grotto', 'DMC Hammer Grotto'],
	'Zora River': ['Zora River Front', 'Zora River', 'Zora River Behind Waterfall', 'Zora River Plateau Open Grotto', 'Zora River Plateau Bombable Grotto', 'Zora River Storms Grotto'],
	'Zoras Domain': ['Zoras Domain', 'Zoras Domain Behind King Zora', 'Zora Shop', 'Zoras Domain Storms Grotto'],
	'Zoras Fountain': ['Zoras Fountain', 'Zoras Fountain Fairy'],
	'Ganons Castle': ['Ganons Castle Tower'],
};


function parseData(data) {
	var lines = data.split('\r\n');
	var lines = lines.map(x => x.split('\n'));
	var lines = lines.flat();
	var filtered = lines.map(function (s) {
		var n = s.indexOf('#');
		s = s.substring(0, n != -1 ? n - 1 : s.length);
		s = s.replace(/\s+/g, " ");
		s = s.trim();
		return s;
	});
	var joined = filtered.join(' ');
	var parsed = JSON.parse(joined);
	return parsed;
}

function getParentRegion(subregion) {
	var region = Object.keys(subregions).filter(x => subregions[x].includes(subregion));
	if (region.length != 1) {
		throw `Parent region not found for subregion ${subregion}.`;
	}
	return region[0];
}

Object.some = function(obj, callback) {
	for (v in obj) {
		if (callback(obj[v])) {
			return true;
		}
	}
	return false;
}

Object.keyContaining = function(obj, val) {
	for (k in obj) {
		if (obj[k].includes(val)) {
			return k;
		}
	}
	return undefined;
}

var promises = jsons.map(filename => fetch(window.location.origin + '/javascripts/zootr-sim/data/World/' + filename + '.json'));
var mqpromises = mqjsons.map(filename => fetch(window.location.origin + '/javascripts/zootr-sim/data/World/' + filename + '.json'));

var keys = ["region_name", "hint", "locations", "exits", "scene", "events", "time_passes", "dungeon"];

Promise.all(promises).then(function (responses) {
	var parsePromises = [];
	responses.forEach(function(response) {
		parsePromises.push(response.text());
	});
	Promise.all(parsePromises).then(function(texts) {
		texts.forEach(function(text) {
			var parsed = parseData(text);
			parsed.forEach(function (region) {
				if ("dungeon" in region) {
					if (!(region["dungeon"] in locationsLogic)) {
						locationsLogic[region["dungeon"]] = {};
						locationsLogic[region["dungeon"]]["vanilla"] = {};
					}
					locationsLogic[region["dungeon"]]["vanilla"][region["region_name"]] = {};
					Object.assign(locationsLogic[region["dungeon"]]["vanilla"][region["region_name"]], region);
				}
				else {
					var area = getParentRegion(region["region_name"]);
					if(!(area in locationsLogic)) {
						locationsLogic[area] = {};
					}
					locationsLogic[area][region["region_name"]] = {};
					Object.assign(locationsLogic[area][region["region_name"]], region);
				}
			});
		});
	}).then(function() {
		Promise.all(mqpromises).then(function(responses) {
			var mqparsePromises = [];
			responses.forEach(function(response) {
				mqparsePromises.push(response.text());
			});
			Promise.all(mqparsePromises).then(function(texts) {
				texts.forEach(function(text) {
					var parsed = parseData(text);
					parsed.forEach(function (region) {
						if (!("mq" in locationsLogic[region["dungeon"]])) {
							locationsLogic[region["dungeon"]]["mq"] = {};
						}
						locationsLogic[region["dungeon"]]["mq"][region["region_name"]] = {};
						Object.assign(locationsLogic[region["dungeon"]]["mq"][region["region_name"]], region);
					});
				});
			}).then(function() {
				console.log("done");
				console.log(locationsLogic);
				var blob = new Blob([JSON.stringify(locationsLogic, null, '\t')], { type: "application/json" });
				//window.saveAs(blob, "fulllogic.json");
			});
		})
	});
});





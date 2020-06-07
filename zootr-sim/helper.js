var logic = require("./logic.js");

function parseLogicRule(save_file, rule) {
	var items = save_file["current_items"];
	var settings = save_file["settings"];
	var age = save_file["current_age"];
	var checked_locations = save_file["checked_locations"];
	var logicEvaluation = {
		True: () => true,
		False: () => false,
		is_starting_age: () => true,
		Time_Travel: () => true,
		open_forest: () => settings["open_forest"] == "open",
		can_use: x => (logicEvaluation.is_magic_item(x.replace(/_/g, " ")) && logicEvaluation.has("Magic Meter") && logicEvaluation.has(x)) ||
			(logicEvaluation.is_adult_item(x.replace(/_/g, " ")) && logicEvaluation.is_adult() && logicEvaluation.has(x)) ||
			(logicEvaluation.is_magic_arrow(x.replace(/_/g, " ")) && logicEvaluation.is_adult() && logicEvaluation.has("Progressive Bow") && logicEvaluation.has(x)) ||
			(logicEvaluation.is_child_item(x.replace(/_/g, " ")) && logicEvaluation.is_child() && logicEvaluation.has(x)) ||
			(x.replace(/_/g, " ") == "Goron Tunic" || x.replace(/_/g, " ") == "Zora Tunic"),
		is_magic_item: x => x == "Dins Fire" || x == "Farores Wind" || x == "Nayrus Love" || x == "Lens of Truth",
		is_magic_arrow: x => x == "Fire Arrows" || x == "Light Arrows",
		is_adult_item: x => x == "Progressive Bow" || x == "Hammer" || x == "Iron Boots" || x == "Hover Boots" || x == "Progressive Hookshot" || x == "Progressive Strength Upgrade" || x == "Scarecrow" || x == "Distant Scarecrow",
		is_child_item: x => x == "Slingshot" || x == "Boomerang" || x == "Kokiri Sword" || x == "Deku Shield",
		can_see_with_lens: () => true,
		has_projectile: x => logicEvaluation.has_explosives() ||
			(x == "child" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang())) ||
			(x == "adult" && (logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))) ||
			(x == "both" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang()) && (logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))) ||
			(x == "either" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang() || logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))),
		has: x => items.includes(x.replace(/_/g, " ")),
		has_explosives: () => logicEvaluation.has("Bomb Bag") || logicEvaluation.has_bombchus(),
		has_bombchus: () => items.filter(x => x.includes("Bombchu")).length > 0,
		has_all_stones: () => logicEvaluation.has("Kokiri Emerald") && logicEvaluation.has("Goron Ruby") && logicEvaluation.has("Zora Sapphire"),
		has_all_medallions: () => logicEvaluation.has("Light Medallion") && logicEvaluation.has("Forest Medallion") && logicEvaluation.has("Fire Medallion") && logicEvaluation.has("Water Medallion") && logicEvaluation.has("Spirit Medallion") && logicEvaluation.has("Shadow Medallion"),
		Sticks: () => true,
		Bombs: () => logicEvaluation.has("Bomb Bag"),
		Hammer: () => logicEvaluation.has("Hammer"),
		Bow: () => logicEvaluation.has("Progressive Bow"),
		Mirror_Shield: () => logicEvaluation.has("Mirror Shield"),
		Slingshot: () => logicEvaluation.has("Slingshot"),
		Iron_Boots: () => logicEvaluation.has("Iron Boots"),
		Hover_Boots: () => logicEvaluation.has("Hover Boots"),
		Progressive_Wallet: () => logicEvaluation.has("Progressive Wallet"),
		Gerudo_Membership_Card: () => logicEvaluation.has("Gerudo Card"),
		Progressive_Hookshot: () => logicEvaluation.has("Progressive Hookshot"),
		Progressive_Strength_Upgrade: () => logicEvaluation.has("Progressive Strength Upgrade"),
		Blue_Fire: () => logicEvaluation.has_bottle(),
		Bonooru: () => true,
		can_play: x => (logicEvaluation.Ocarina()) && logicEvaluation.has(x),
		Boomerang: () => logicEvaluation.has("Boomerang"),
		Kokiri_Sword: () => true,
		Ocarina: () => logicEvaluation.has("Fairy Ocarina") || logicEvaluation.has("Ocarina of Time") || logicEvaluation.has("Ocarina"),
		Zeldas_Letter: () => logicEvaluation.has("Zeldas Letter"),
		Eyedrops: () => logicEvaluation.has("Eyedrops"),
		Claim_Check: () => logicEvaluation.has("Claim Check"),
		Forest_Medallion: () => logicEvaluation.has("Forest Medallion"),
		Fire_Medallion: () => logicEvaluation.has("Fire Medallion"),
		Water_Medallion: () => logicEvaluation.has("Water Medallion"),
		Spirit_Medallion: () => logicEvaluation.has("Spirit Medallion"),
		Shadow_Medallion: () => logicEvaluation.has("Shadow Medallion"),
		Light_Medallion: () => logicEvaluation.has("Light Medallion"),
		Big_Poe: () => logicEvaluation.has("Big Poe"),
		Bottle_with_Letter: () => logicEvaluation.has("Bottle with Letter"),
		can_child_attack: () => true,
		has_bottle: () => items.filter(x => x.includes("Bottle")).length > 0,
		can_use_projectile: () => logicEvaluation.has_explosives() || (logicEvaluation.is_adult() && (logicEvaluation.has("Progressive Bow") || logicEvaluation.has("Progressive Hookshot"))) || (logicEvaluation.is_child() && (logicEvaluation.has("Progressive Slingshot") || logicEvaluation.has("Boomerang"))),
		here: () => true,
		has_fire_source: () => logicEvaluation.can_use("Dins Fire") || logicEvaluation.can_use("Fire Arrows"),
		has_fire_source_with_torch: () => logicEvaluation.has_fire_source() || logicEvaluation.is_child(),
		can_stun_deku: () => true,
		can_summon_gossip_fairy: () => true,
		can_summon_gossip_fairy_without_suns: () => true,
		can_finish_GerudoFortress: () => true,
		can_blast_or_smash: () => logicEvaluation.has_explosives() || logicEvaluation.can_use("Hammer"),
		can_dive: () => logicEvaluation.has("Progressive Scale"),
		logic_fewer_tunic_requirements: () => true,
		is_child: () => age == "child",
		is_adult: () => age == "adult",
		can_plant_bugs: () => logicEvaluation.is_child() && logicEvaluation.has_bottle(),
		can_plant_bean: () => logicEvaluation.is_child(),
		can_cut_shrubs: () => logicEvaluation.is_adult() || logicEvaluation.has("Kokiri Sword") || logicEvaluation.Boomerang() || logicEvaluation.has_explosives(),
		can_ride_epona: () => logicEvaluation.is_adult() && logicEvaluation.can_play("Eponas Song"),
		found_bombchus: () => settings["bombchus_in_logic"] ? items.filter(x => x.includes("Bombchus")).length > 0 : logicEvaluation.has("Bomb Bag"),
		has_shield: () => (logicEvaluation.is_adult() && logicEvaluation.has("Hylian_Shield")) || (logicEvaluation.is_child() && logicEvaluation.has("Deku_Shield")),
		at_night: () => true,
		damage_multiplier: () => true,
		at: () => true,
		keysanity: () => settings["shuffle_smallkeys"] == "keysanity",
		shuffle_dungeon_entrances: () => false,
		can_trigger_lacs: () => logicEvaluation.has("Shadow Medallion") && logicEvaluation.has("Spirit Medallion"),
		at_day: () => true,
		at_dampe_time: () => true,
		guarantee_trade_path: () => true,
		Song_of_Time: () => logicEvaluation.can_play("Song of Time"),
		Eponas_Song: () => logicEvaluation.can_play("Eponas Song"),
		Suns_Song: () => logicEvaluation.can_play("Suns Song"),
		Song_of_Storms: () => logicEvaluation.can_play("Song of Storms"),
		Zeldas_Lullaby: () => logicEvaluation.can_play("Zeldas Lullaby"),
		bombchus_in_logic: () => true,
		can_open_bomb_grotto: () => logicEvaluation.can_blast_or_smash(),
		can_open_storms_grotto: () => logicEvaluation.can_play("Song of Storms"),
		can_open_storm_grotto: () => logicEvaluation.can_play("Song of Storms"),
		had_night_start: () => true,
		can_leave_forest: () => true,
		Dins_Fire: () => logicEvaluation.has("Dins Fire"),
		Fairy: () => logicEvaluation.has_bottle(),
		Fire_Arrows: () => logicEvaluation.can_use("Fire Arrows"),
		shuffle_scrubs: () => settings["shuffle_scrubs"] == "on",
		free_scarecrow: () => true,
		open_gerudo_fortress: () => settings["gerudo_fortress"] == "open",
		closed_zora_fountain: () => settings["zora_fountain"] == "closed",
		adult_zora_fountain: () => settings["zora_fountain"] == "adult",
		Magic_Meter: () => logicEvaluation.has("Magic Meter"),
		Nuts: () => true,
		Child_Water_Temple: () => false,
		shuffle_overworld_entrances: () => settings["entrance_shuffle"] == "all",
		open_door_of_time: () => settings["open_door_of_time"],
		Weird_Egg: () => logicEvaluation.has("Weird Egg"),
		shuffle_weird_egg: () => settings.shuffle_weird_egg,
		can_build_rainbow_bridge: () => (settings.bridge == "open") ||
										(settings.bridge == "vanilla" && logicEvaluation.has("Shadow Medallion") && logicEvaluation.has("Spirit Medallion") && logicEvaluation.has("Light Arrows")) ||
										(settings.bridge == "stones" && logicEvaluation.has_all_stones()) ||
										(settings.bridge == "medallions" && logicEvaluation.has_all_medallions()) ||
										(settings.bridge == "dungeons" && logicEvaluation.has_all_stones() && logicEvaluation.has_all_medallions()) ||
										(settings.bridge == "tokens" && items.filter(x => x == "Gold Skulltula Token").length >= 100),
		Deliver_Letter: () => logicEvaluation.has("Bottle with Letter"),
		open_zora_fountain: () => settings.zora_fountain == "open",
		Fish: () => logicEvaluation.has_bottle(),
		skipped_trial: (x) => save_file.trials[x] == "inactive",
		"Showed Mido Sword & Shield": () => parseLogicRule(save_file, "open_forest or (is_child and Kokiri_Sword and has(Deku_Shield))"),
		"Odd Mushroom Access": () => parseLogicRule(save_file, "is_adult and ('Cojiro Access' or Cojiro)"),
		"Poachers Saw Access": () => parseLogicRule(save_file, "is_adult and 'Odd Potion Access'"),
		"Bonooru": () => parseLogicRule(save_file, "is_child and Ocarina"),
		"Eyedrops Access": () => parseLogicRule(save_file, " is_adult and ('Eyeball Frog Access' or (Eyeball_Frog and disable_trade_revert))"),
		"Broken Sword Access": () => parseLogicRule(save_file, "is_adult and ('Poachers Saw Access' or Poachers_Saw)"),
		"Carpenter Rescue": () => parseLogicRule(save_file, "can_finish_GerudoFortress"),
		"Gerudo Fortress Gate Open": () => parseLogicRule(save_file, "is_adult and Gerudo_Membership_Card"),
		"Gerudo Fortress Gate Open": () => parseLogicRule(save_file, " is_adult and Gerudo_Membership_Card and (shuffle_gerudo_card or shuffle_overworld_entrances or shuffle_special_indoor_entrances)"),
		"Sell Big Poe": () => parseLogicRule(save_file, "is_adult and Bottle_with_Big_Poe"),
		"Skull Mask": () => parseLogicRule(save_file, "( is_child and Zeldas_Letter)"),
		"Mask of Truth": () => parseLogicRule(save_file, "'Skull Mask' and ( is_child and can_play(Sarias_Song)) and ( is_child and at_day) and ( is_child and has_all_stones)"),
		"Cojiro Access": () => parseLogicRule(save_file, "is_adult and 'Wake Up Adult Talon'"),
		"Kakariko Village Gate Open": () => parseLogicRule(save_file, "is_child and Zeldas_Letter"),
		"Wake Up Adult Talon": () => parseLogicRule(save_file, "is_adult and (Pocket_Egg or Pocket_Cucco)"),
		"Drain Well": () => parseLogicRule(save_file, "is_child and can_play(Song_of_Storms)"),
		"Odd Potion Access": () => parseLogicRule(save_file, " is_adult and has(Odd_Mushroom)"),
		"Prescription Access": () => parseLogicRule(save_file, "is_adult and ('Broken Sword Access' or Broken_Sword)"),
		"Goron City Child Fire": () => parseLogicRule(save_file, "is_child and can_use(Dins_Fire)"),
		"Goron City Woods Warp Open": () => parseLogicRule(save_file, " can_blast_or_smash or can_use(Dins_Fire) or can_use(Bow) or Progressive_Strength_Upgrade or 'Goron City Child Fire'"),
		"Stop Link the Goron": () => parseLogicRule(save_file, " is_adult and (Progressive_Strength_Upgrade or has_explosives or Bow or (logic_link_goron_dins and can_use(Dins_Fire)))"),
		"Goron City Woods Warp Open": () => parseLogicRule(save_file, "can_blast_or_smash or can_use(Dins_Fire)"),
		"Goron City Child Fire": () => parseLogicRule(save_file, "can_use(Sticks)"),
		"Zora Thawed": () => parseLogicRule(save_file, "is_adult and Blue_Fire"),
		"Eyeball Frog Access": () => parseLogicRule(save_file, " is_adult and 'Zora Thawed' and (Eyedrops or Eyeball_Frog or Prescription or 'Prescription Access')"),
		"Epona": () => parseLogicRule(save_file, "can_play(Eponas_Song) and is_adult and at_day"),
		"Links Cow": () => parseLogicRule(save_file, "can_play(Eponas_Song) and is_adult and at_day"),
		"Forest Trial Clear": () => parseLogicRule(save_file, "can_use(Light_Arrows) and (Fire_Arrows or Dins_Fire)"),
		"Fire Trial Clear": () => parseLogicRule(save_file, " can_use(Goron_Tunic) and can_use(Golden_Gauntlets) and can_use(Light_Arrows) and can_use(Longshot)"),
		"Water Trial Clear": () => parseLogicRule(save_file, "Blue_Fire and Hammer and can_use(Light_Arrows)"),
		"Shadow Trial Clear": () => parseLogicRule(save_file, " can_use(Light_Arrows) and Hammer and ((Fire_Arrows and can_see_with_lens) or (can_use(Longshot) and (Hover_Boots or (Dins_Fire and can_see_with_lens))))"),
		"Spirit Trial Clear": () => parseLogicRule(save_file, " can_use(Light_Arrows) and Mirror_Shield and has_bombchus and (logic_spirit_trial_hookshot or Progressive_Hookshot)"),
		"Light Trial Clear": () => parseLogicRule(save_file, " can_use(Light_Arrows) and Progressive_Hookshot and (Small_Key_Ganons_Castle, 2) and can_see_with_lens"),
		"Deku Tree Clear": () => parseLogicRule(save_file, " (has_shield) and (is_adult or Kokiri_Sword or Sticks)"),
		"Forest Temple Amy and Meg": () => parseLogicRule(save_file, "can_use(Bow)"),
		"Forest Temple Jo and Beth": () => parseLogicRule(save_file, "can_use(Bow)"),
		"Child Water Temple": () => parseLogicRule(save_file, "is_child"),
		"Water Temple Clear": () => parseLogicRule(save_file, "Boss_Key_Water_Temple and can_use(Longshot)"),
	}

	rule = rule.trim();
	var stack = [];
	var it = 0;
	var curChar = ' ';
	var curWord = '';
	var leftToConsume = rule;

	function evaluate(term, params = []) {
		if (term.includes("Small_Key") || term.includes("Boss_Key") || term.startsWith("logic_")) {
			return true;
		}
		if (!(term in logicEvaluation)) {
			throw "Unrecognized term: " + term;
		}
		return logicEvaluation[term](params.length == 1 ? params[0] : params);
	}

	function peekChar(n = 1) {
		return rule.substring(it, it + n);
	}

	function getChar(n = 1) {
		//console.log(rule.substring(0, it) + '[' + rule.substring(it, it+n) + ']' + rule.substring(it+n, rule.length));
		it += n;
		leftToConsume = rule.substring(it, rule.length);
		return rule.substring(it - n, it);
	}

	function getNum() {
		var n = 0;
		while (/^[0-9]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
			n++;
		}
		return getChar(n);
	}

	function commaFollowsToken() {
		var n = 1;
		if (peekChar() == "'") {
			while (it + n < rule.length) {
				if (/^'[^']*' *,$/.test(peekChar(n))) {
					return true;
				}
				else if (/^'[^']*' *[^,]$/.test(peekChar(n))) {
					return false;
				}
				n++;
			}
			return false;
		}
		else {
			while (it + n < rule.length) {
				if (/^[A-Za-z_]+ *,$/.test(peekChar(n))) {
					return true;
				}
				else if (/^[A-Za-z_]+ +[^,]$/.test(peekChar(n)) || /^[A-Za-z_]+ *[^,A-Za-z_]$/.test(peekChar(n))) {
					return false;
				}
				n++;
			}
			return false;
		}
	}

	function whitespace() {
		while (peekChar() == ' ') {
			getChar();
		}
	}

	function peekToken() {
		var n = 0;
		if (peekChar() == "'") {
			while (!/^'[^']*'$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			return peekChar(n + 1).substring(1, n + 1);
		}
		else {
			while (/^[A-Za-z0-9_]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			return peekChar(n);
		}
	}

	function getToken() {
		var n = 0;
		if (peekChar() == "'") {
			while (!/^'[^']*'$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			getChar();
			var tok = getChar(n - 1);
			getChar();
			return tok;
		}
		else {
			while (/^[A-Za-z0-9_]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			return getChar(n);
		}
	}

	function expression() {
		whitespace();
		var num = term();
		whitespace();
		while (peekToken() == 'and' || peekToken() == 'or') {
			whitespace();
			var op = getToken();
			whitespace();
			if (op == 'and') {
				num = term() && num;
			}
			if (op == 'or') {
				num = term() || num;
			}
			whitespace();
		}
		return num;
	}

	function params() {
		var retval = [];
		retval.push(getToken());
		whitespace();
		while (peekChar() == ',') {
			getChar();
			whitespace();
			retval.push(getToken());
		}
		return retval;
	}

	function tuple() {
		var item = getToken();
		whitespace();
		var comma = getChar();
		whitespace();
		var num = parseInt(getNum());
		return items.filter(x => x == item.replace(/_/g, " ")).length >= num;
	}

	function term() {
		var negate = false;
		if (peekToken() == 'not') {
			negate = true;
			getToken();
			whitespace();
		}
		if (peekChar() == '(') {
			getChar();
			whitespace();
			if (commaFollowsToken()) {
				var expr = tuple();
				whitespace();
				if (getChar() != ")") {
					throw `Expected character in tuple at position ${it}: ')'`;
				}
				return negate ? !expr : expr;
			}
			else {
				var e = expression();
				whitespace();
				if (getChar() != ")") {
					throw `Expected character in expression at position ${it}: ')'`;
				};
				return negate ? !e : e;
			}
		}
		else {
			var token = getToken();
			if (peekChar() == '(') {
				getChar();
				whitespace();
				var parameters = params();
				whitespace();
				if (getChar() != ")") {
					throw `Expected character in function call at position ${it}: ')'`;
				}
				var expr = evaluate(token, parameters);
				return negate ? !expr : expr;
			}
			else {
				var expr = evaluate(token);
				return negate ? !expr : expr;
			}
		}
	}

	return expression();
}

function buildRule(save_file, region, location) {
	var paths = [];
	var first = logic.defaultAreas[region];

	var subregions = logic[region];
	if (save_file["dungeons"].has(region)) {
		subregions = logic[region][save_file["dungeons"].get(region)];
	}

	var visited = {}
	var path = {}
	for (subregion in subregions) {
		visited[subregion] = false;
	}

	function findPaths(node, ind) {
		visited[node] = true;
		path[ind] = node;
		ind++;

		if ("locations" in subregions[node] && location in subregions[node]["locations"]) {
			thisPath = [];
			for (var i = 0; i < ind-1; i++) {
				thisPath.push(subregions[path[i]]["exits"][path[i+1]]);
			}
			thisPath.push(subregions[node]["locations"][location]);
			paths.push(`(${thisPath.join(") and (")})`);
		}
		else {
			Object.keys(subregions[node]["exits"]).filter(x => x in subregions).forEach(function(exit) {
				if (!visited[exit]) {
					findPaths(exit, ind);
				}
			});
		}

		ind--;
		visited[node] = false;
	}

	findPaths(first, 0);
	if (paths.length == 0) {
		return "False";
	}
	return "(" + paths.join(") or (") + ")";
}

function canCheckLocation(save_file, location) {
	return parseLogicRule(save_file, buildRule(save_file, save_file["current_region"], location));
}

function testAllRules(save_file) {
	var eventsRules = [];
	for (region in logic) {
		if (region == "defaultAreas") {
			continue;
		}
		var subregions = logic[region];
		if ("vanilla" in logic[region]) {
			subregions = logic[region]["mq"];
		}
		else {
			continue;
		}
		console.log(region);
		for (subregion in subregions) {
			console.log(subregion);
			if ("exits" in subregions[subregion]) {
				for (exit in subregions[subregion]["exits"]) {
					try {
						parseLogicRule(save_file, subregions[subregion]["exits"][exit]);
					}
					catch (err) {
						return err;
					}
				}
			}
			if ("locations" in subregions[subregion]) {
				for (location in subregions[subregion]["locations"]) {
					try {
						parseLogicRule(save_file, subregions[subregion]["locations"][location]);
					}
					catch (err) {
						return err;
					}
				}
			}
		}
	}
	return "Success";
}

function getLocations(save_file, region) {
	var all_locs = [];
	var subregions = logic[region];
	if (save_file["dungeons"].has(region)) {
		subregions = logic[region][save_file["dungeons"].get(region)];
	}
	for (subregion in subregions) {
		if ("locations" in subregions[subregion]) {
			all_locs = all_locs.concat(Object.keys(subregions[subregion]["locations"]));
		}
	}
	return all_locs.filter(x => Array.from(save_file.locations.keys()).includes(x) || x.startsWith("GS "));
}

module.exports.canCheckLocation = canCheckLocation;
module.exports.getLocations = getLocations;
module.exports.buildRule = buildRule;
module.exports.testAllRules = testAllRules;
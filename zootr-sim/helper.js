var logic = require("./logic.js");

function parseLogicRule(save_file, rule) {
	var items = save_file["current_items"];
	var settings = save_file["settings"];
	var age = save_file["current_age"];
	var checked_locations = save_file["checked_locations"];
	var logicEvaluation = {
		True: () => true,
		False: () => false,
		can_use: x => (logicEvaluation.is_magic_item(x) && logicEvaluation.has("Magic Meter") && logicEvaluation.has(x)) ||
			(logicEvaluation.is_adult_item(x) && logicEvaluation.is_adult() && logicEvaluation.has(x)) ||
			(logicEvaluation.is_magic_arrow(x) && logicEvaluation.is_adult() && logicEvaluation.has("Progressive Bow") && logicEvaluation.has(x)) ||
			(logicEvaluation.is_child_item(x) && logicEvaluation.is_child() && logicEvaluation.has(x)),
		is_magic_item: x => x == "Dins Fire" || x == "Farores Wind" || x == "Nayrus Love" || x == "Lens of Truth",
		is_magic_arrow: x => x == "Fire Arrows" || x == "Light Arrows",
		is_adult_item: x => x == "Progressive Bow" || x == "Hammer" || x == "Iron Boots" || x == "Hover Boots" || x == "Progressive Hookshot" || x == "Progressive Strength Upgrade" || x == "Scarecrow" || x == "Distant_Scarecrow",
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
		"Skull Mask": () => true,
		"Mask of Truth": () => logicEvaluation.has_all_stones(),
		Zeldas_Letter: () => logicEvaluation.has("Zeldas Letter"),
		Eyedrops: () => logicEvaluation.has("Eyedrops"),
		Claim_Check: () => logicEvaluation.has("Claim Check"),
		"Water Temple Clear": () => checked_locations.includes("Morpha"),
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
		is_adult: () => logicEvaluation.is_adult(),
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
		found_bombchus: () => logicEvaluation.has("Bombchus") || logicEvaluation.has("Bomb Bag"),
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
		"Eyedrops Access": () => true,
		"Goron City Child Fire": () => logicEvaluation.is_child() && logicEvaluation.can_use("Dins Fire"),
		bombchus_in_logic: () => true,
		can_open_bomb_grotto: () => logicEvaluation.can_blast_or_smash(),
		can_open_storms_grotto: () => logicEvaluation.can_play("Song of Storms"),
		had_night_start: () => true,
		can_leave_forest: () => true,
		Fairy: () => logicEvaluation.has_bottle(),
		Fire_Arrows: () => logicEvaluation.can_use("Fire Arrows"),
		"Links Cow": () => checked_locations.includes("Horseback Archery 1500 Points"),
		shuffle_scrubs: () => settings["shuffle_scrubs"] == "on",
		free_scarecrow: () => true,
		closed_zora_fountain: () => settings["zora_fountain"] == "closed",
		adult_zora_fountain: () => settings["zora_fountain"] == "adult",
		"Zora Thawed": () => logicEvaluation.is_adult() && logicEvaluation.has_bottle(),
		Magic_Meter: () => logicEvaluation.has("Magic Meter"),
		Nuts: () => true,
		Child_Water_Temple: () => false,
		"Stop Link the Goron": () => logicEvaluation.is_adult() && (logicEvaluation.has(Progressive_Strength_Upgrade) || logicEvaluation.has_explosives() || logicEvaluation.has("Bow") || logicEvaluation.can_use("Dins_Fire")),
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
	var subregions = logic[region];
	if (save_file["dungeons"].has(region)) {
		subregions = logic[region][save_file["dungeons"].get(region)];
	}
	for (subregion in subregions) {
		if ("locations" in subregions[subregion]) {
			if (location in subregions[subregion]["locations"]) {
				var rule = subregions[subregion]["locations"][location];
				console.log(rule);
				return rule;
			}
		}
	}
}

function canCheckLocation(save_file, location) {
	return parseLogicRule(save_file, buildRule(save_file, save_file["current_region"], location));
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
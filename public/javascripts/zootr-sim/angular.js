var app = angular.module('zootrSim', []);

app.filter('removeSpaces', [function() {
	return function(string) {
		if (!angular.isString(string)) {
			return string;
		}
		return string.replace(/[\s]/g, '');
	};
}]);

app.filter('orderHints', function() {
	return function(items) {
		if (!items) {
			return [];
		}
		var retval = [];
		if ("Way of the Hero" in items) {
			retval.push("Way of the Hero");
		}
		if ("Foolish Choice" in items) {
			retval.push("Foolish Choice");
		}
		return retval.concat(Object.keys(items).filter(x => x != "Way of the Hero" && x != "Foolish Choice").reverse());
	};
});

app.filter('formatDuration', function () {
	return function (ms) {
		var totalsecs = ms/1000;
		var secs = Math.floor(totalsecs % 60);
		var min = Math.floor((totalsecs / 60) % 60);
		var hours = Math.floor(totalsecs / 3600);
		return `${hours}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};
});

app.directive('customOnChange', function() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.customOnChange);
			element.on('change', onChangeHandler);
			element.on('$destroy', function() {
				element.off();
			});
		}
	};
});

app.controller('simController', function($scope, $http, $interval) {
	
	$scope.known_medallions = {};
	$scope.current_items = [];

	$scope.now = Date.now();
	$interval(() => $scope.now = Date.now(), 1000);
	
	$scope.getAvailableLocations = function() {
		if (!$scope.playing) {
			return [];
		}
		$http.get(`/zootr-sim/getlocations/${$scope.playthroughId}/${$scope.current_region}`).then(function(response) {
			$scope.available_hints = response.data.filter(x => x.includes("Gossip Stone"));
			$scope.available_shop_items = response.data.filter(x => x.includes("Shop Item") || x.includes("Bazaar Item"));
			$scope.available_skulltulas = response.data.filter(x => x.startsWith("GS ") && !$scope.available_shop_items.includes(x));
			$scope.available_locations = response.data.filter(x => !$scope.available_shop_items.includes(x) && !$scope.available_skulltulas.includes(x) && !$scope.available_hints.includes(x));
		}, function(error) {
			console.error(error);
		});
	}
	
	$scope.getAvailableEntrances = function() {
		$http.get(`/zootr-sim/getentrances/${$scope.playthroughId}/${$scope.current_region}`).then(function (response) {
			$scope.available_entrances = response.data;
		}, function (error) {
			console.error(error);
		});
	};

	$scope.checkingLocation = false;
	
	$scope.settingsPresets = {
		'Settings Presets': '',
		'Default / Beginner': 'AJCNG32ENSAAZNBAAVLAAAAAEBAASHSWAA',
		'Easy Mode': 'AJGPG32ESVNAHAAAATCAJELEYEAFAAASFBAASRSWAA',
		'Standard Weekly (2020-01-04)': 'AJEPGBAESZAAHJAAATCAAFAACSAE2AE2AETSUNASFDAASVWWAA',
		'Scrub Tournament': 'AJEPGBAESZAAHJAAATCAJELEYEAFAACSAE2AE2AETSCAUKAAA6EAFAA',
		'Hell Mode (minus Entrance Shuffle)': 'AJBWG32JNAAAZ69232RDCAEAGAJAAA8HAEAAEACQGE',
	};
	
	$scope.itemgrid = [
		"Slingshot", "Bomb Bag", "Bow", "Fire Arrows", "Dins Fire", "Zeldas Lullaby", "Minuet of Forest", 
		"Progressive Wallet", "Boomerang", "Progressive Hookshot", "Light Arrows", "Farores Wind", "Eponas Song", "Bolero of Fire", 
		"Bottle", "Lens of Truth", "Hammer", "Magic Meter", "Nayrus Love", "Sarias Song", "Serenade of Water", 
		"Kokiri Sword", "Ocarina", "Iron Boots", "Progressive Strength Upgrade", "Stone of Agony", "Suns Song", "Requiem of Spirit", 
		"Goron Tunic", "Zora Tunic", "Hover Boots", "Progressive Scale", "Child Trade", "Song of Time", "Nocturne of Shadow",
		"Deku Shield", "Hylian Shield", "Mirror Shield", "Bombchus", "Adult Trade", "Song of Storms", "Prelude of Light", 
	];
	
	$scope.buildRoute = function() {
		return $scope.route.replace(/(?:\r\n|\r|\n)/g, '<br/>');
	};
	
	$scope.checkLocation = function(loc) {
		if (!$scope.checkingLocation) {
			$scope.checkingLocation = true;
			var el = document.getElementById(loc);
			if (el) {
				el.classList.remove('logicfailed-anim');
				el.classList.add('loadinglink');
				el.style.animation = 'none';
				el.offsetHeight;
				el.style.animation = null;
			}
			$http.get(`/zootr-sim/checklocation/${$scope.playthroughId}/${loc}`).then(function(response) {
				if (loc == "Check Pedestal") {
					if ($scope.current_age == "adult") {
						$scope.checked_locations.push("Check Pedestal");
					}
					$scope.known_medallions = response.data;
					$scope.checkingLocation = false;
				}
				else if (loc == "Master Sword Pedestal") {
					$scope.current_age = response.data;
					$scope.checkingLocation = false;
				}
				else if (loc == "Ganon") {
					$scope.finished = response.data.finished;
					$scope.playtime = response.data.playtime;
					$scope.checkingLocation = false;
				}
				else {
					$scope.headline = `${loc}: ${response.data.item}`;
					$scope.checked_locations.push(loc);
					$scope.current_items.push(response.data.item);
					$scope.current_subregion = response.data.subregion;
					$scope.collected_warps = $scope.current_items.filter(x => warpSongs.includes(x));
					$scope.known_medallions = response.data.known_medallions;
					$scope.bombchu_count = response.data.bombchu_count;
					$scope.checkingLocation = false;
				}

				var el = document.getElementById(loc);
				if (el) {
					el.classList.remove('loadinglink');
				}
			}, function(error) {
				var el = document.getElementById(loc);
				if (error.status == 403) {
					console.error(`Logic required: ${error.data}`);
					$scope.headline = `Can't access that!`;
					if (el) {
						el.classList.add('logicfailed-anim');
						el.style.animation = 'none';
						el.offsetHeight;
						el.style.animation = null;
					}
				}
				else {
					console.error(error);
				}
				if (el) {
					el.classList.remove('loadinglink');
				}
				$scope.checkingLocation = false;
			}).catch(function(error) {
				$scope.checkingLocation = false;
				console.error(error);
			});
		}
		return;
		if (loc in logic[$scope.current_region] && !parseLogicRule(logic[$scope.current_region][loc])) {
			if (loc != "Treasure Chest Game" || Math.floor(Math.random() * 32) > 0) {
				$scope.headline = logic[$scope.current_region][loc];
				var el = document.getElementById(loc);
				el.classList.add('logicfailed-anim');
				el.style.animation = 'none';
				el.offsetHeight;
				el.style.animation = null;
				return;
			}
		}
		$scope.actions.push('Location:' + loc);
		if (loc.startsWith('Check Pedestal')) {
			$scope.checkedLocations.push(loc);
			if ($scope.current_age == 'adult') {
				$scope.checkedLocations.push('Check Pedestal (Stones)');
			}
			for (var key in $scope.medallions) {
				if (!$scope.current_items.includes($scope.medallions[key])) {
					if ($scope.medallions[key].includes('Medallion')) {
						if ($scope.current_age == 'adult') {
							$scope.known_medallions[key] = $scope.medallions[key];
						}
					}
					else {
						$scope.known_medallions[key] = $scope.medallions[key];
					}
				}
			}
		}
		else if (loc == 'Light Arrows Hint') {
			$scope.checkedLocations.push(loc);
			var lightlocation = Object.keys($scope.allLocations).find(key => $scope.allLocations[key] === 'Light Arrows');
			var lighthint = Object.keys(locationsByRegionAdult).find(key => locationsByRegionAdult[key].includes(lightlocation));
			if (typeof lighthint == 'undefined') {
				lighthint = Object.keys(locationsByRegionChild).find(key => locationsByRegionChild[key].includes(lightlocation));
			}
			if (!(lighthint in $scope.knownHints)) {
				$scope.knownHints[lighthint] = ['Light Arrows'];
			}
			else {
				$scope.knownHints[lighthint].push('Light Arrows');
			}
			$scope.headline = 'Ha ha ha... You\'ll never beat me by reflecting my lightning bolts and unleashing the arrows from '+lighthint+'!';
			$scope.route += 'Light Arrows Hint ('+lighthint+')\n';
		}
		else if (loc == 'Ganon') {
			if (false && !$scope.current_items.includes('Light Arrows')) {
				$scope.actions.pop();
				$scope.headline = 'Not without Light Arrows!';
			}
			else {
				$scope.finished = true;
				$scope.route += 'Ganon\n';
			}
		}
		else if (!(loc in $scope.allLocations) && loc.startsWith('GS ')) {
			$scope.current_items.push('Gold Skulltula Token');
			$scope.itemCounts['Gold Skulltula Token']++;
			$scope.checkedLocations.push(loc);
		}

		else {
			$scope.numChecksMade++;
			
			$scope.checkedLocations.push(loc);
			var item = $scope.allLocations[loc];
			if (item.includes('[Costs')) {
				item = item.split('[Costs')[0].trim();
			}
			$scope.current_items.push(item);
			$scope.route += loc + (importantItems.includes(item) ? ' ('+item+')' : '') + '\n';
			//$scope.headline = loc + ': ' + item;
			$scope.headline = logic[$scope.current_region][loc];
			$scope.itemCounts[item]++;
			
			if (loc in bosses) {
				$scope.known_medallions[bosses[loc]] = item;
			}
			
			if (loc in regionChangingChecks) {
				$scope.current_region = regionChangingChecks[loc];
			}
			
			if (warpSongs.includes(item)) {
				$scope.collectedWarps.push(item);
			}
		}

		$scope.updateForage();
	};
	
	$scope.hasKeys = function(dungeon) {
	return dungeon in {
		'Forest Temple':0,
		'Fire Temple':0,
		'Water Temple':0,
		'Shadow Temple':0,
		'Spirit Temple':0,
		'Spirit Temple':0,
		'Bottom of the Well':0,
		'Gerudo Fortress':0,
		'Gerudo Training Grounds':0,
		'Ganons Castle':0
	};
};

$scope.peekAt = function(loc) {
	var hintItem = $scope.allLocations[loc];
	if (!(loc in $scope.knownHints)) {
		$scope.knownHints[loc] = [hintItem];
	}
	else {
		$scope.knownHints[loc].push(hintItem);
	}
	$scope.peekedLocations.push(loc);
	$scope.headline = loc + ": " + hintItem;
	$scope.actions.push("Peek:" + loc);
	$scope.updateForage();
};

$scope.hasPeeked = function(loc) {
	return $scope.peekedLocations.includes(loc);
};

$scope.copyRoute = function() {
	if (!$scope.copying) {
		$scope.copying = true;
		new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, 1000);
		}).then(function() {
			$scope.copying = false;
			$scope.$apply();
		});
	}
	window.getSelection().selectAllChildren(document.getElementsByClassName('route')[0]);
	document.execCommand('copy');
	document.getSelection().removeAllRanges();
};

$scope.saveRoute = function() {
	var blob = new Blob([$scope.route.replace(/(?:\r\n|\r|\n)/g, '\r\n')], {type: "text/plain;charset=utf-8"});
	window.saveAs(blob, $scope.currentSeed + "-route.txt");
};

$scope.hasBossKey = function(dungeon) {
	return dungeon in {
		'Forest Temple':0,
		'Fire Temple':0,
		'Water Temple':0,
		'Shadow Temple':0,
		'Spirit Temple':0,
		'Spirit Temple':0,
		'Ganons Castle':0
	};
};
	
	$scope.takeEntrance = function(entrance) {
		if (!$scope.takingEntrance) {
			$scope.takingEntrance = true;
			var el = document.getElementById(entrance);
			el.classList.remove('logicfailed-anim');
			el.classList.add('loadinglink');
			el.style.animation = 'none';
			el.offsetHeight;
			el.style.animation = null;
			$http.get(`/zootr-sim/takeentrance/${$scope.playthroughId}/${entrance}`).then(function(response) {
				$scope.current_region = response.data.region;
				$scope.current_subregion = response.data.subregion;
				if ($scope.current_subregion == "Lost Woods Bridge From Forest" && $scope.current_age == "child" && !$scope.checked_locations.includes("Gift from Saria")) {
					$scope.checkLocation("Gift from Saria");
				}
				$scope.getAvailableLocations();
				$scope.getAvailableEntrances();
				var el = document.getElementById(entrance);
				el.classList.remove('loadinglink');
				$scope.takingEntrance = false;
			}, function(err) {
				if (err.status == 403) {
					$scope.headline = "Can't access that!";
					console.error(`Logic required: ${err.data}`);
					var el = document.getElementById(entrance);
					el.classList.remove('loadinglink');
					el.classList.add('logicfailed-anim');
					el.style.animation = 'none';
					el.offsetHeight;
					el.style.animation = null;
				}
				else {
					console.error(err);
				}
				$scope.takingEntrance = false;
			})
		}
		return;
		$scope.actions.push('Entrance:' + $scope.current_region + ':' + entrance);
		if (entrance == 'Pull Master Sword') {
			$scope.currentAdult++;
			$scope.route += '\n---- ADULT ' + $scope.currentAdult + ' ----\n\n';
			$scope.current_age = 'adult';
		}
		else if (entrance == 'Place Master Sword') {
			$scope.currentChild++;
			$scope.route += '\n---- CHILD ' + $scope.currentChild + ' ----\n\n';
			$scope.current_age = 'child';
		}
		else if (entrance == 'Savewarp child') {
			$scope.current_region = 'Kokiri Forest';
			$scope.route += 'Savewarp\n';
		}
		else if (entrance == 'Savewarp adult') {
			$scope.current_region = 'Temple of Time';
			$scope.route += 'Savewarp\n';
		}
		else if (entrance in songTargets) {
			$scope.current_region = songTargets[entrance];
			$scope.route += 'Play ' + entrance + '\n';
		}
		else if ($scope.current_region == 'Kokiri Forest' && entrance == 'Hyrule Field' && $scope.current_age == 'child' && !$scope.checked_locations.includes('Gift from Saria')) {
			$scope.checkLocation("Gift from Saria");
			$scope.current_region = "Hyrule Field";
		}
		else {
			$scope.current_region = entrance;
		}
		$scope.getAvailableLocations();
		$scope.getAvailableEntrances();
		$http.get(`/zootr-sim/updateregion/${$scope.playthroughId}/${$scope.current_region}/${$scope.current_age}`);
	};
	
	$scope.dungeongrid = [
		'Deku Tree', 
		'Dodongos Cavern', 
		'Jabu Jabus Belly', 
		'Forest Temple', 
		'Fire Temple', 
		'Water Temple', 
		'Shadow Temple', 
		'Spirit Temple', 
		'Free',
		'Bottom of the Well', 
		'Gerudo Fortress', 
		'Gerudo Training Grounds', 
		'Ganons Castle' 
	];
	
	$scope.getMedallionImage = function(dungeon) {
		if (dungeon in $scope.known_medallions) {
			med = $scope.known_medallions[dungeon];
			var medToImage = {
				'Kokiri Emerald': 'stones.png',
				'Goron Ruby': 'stones.png',
				'Zora Sapphire': 'stones.png',
				'Forest Medallion': 'forest-small.png',
				'Fire Medallion': 'firewater.png',
				'Water Medallion': 'firewater.png',
				'Shadow Medallion': 'shadowspirit.png',
				'Spirit Medallion': 'shadowspirit.png',
				'Light Medallion': 'light-small.png',
			};
			return medToImage[med];
		}
		else if (!["Bottom of the Well", "Gerudo Fortress", "Gerudo Training Grounds", "Ganons Castle"].includes(dungeon)) {
			return 'unknown-small.png';
		}
		else {
			return '';
		}
	};
	
	$scope.nameToImageTitle = {
		'Deku Tree': 'deku.png',
		'Dodongos Cavern': 'dodongo.png',
		'Jabu Jabus Belly': 'jabu.png',
		'Forest Temple': 'forest.png',
		'Fire Temple': 'fire.png',
		'Water Temple': 'water.png',
		'Shadow Temple': 'shadow.png',
		'Spirit Temple': 'spirit.png',
		'Free': 'free.png',
		'Spirit Temple': 'spirit.png',
		'Bottom of the Well': 'botw.png',
		'Ice Cavern': 'ice.png',
		'Gerudo Fortress': 'gf.png',
		'Gerudo Training Grounds': 'gtg.png',
		'Ganons Castle': 'gc.png'
	}

	$scope.getImage = function(item) {
		if (!$scope.playing) {
			return '';
		}
		var count = $scope.current_items.filter(x => x == item).length;
		if (item == 'Bottle') {
			var bottles = $scope.current_items.filter(x => x.startsWith("Bottle")).length;
			var hasLetter = $scope.current_items.includes("Bottle with Letter");
			return (hasLetter ? 'ruto' : '') + 'bottle' + bottles + '.png';
		}
		else if (item == 'Child Trade') {
			retval = [];
			if ($.inArray('Weird Egg', $scope.current_items) == -1) {
				return 'egg.png';
			}
			if ($.inArray('Weird Egg', $scope.current_items) != -1) {
				retval = 'egg.png';
			}
			if ($.inArray('Chicken', $scope.current_items) != -1) {
				retval = 'cucco.png';
			}
			if ($.inArray('Zeldas Letter', $scope.current_items) != -1) {
				retval = 'letter.png';
			}
			if ($.inArray('Keaton Mask', $scope.current_items) != -1) {
				retval = 'keaton.png';
			}
			if ($.inArray('Skull Mask', $scope.current_items) != -1) {
				retval = 'skull.png';
			}
			if ($.inArray('Spooky Mask', $scope.current_items) != -1) {
				retval = 'spooky.png';
			}
			if ($.inArray('Bunny Hood', $scope.current_items) != -1) {
				retval = 'bunny.png';
			}
			if ($.inArray('Mask of Truth', $scope.current_items) != -1) {
				retval = 'truth.png';
			}
			return retval;
		}
		else if (item == 'Adult Trade') {
			if ($.inArray('Claim Check', $scope.current_items) != -1) {
				return 'claim.png';
			}
			if ($.inArray('Eyedrops', $scope.current_items) != -1) {
				return 'eyedrops.png';
			}
			if ($.inArray('Eyeball Frog', $scope.current_items) != -1) {
				return 'frog.png';
			}
			if ($.inArray('Prescription', $scope.current_items) != -1) {
				return 'prescription.png';
			}
			if ($.inArray('Broken Sword', $scope.current_items) != -1) {
				return 'broken_sword.png';
			}
			if ($.inArray('Poachers Saw', $scope.current_items) != -1) {
				return 'saw.png';
			}
			if ($.inArray('Odd Mushroom', $scope.current_items) != -1) {
				return 'mushroom.png';
			}
			if ($.inArray('Cojiro', $scope.current_items) != -1) {
				return 'cojiro.png';
			}
			if ($.inArray('Pocket Cucco', $scope.current_items) != -1) {
				return 'cucco.png';
			}
			if ($.inArray('Pocket Egg', $scope.current_items) != -1) {
				return 'egg.png';
			}
			else {
				return 'egg.png';
			}
		}
		else if (item == 'Gold Skulltulas') {
			return 'skulltula.png';
		}
		else if (item == 'Progressive Wallet' && !$scope.isShopsanity && count == 2) {
			return 'wallet2.png';
		}
		else {
			if (count >= $scope.codeToImage[item].length) {
				return $scope.codeToImage[item][$scope.codeToImage[item].length - 1];
			}
			else {
				return $scope.codeToImage[item][count];
			}
		}
	}
	
	$scope.getCount = function (item) {
		if (!$scope.playing) {
			return '';
		}
		return $scope.current_items.filter(x => x == item).length;
	}

	$scope.lightUpTracker = function(item) {
		if (item == "Child Trade") {
			return $scope.current_items.filter(x => ["Weird Egg", "Chicken", "Zeldas Letter", "Keaton Mask", "Skull Mask", "Spooky Mask", "Bunny Hood", "Mask of Truth"].includes(x)).length > 0;
		}
		else if (item == "Adult Trade") {
			return $scope.current_items.filter(x => ["Pocket Egg", "Pocket Cucco", "Cojiro", "Odd Mushroom", "Poachers Saw", "Broken Sword", "Prescription", "Eyeball Frog", "Eyedrops", "Claim Check"].includes(x)).length > 0;
		}
		else if (item == "Bottle") {
			return $scope.current_items.filter(x => x.startsWith("Bottle")).length > 0;
		}
		else {
			return $scope.getCount(item) > 0;
		}
	}

	$scope.throwAway = function(item) {
		$scope.playthroughId = null;
		$scope.headline = "";
		localforage.setItem("playthroughId", null);
	};
	
	$scope.countItem = function(item) {
		return 0;
	};

	$scope.setWind = function() {
		if ($scope.current_age == "child") {
			$scope.windRegionChild = $scope.current_region;
		}
		else {
			$scope.windRegionAdult = $scope.current_region;
		}
		$scope.updateForage();
	};

	$scope.recallWind = function() {
		if ($scope.current_age == "child") {
			$scope.current_region = $scope.windRegionChild;
			$scope.windRegionChild = "";
		}
		else {
			$scope.current_region = $scope.windRegionAdult;
			$scope.windRegionAdult = "";
		}
		$scope.updateForage();
	};
	
	$scope.downloadSpoilerLog = function() {
		var blob = new Blob([JSON.stringify($scope.currentSpoilerLog, null, '\t')], {type: "application/json"});
		window.saveAs(blob, $scope.currentSeed + "-spoiler.json");
	};
	
	$scope.codeToImage = {
		'Ocarina': ['fairyocarina.png', 'fairyocarina.png', 'ocarina.png'],
		'Slingshot': ['slingshot.png', 'sling3.png', 'sling4.png', 'sling5.png'],
		'Bomb Bag': ['bomb.png', 'bomb2.png', 'bomb3.png', 'bomb4.png'],
		'Bow': ['bow.png', 'bow3.png', 'bow4.png', 'bow5.png'],
		'Fire Arrows': ['firearrow.png', 'firearrow.png'],
		'Dins Fire': ['din.png', 'din.png'],
		'Zeldas Lullaby': ['zelda.png', 'zelda.png'],
		'Minuet of Forest': ['green_note.png', 'green_note.png'],
		'Progressive Wallet': ['wallet.png', 'wallet1.png', 'wallet2a.png', 'wallet3.png'],
		'Boomerang': ['boomerang.png', 'boomerang.png'],
		'Progressive Hookshot': ['hookshotd.png', 'hookshot.png', 'longshot.png'],
		'Light Arrows': ['lightarrow.png', 'lightarrow.png'],
		'Farores Wind': ['farore.png', 'farore.png'],
		'Eponas Song': ['epona.png', 'epona.png'],
		'Bolero of Fire': ['red_note.png', 'red_note.png'],
		'Lens of Truth': ['lens.png', 'lens.png'],
		'Hammer': ['hammer.png', 'hammer.png'],
		'Magic Meter': ['magic.png', 'magic.png', 'magic2.png'],
		'Nayrus Love': ['nayru.png', 'nayru.png'],
		'Sarias Song': ['saria.png', 'saria.png'],
		'Serenade of Water': ['blue_note.png', 'blue_note.png'],
		'Kokiri Sword': ['sword1.png', 'sword1.png'],
		'Biggoron Sword': ['sword3.png', 'sword3.png'],
		'Iron Boots': ['ironboots.png', 'ironboots.png'],
		'Progressive Strength Upgrade': ['lift1.png', 'lift1.png', 'lift2.png', 'lift3.png'],
		'Stone of Agony': ['agony.png', 'agony.png'],
		'Suns Song': ['sunsong.png', 'sunsong.png'],
		'Requiem of Spirit': ['orange_note.png', 'orange_note.png'],
		'Goron Tunic': ['redtunic.png', 'redtunic.png'],
		'Zora Tunic': ['besttunic.png', 'besttunic.png'],
		'Hover Boots': ['hoverboots.png', 'hoverboots.png'],
		'Progressive Scale': ['scale1.png', 'scale1.png', 'scale2.png'],
		'Song of Time': ['songoftime.png', 'songoftime.png'],
		'Nocturne of Shadow': ['purple_note.png', 'purple_note.png'],
		'Deku Shield': ['shield1.png', 'shield1.png', 'shield1.png', 'shield1.png', 'shield1.png'],
		'Hylian Shield': ['shield2.png', 'shield2.png', 'shield2.png', 'shield2.png'],
		'Mirror Shield': ['shield3.png', 'shield3.png'],
		'Bombchus': ['bombchu.png', 'bombchu.png'],
		'Song of Storms': ['songofstorms.png', 'songofstorms.png'],
		'Prelude of Light': ['yellow_note.png', 'yellow_note.png']
	};
	
	$scope.settingsPreset = '';
	
	$scope.result = '';
	
	$scope.hashImages = {
		'Deku Stick': 'stick.png',
		'Deku Nut': 'nut.png',
		'Bow': 'bow.png',
		'Slingshot': 'slingshot.png',
		'Fairy Ocarina': 'fairyocarina.png',
		'Bombchu': 'bombchu.png',
		'Longshot': 'longshot.png',
		'Boomerang': 'boomerang.png',
		'Lens of Truth': 'lens.png',
		'Beans': 'bean.png',
		'Hammer': 'hammer.png',
		'Bottled Fish': 'fish.png',
		'Bottled Milk': 'milk.png',
		'Mask of Truth': 'truth.png',
		'SOLD OUT': 'soldout.png',
		'Cucco': 'cucco.png',
		'Mushroom': 'mushroom.png',
		'Saw': 'saw.png',
		'Frog': 'frog.png',
		'Master Sword': 'sword2.png',
		'Mirror Shield': 'shield3.png',
		'Kokiri Tunic': 'greentunic.png',
		'Hover Boots': 'hoverboots.png',
		'Silver Gauntlets': 'lift2.png',
		'Gold Scale': 'scale2.png',
		'Stone of Agony': 'agony.png',
		'Skull Token': 'skulltula.png',
		'Heart Container': 'heartcontainer.png',
		'Boss Key': 'boss_key.png',
		'Compass': 'compass.png',
		'Map': 'map.png',
		'Big Magic': 'magic2.png',
	};
	
	$scope.toggleDarkMode = function() {
		$scope.darkModeOn = !$scope.darkModeOn;
		localforage.setItem('darkModeOn', $scope.darkModeOn);
	};
	
	$scope.presetSelected = function() {
		$scope.settingsString = $scope.settingsPreset;
	};
	
	$scope.currentShop = function() {
		if ($scope.current_region == 'Kokiri Forest') {
			return 'Kokiri Shop';
		}
		else if ($scope.current_region == 'Market') {
			if ($scope.currentOtherShop == 'Castle Town Potion Shop' || $scope.currentOtherShop == 'Bombchu Shop') {
				return $scope.currentOtherShop;
			}
			else {
				return 'Castle Town Bazaar';
			}
		}
		else if ($scope.current_region == 'Kakariko Village') {
			if ($scope.currentOtherShop == 'Kakariko Potion Shop') {
				return $scope.currentOtherShop;
			}
			else {
				return 'Kakariko Bazaar';
			}
		}
		else if ($scope.current_region == 'Goron City') {
			return 'Goron Shop';
		}
		else if ($scope.current_region == 'Zoras Domain') {
			return 'Zora Shop';
		}
		else {
			return '';
		}
	}
	
	$scope.currentOtherShop = '';
	
	$scope.otherShops = function() {
		if ($scope.current_region == 'Market') {
			if ($scope.currentOtherShop == 'Castle Town Potion Shop') {
				return ['Castle Town Bazaar', 'Bombchu Shop'];
			}
			else if ($scope.currentOtherShop == 'Bombchu Shop') {
				return ['Castle Town Bazaar', 'Castle Town Potion Shop'];
			}
			else {
				return ['Castle Town Potion Shop', 'Bombchu Shop'];
			}
		}
		else if ($scope.current_region == 'Kakariko Village') {
			if ($scope.currentOtherShop == 'Kakariko Potion Shop') {
				return ['Kakariko Bazaar'];
			}
			else {
				return ['Kakariko Potion Shop'];
			}
		}
		else {
			return [];
		}
	};
	
	$scope.setShop = function(shop) {
		if (shop == 'Kakariko Bazaar' || shop == 'Castle Town Bazaar') {
			$scope.currentOtherShop = '';
		}
		else {
			$scope.currentOtherShop = shop;
		}
	};

	$scope.resumeFromId = function(id) {
		$scope.loading = true;
		$http.get(`/zootr-sim/resume?id=${id}`).then(function(response) {
			$scope.loading = false;
			$scope.initializeFromServer(response["data"]);
		}, function(error) {
			$scope.loading = false;
			if (error.status == 400) {
				$scope.loadError = "Invalid Playthrough ID.";
			}
			if (error.status == 404) {
				$scope.loadError = "Playthrough not found.";
			}
		});
	};

	$scope.initializeFromServer = function(data) {
		$scope.generating = false;
		$scope.locations = data["locations"];
		$scope.current_items = data["current_items"];
		$scope.fsHash = data["hash"];
		$scope.start_time = data["start_time"];
		$scope.playthroughId = data["id"];
		$scope.checked_locations = data["checked_locations"];
		$scope.current_age = data["current_age"];
		$scope.current_region = data["current_region"];
		$scope.current_subregion = data["current_subregion"];
		$scope.known_medallions = data["known_medallions"];
		$scope.known_hints = data["known_hints"];
		$scope.bombchu_count = data["bombchu_count"];
		$scope.finished = data["finished"];
		$scope.playtime = data["playtime"];
		$scope.collected_warps = $scope.current_items.filter(x => warpSongs.includes(x));
		$scope.playing = true;
		localforage.setItem("playthroughId", data["id"]);
		$scope.getAvailableLocations();
		$scope.getAvailableEntrances();
	}
	
	$scope.fetchSeed = function() {
		if ($scope.generating) {
			return;
		}
		$scope.generating = true;
		$scope.generationError = null;
		var url = '/zootr-sim/getspoiler?valid=true&settings='+$scope.settingsString+'&seed='+($scope.seed || '');
		$http({
			method: 'GET',
			url: url
		}).then(function successCallback(response) {
			$scope.initializeFromServer(response["data"]);
			return;
		}, function errorCallback(response) {
			$scope.generating = false;
			if (response.status == 400) {
				$scope.generationError = "Error! Invalid settings string."
			}
			else if (response.status == 401) {
				$scope.generationError = "Error! Invalid API key! This is not user error - please report this."
			}
			else if (response.status == 403) {
				$scope.generationError = "Error! Multiworld is not supported by the generator. Use the multiworld option."
			}
			else if (response.status == 408) {
				$scope.generationError = "Error! Request timed out."
			}
			else if (response.status == 502) {
				$scope.generationError = "Error! 502 Bad Gateway response from ootrandomizer.com.";
			}
			else {
				$scope.generationError = "Unknown error (please report this!): " + response.data;
			}
		});
	};
	
	$scope.fileSelected = function(event) {
		reader = new FileReader();
		reader.onload = function(e) {
			$scope.uploading = true;
			$http.post("/zootr-sim/uploadlog", e.target.result).then(function successCallback(response) {
				$scope.uploading = false;
				$scope.initializeFromServer(response["data"]);
			}, function errorCallback(response) {
				$scope.uploading = false;
				if (response.status == 413) {
					$scope.uploadError = "Error! File size too large. If this is a v5.2 spoiler log, report this so the limit can be increased.";
				}
				else if (response.status == 400) {
					$scope.uploadError = "Error! Parsing file failed. If this is a v5.2 spoiler log, please report this."
				}
				else {
					$scope.uploadError = "Unknown error (please report this!): " + response.data;
					console.error(response.data);
				}
			});
		}
		reader.readAsText(event.target.files[0]);
	}
	
	$scope.checkHint = function(stone) {
		if (!$scope.checkingLocation) {
			$scope.checkingLocation = true;
			$http.get(`/zootr-sim/checkhint/${$scope.playthroughId}/${stone}`).then(function(response) {
				$scope.headline = response.data.text;
				$scope.known_hints = response.data.known_hints;
				$scope.checked_locations.push(stone);
				$scope.current_subregion = response.data.subregion;
				$scope.bombchu_count = response.data.bombchu_count;
				$scope.checkingLocation = false;
			}, function(error) {
				if (error.status == 403) {
					console.error(`Logic required: ${error.data}`);
					$scope.headline = `Can't access that!`;
					var el = document.getElementById(stone);
					el.classList.add('logicfailed-anim');
					el.style.animation = 'none';
					el.offsetHeight;
					el.style.animation = null;
				}
				else {
					console.error(error);
				}
				$scope.checkingLocation = false;
			})
		}
		return;
		var hint = '';
		if (stone == 'Generic Grotto') {
			hint = $scope.gossipHints[stone];
			$scope.checkedHints.push(stone);
		}
		else {
			hint = $scope.gossipHints[$scope.current_region][stone];
			$scope.checkedHints.push($scope.current_region + ' ' + stone);
		}
		
		var hintInfo = parseHint(hint);
		var hintLoc = hintInfo[0];
		var hintItem = hintInfo[1];
		
		$scope.actions.push('Hint:' + stone + ':' + hintLoc);
		
		if (hintLoc.includes("/")) {
			hintLoc = hintLoc.split("/")[0] in $scope.allLocations ? hintLoc.split("/")[0] : hintLoc.split("/")[1];
		}
		
		if (hintLoc != '' && hintItem != '') {
			if (!(hintLoc in $scope.knownHints)) {
				$scope.knownHints[hintLoc] = [hintItem];
			}
			else {
				$scope.knownHints[hintLoc].push(hintItem);
			}
		}
		
		$scope.headline = hint;
		$scope.updateForage();
	};
	
	$scope.playing = false;
	
	$scope.getShopImage = function(item) {
		if (item.includes('Small Key')) {
			return 'small_key.png';
		}
		else if (item.includes('Boss Key')) {
			return 'boss_key.png';
		}
		else if (item.includes('Map')) {
			return 'map.png';
		}
		else if (item.includes('Compass')) {
			return 'compass.png';
		}
		else {
			return shopItemImages[item] || item;
		}
	};
	
	$scope.shopNPCs = {
		'Kokiri Shop': 'kokirishopnpc.png',
		'Castle Town Bazaar': 'marketbazaarnpc.png',
		'Castle Town Potion Shop': 'marketpotionnpc.png',
		'Bombchu Shop': 'bombchunpc.png',
		'Kakariko Bazaar': 'marketbazaarnpc.png',
		'Kakariko Potion Shop': 'marketpotionnpc.png',
		'Zora Shop': 'zoranpc.png',
		'Goron Shop': 'goronnpc.png',
	};
	
	var getShop = function(location) {
		var shop = location.split('Item')[0].trim();
		if (['Kokiri Shop', 'Castle Town Bazaar', 'Castle Town Potion Shop', 'Bombchu Shop', 'Kakariko Bazaar', 'Kakariko Potion Shop', 'Goron Shop', 'Zora Shop'].includes(shop)) {
			return shop;
		}
		else {
			return '';
		}
	};
	
	$scope.buyItem = function(ind) {
		if ($scope.shopContents[$scope.currentShop()][ind].bought) {
			return;
		}
		$scope.actions.push('Buy:' + $scope.currentShop() + ':' + ind);
		var item = $scope.shopContents[$scope.currentShop()][ind].item;
		if (!$scope.shopContents[$scope.currentShop()][ind].refill) {
			$scope.checkedLocations.push("shopitem|" + $scope.currentShop() + "|" + ind);
			$scope.shopContents[$scope.currentShop()][ind].bought = true;
		
			$scope.numChecksMade++;
			
			if (importantItems.includes(item)) {
				$scope.route += 'Bought ' + item + ' from ' + $scope.currentShop() + '\n';
			}
		
			
			if (warpSongs.includes(item)) {
				$scope.collectedWarps.push(item);
			}
			
			if ($scope.checkedLocations.length >= 2) {
				$scope.disableUndo = false;
			}
		}
		$scope.current_items.push(item);
		$scope.headline = $scope.currentShop() + ': ' + item;
		$scope.itemCounts[item]++;
		$scope.updateForage();
	};

	localforage.getItem("playthroughId").then(function(result) {
		if (result) {
			$scope.resumeFromId(result);
		}
	});

	localforage.getItem("darkModeOn").then(function (result) {
		if (result) {
			$scope.darkModeOn = result;
		}
	});
});

var shopItemImages = {
	'Arrows (5)': 'arrows5.png',
	'Arrows (10)': 'arrows10.png',
	'Arrows (30)': 'arrows30.png',
	'Arrows (50)': 'arrows50.png',
	'Biggoron Sword': 'sword3.png',
	'Blue Fire': 'bluefire.png',
	'Blue Potion': 'bluepotion.png',
	'Bolero of Fire': 'red_note.png',
	'Bomb Bag': 'bombbag.png',
	'Bombchu (5)': 'bombchu5.png',
	'Bombchu (10)': 'bombchu10.png',
	'Bombchu (20)': 'bombchu20.png',
	'Bombchus (5)': 'bombchu5.png',
	'Bombchus (10)': 'bombchu10.png',
	'Bombchus (20)': 'bombchu20.png',
	'Bombchus': 'bombchu.png',
	'Bombs (5)': 'bombs5.png',
	'Bombs (10)': 'bombs10.png',
	'Bombs (20)': 'bomb2.png',
	'Bombs (30)': 'bomb3.png',
	'Boomerang': 'boomerang.png',
	'Bottle with Big Poe': 'bigpoe.png',
	'Bottle with Blue Fire': 'bluefire.png',
	'Bottle with Blue Potion': 'bluepotion.png',
	'Bottle with Bugs': 'bug.png',
	'Bottle with Fairy': 'fairy.png',
	'Bottle with Fish': 'fish.png',
	'Bottle with Green Potion': 'greenpotion.png',
	'Bottle with Letter': 'bottle-letter.png',
	'Bottle with Milk': 'milk.png',
	'Bottle with Poe': 'poe.png',
	'Bottle with Red Potion': 'redpotion.png',
	'Bow': 'bow.png',
	'Bottle Bug': 'bug.png',
	'Broken Sword': 'broken_sword.png',
	'Claim Check': 'claim.png',
	'Cojiro': 'cojiro.png',
	'Deku Nut (5)': 'nuts5.png',
	'Deku Nuts (5)': 'nuts5.png',
	'Deku Nut (10)': 'nuts10.png',
	'Deku Nuts (10)': 'nuts10.png',
	'Deku Nut Capacity': 'nutupgrade.png',
	'Deku Seeds (30)': 'seeds30.png',
	'Deku Shield': 'shield1.png',
	'Deku Stick (1)': 'stick.png',
	'Deku Stick Capacity': 'stickupgrade.png',
	'Dins Fire': 'din.png',
	'Eponas Song': 'epona.png',
	'Eyeball Frog': 'frog.png',
	'Eyedrops': 'eyedrops.png',
	'Fairy\'s Spirit': 'fairy.png',
	'Farores Wind': 'farore.png',
	'Fire Arrows': 'firearrow.png',
	'Fish': 'fish.png',
	'Gold Skulltula Token': 'token.png',
	'Goron Tunic': 'redtunic.png',
	'Green Potion': 'greenpotion.png',
	'Hammer': 'hammer.png',
	'Heart': 'recoveryheart.png',
	'Heart Container': 'heartcontainermodel.png',
	'Hover Boots': 'hoverboots.png',
	'Hylian Shield': 'shield2.png',
	'Ice Arrows': 'icearrow.png',
	'Ice Trap': 'icetrap.png',
	'Iron Boots': 'ironboots.png',
	'Kokiri Sword': 'sword1.png',
	'Lens of Truth': 'lens.png',
	'Light Arrows': 'lightarrow.png',
	'Magic Meter': 'magic.png',
	'Minuet of Forest': 'green_note.png',
	'Mirror Shield': 'shield3.png',
	'Nayrus Love': 'nayru.png',
	'Nocturne of Shadow': 'purple_note.png',
	'Ocarina': 'fairyocarina.png',
	'Odd Mushroom': 'mushroom.png',
	'Piece of Heart': 'heartpiecemodel.png',
	'Piece of Heart (Treasure Chest Game)': 'heartpiecemodel.png',
	'Poachers Saw': 'saw.png',
	'Pocket Cucco': 'cucco.png',
	'Pocket Egg': 'egg.png',
	'Poe': 'poe.png',
	'Progressive Hookshot': 'hookshotd.png',
	'Progressive Scale': 'scale1.png',
	'Progressive Strength Upgrade': 'lift2.png',
	'Progressive Wallet': 'walletmodel.png',
	'Prelude of Light': 'yellow_note.png',
	'Prescription': 'prescription.png',
	'Recovery Heart': 'recoveryheart.png',
	'Red Potion': 'redpotion.png',
	'Requiem of Spirit': 'orange_note.png',
	'Rupee (1)': 'greenrupee.png',
	'Rupees (5)': 'bluerupee.png',
	'Rupees (20)': 'redrupee.png',
	'Rupees (50)': 'purplerupee.png',
	'Rupees (200)': 'hugerupee.png',
	'Sarias Song': 'saria.png',
	'Serenade of Water': 'blue_note.png',
	'Slingshot': 'slingshot.png',
	'Song of Storms': 'songofstorms.png',
	'Song of Time': 'songoftime.png',
	'Stone of Agony': 'agony.png',
	'Suns Song': 'sunsong.png',
	'Weird Egg': 'egg.png',
	'Zeldas Lullaby': 'zelda.png',
	'Zora Tunic': 'besttunic.png',
};

var app = angular.module('zootrSim', []);

app.filter('removeSpaces', [function() {
	return function(string) {
		if (!angular.isString(string)) {
			return string;
		}
		return string.replace(/[\s]/g, '');
	};
}]);

app.filter('reverseObj', function() {
	return function(items) {
		return Object.keys(items).reverse();
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

app.controller('simController', function($scope, $http) {
	
	$scope.darkModeOn = false;
	
	$scope.init = function() {
		$scope.isShopsanity = false;
		
		$scope.currentSpoilerLog = '';
		
		$scope.checkedHints = [];
		
		$scope.knownHints = {};

		$scope.peekedLocations = [];
		
		$scope.allLocations = {};
		
		$scope.fsHash = [];
		
		$scope.checkedLocations = [];
		
		$scope.currentItemsAll = [];

		$scope.windRegionChild = "";

		$scope.windRegionAdult = "";
		
		$scope.medallions = {};
		
		$scope.currentRegion = 'Root';
		$scope.currentAge = 'Child';
		
		$scope.knownMedallions = {
			'Deku Tree': '???',
			'Dodongos Cavern': '???',
			'Jabu Jabus Belly': '???',
			'Forest Temple': '???',
			'Fire Temple': '???',
			'Water Temple': '???',
			'Shadow Temple': '???',
			'Spirit Temple': '???',
			'Free': '???',
		};
		
		$scope.numChecksMade = 0;
		
		$scope.totalChecks = 0;
		
		$scope.gossipHints = {};
		
		$scope.itemCounts = {};
		
		$scope.usedChus = 0;
		
		$scope.collectedWarps = [];
		
		$scope.finished = false;
		
		$scope.route = '';
		
		$scope.currentChild = 1;
		
		$scope.currentAdult = 0;
		
		$scope.playing = false;
		
		$scope.disableUndo = true;
		
		$scope.copying = false;
		
		$scope.shopContents = {};
		
		$scope.actions = [];
	}
	
	$scope.init();
	
	$scope.getAvailableLocations = function() {
		var allLocsInRegion = [];
		for (region in logic[$scope.currentRegion]) {
			if ("locations" in logic[$scope.currentRegion][region]) {
				allLocsInRegion = allLocsInRegion.concat(Object.keys(logic[$scope.currentRegion][region]["locations"]));
			}
		}
		var locsToShow = $scope.locations.filter(x => allLocsInRegion.includes(x) && (!x.includes("GS ") && (!x.includes("Shop Item") && (!x.includes("Bazaar Item")))));
		if ($scope.currentRegion in extraLocations) {
			locsToShow = locsToShow.concat(extraLocations[$scope.currentRegion][$scope.currentAge]);
		}
		return locsToShow;
	}
	
	$scope.getAvailableSkulltulas = function () {
		var allLocsInRegion = [];
		for (region in logic[$scope.currentRegion]) {
			if ("locations" in logic[$scope.currentRegion][region]) {
				allLocsInRegion = allLocsInRegion.concat(Object.keys(logic[$scope.currentRegion][region]["locations"]));
			}
		}
		return allLocsInRegion.filter(x => x.includes("GS "));
	};
	
	$scope.getAvailableEntrances = function() {
		return $scope.currentAge == 'Child' ? entrancesByRegionChild[$scope.currentRegion] : entrancesByRegionAdult[$scope.currentRegion];
		var allExitsInRegion = [];
		subregions[$scope.currentRegion].forEach(function(subregion) {
			console.log("ASDFdf");
			allExitsInRegion.concat(Object.keys(logic[$scope.currentRegion][subregion]["exits"]));
		});
		console.log(allExitsInRegion);
		return allExitsInRegion;
	};
	
	$scope.getAvailableHints = function () {
		var allLocsInRegion = [];
		for (region in logic[$scope.currentRegion]) {
			if ("locations" in logic[$scope.currentRegion][region]) {
				allLocsInRegion = allLocsInRegion.concat(Object.keys(logic[$scope.currentRegion][region]["locations"]));
			}
		}
		return [...new Set(allLocsInRegion.filter(x => x.includes("Gossip Stone")))];
	};
	
	$scope.countChus = function() {
		var ownedChus = $scope.currentItemsAll.filter(item => item.includes('Bombchu'));
		return ownedChus.map(item => parseInt(item.substring(item.lastIndexOf('(') + 1, item.lastIndexOf(')')), 10)).reduce((a,b) => a + b, 0);
	};
	
	$scope.useChu = function() {
		$scope.usedChus++;
		$scope.updateForage();
	};
	
	$scope.settingsPresets = {
		'Settings Presets': '',
		'Default / Beginner': 'AJCYTK2AB2FMAA2WCAAAAAK2DUCA',
		'Easy Mode': 'AJYYTKAHT4BAAAJWAACTCTFBJBAAANK2HUCA',
		'Hell Mode (minus Entrance Shuffle)': 'AJB4TT2AA2F9HQG85SAABSBACAAS9BADA33S',
		'Standard Weekly (2020-01-04)': 'AJWGAJARB2BCAAJWAAJBASAGJBHNTHA3EA2UTVAFAA',
		'Accessible Weekly (old) (2019-04-27)': 'AJWYTKAHB2BCAAJWAAJBASAGJBHNTHA3EA2UTVEFAA',
		'S3 Tournament': 'AJWGAJARB2BCAAJWAAJBASAGJBHNTHA3EA2UTVAFAA',
		'Scrub Tournament': 'AJWGAJARB2BCAAJWAACTCTFBJBASAGJBHNTHA3EAEVSVAFAA',
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
		if (loc in logic[$scope.currentRegion] && !parseLogicRule(logic[$scope.currentRegion][loc])) {
			if (loc != "Treasure Chest Game" || Math.floor(Math.random() * 32) > 0) {
				$scope.lastchecked = logic[$scope.currentRegion][loc];
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
			if ($scope.currentAge == 'Adult') {
				$scope.checkedLocations.push('Check Pedestal (Stones)');
			}
			for (var key in $scope.medallions) {
				if (!$scope.currentItemsAll.includes($scope.medallions[key])) {
					if ($scope.medallions[key].includes('Medallion')) {
						if ($scope.currentAge == 'Adult') {
							$scope.knownMedallions[key] = $scope.medallions[key];
						}
					}
					else {
						$scope.knownMedallions[key] = $scope.medallions[key];
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
			$scope.lastchecked = 'Ha ha ha... You\'ll never beat me by reflecting my lightning bolts and unleashing the arrows from '+lighthint+'!';
			$scope.route += 'Light Arrows Hint ('+lighthint+')\n';
		}
		else if (loc == 'Ganon') {
			if (false && !$scope.currentItemsAll.includes('Light Arrows')) {
				$scope.actions.pop();
				$scope.lastchecked = 'Not without Light Arrows!';
			}
			else {
				$scope.finished = true;
				$scope.route += 'Ganon\n';
			}
		}
		else if (!(loc in $scope.allLocations) && loc.startsWith('GS ')) {
			$scope.currentItemsAll.push('Gold Skulltula Token');
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
			$scope.currentItemsAll.push(item);
			$scope.route += loc + (importantItems.includes(item) ? ' ('+item+')' : '') + '\n';
			//$scope.lastchecked = loc + ': ' + item;
			$scope.lastchecked = logic[$scope.currentRegion][loc];
			$scope.itemCounts[item]++;
			
			if (loc in bosses) {
				$scope.knownMedallions[bosses[loc]] = item;
			}
			
			if (loc in regionChangingChecks) {
				$scope.currentRegion = regionChangingChecks[loc];
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
	$scope.lastchecked = loc + ": " + hintItem;
	$scope.actions.push("Peek:" + loc);
	$scope.updateForage();
};

$scope.hasPeeked = function(loc) {
	return $scope.peekedLocations.includes(loc);
};

$scope.undoCheck = function() {
	var mostRecent = $scope.actions.pop();
	if (mostRecent.split(':')[0] == 'Location') {
		$scope.numChecksMade--;
		var lastCheckedLocation = mostRecent.split(':')[1];
		$scope.checkedLocations.pop();
		if (lastCheckedLocation in $scope.allLocations) {
			$scope.currentItemsAll.splice($scope.currentItemsAll.lastIndexOf($scope.allLocations[lastCheckedLocation]));
			$scope.numChecksMade--;
			
			$scope.itemCounts[$scope.allLocations[lastCheckedLocation]]--;
			if(warpSongs.includes($scope.allLocations[lastCheckedLocation])) {
				$scope.collectedWarps.pop();
			}
			if (lastCheckedLocation in bosses) {
				$scope.currentRegion = bosses[lastCheckedLocation];
				if (!$scope.checkedLocations.includes('Check Pedestal (Medallions)')) {
					if (!$scope.checkedLocations.includes('Check Pedestal (Stones)') || !($scope.allLocations[lastCheckedLocation] == 'Kokiri Emerald' || $scope.allLocations[lastCheckedLocation] == 'Goron Ruby' || $scope.allLocations[lastCheckedLocation] == 'Zora Sapphire')) {
						$scope.knownMedallions[bosses[lastCheckedLocation]] = '???';
					}
				}
			}
			if (lastCheckedLocation == 'Impa at Castle') {
				$scope.currentRegion = 'Hyrule Castle';
			}
		}
		else if (lastCheckedLocation.startsWith('GS ')) {
			$scope.currentItemsAll.splice($scope.currentItemsAll.lastIndexOf('Gold Skulltula Token'));
			$scope.itemCounts['Gold Skulltula Token']--;
		}
		else if (lastCheckedLocation == 'Check Pedestal (Stones)') {
			if (!$scope.checkedLocations.includes('Check Pedestal (Medallions)')) {
				for (loc in $scope.knownMedallions) {
					var med = $scope.knownMedallions[loc];
					if (!$scope.currentItemsAll.includes(med) && (med == 'Kokiri Emerald' || med == 'Goron Ruby' || med == 'Zora Sapphire')) {
						$scope.knownMedallions[loc] = '???';
					}
				}
			}
		}
		else if (lastCheckedLocation == 'Check Pedestal (Medallions)') {
			$scope.checkedLocations.pop();
			for (loc in $scope.knownMedallions) {
				var med = $scope.knownMedallions[loc];
				if ($scope.checkedLocations.includes('Check Pedestal (Stones)') && (med == 'Kokiri Emerald' || med == 'Goron Ruby' || med == 'Zora Sapphire')) {
					continue;
				}
				if (!$scope.currentItemsAll.includes(med)) {
					$scope.knownMedallions[loc] = '???';
				}
			}
		}
	}
	else if (mostRecent.split(':')[0] == 'Entrance') {
		if (mostRecent.split(':')[2] == 'Pull Master Sword') {
			$scope.currentAge = 'Child';
			$scope.currentAdult--;
		}
		else if (mostRecent.split(':')[2] == 'Place Master Sword') {
			$scope.currentAge = 'Adult';
			$scope.currentChild--;
		}
		else if (mostRecent.split(':')[1] == 'Kokiri Forest' && mostRecent.split(':')[2] == 'Hyrule Field' && !$scope.actions.includes(mostRecent) && $scope.checkedLocations.includes('Gift from Saria')) {
			$scope.checkedLocations.splice($scope.checkedLocations.lastIndexOf('Gift from Saria'));
			var item = '';
			if ('Gift from Saria' in $scope.allLocations) {
				item = $scope.allLocations['Gift from Saria'];
			}
			else {
				item = 'Ocarina';
			}
			$scope.itemCounts[item]--;
			$scope.numChecksMade--;
			if(warpSongs.includes(item)) {
				$scope.collectedWarps.pop();
			}
		}
		$scope.currentRegion = mostRecent.split(':')[1];
	}
	else if (mostRecent.split(':')[0] == 'Hint') {
		$scope.checkedHints.pop();
		$scope.knownHints[mostRecent.split(':')[2]].pop();
		if ($scope.knownHints[mostRecent.split(':')[2]].length == 0) {
			delete $scope.knownHints[mostRecent.split(':')[2]];
		}
	}
	
	else if (mostRecent.split(':')[0] == 'Buy') {
		$scope.shopContents[mostRecent.split(':')[1]][mostRecent.split(':')[2]].bought = false;
		var item = $scope.shopContents[mostRecent.split(':')[1]][mostRecent.split(':')[2]].item;
		if (!$scope.shopContents[mostRecent.split(':')[1]][mostRecent.split(':')[2]].refill) {
			$scope.checkedLocations.pop();
			$scope.numChecksMade--;
			if(warpSongs.includes(item)) {
				$scope.collectedWarps.pop();
			}
		}
		$scope.currentItemsAll.pop();
		$scope.itemCounts[item]--;
	}

	else if (mostRecent.split(':')[0] == 'Peek') {
		$scope.peekedLocations.pop();
		$scope.knownHints[mostRecent.split(':')[1]].pop();
		if ($scope.knownHints[mostRecent.split(':')[1]].length == 0) {
			delete $scope.knownHints[mostRecent.split(':')[1]];
		}
	}
	
	$scope.updateForage();
	
	return;
	if ($scope.checkedLocations.length >= 2) {
		var lastCheckedLocation = $scope.checkedLocations.pop();
		if (lastCheckedLocation in $scope.allLocations) {
			$scope.currentItemsAll.splice($scope.currentItemsAll.lastIndexOf($scope.allLocations[lastCheckedLocation]));
			$scope.numChecksMade--;
			
			$scope.itemCounts[$scope.allLocations[lastCheckedLocation]]--;
		}
		else if (lastCheckedLocation.startsWith('GS ')) {
			$scope.currentItemsAll.splice($scope.currentItemsAll.lastIndexOf('Gold Skulltula Token'));
			$scope.itemCounts['Gold Skulltula Token']--;
		}
		else if (lastCheckedLocation.includes('shopitem')) {
			var shop = lastCheckedLocation.split('|')[1];
			var index = parseInt(lastCheckedLocation.split('|')[2]);
			$scope.shopContents[shop][index].bought = false;
			$scope.currentItemsAll.splice($scope.currentItemsAll.lastIndexOf($scope.shopContents[shop][index].item));
			$scope.numChecksMade--;
			$scope.itemCounts[$scope.shopContents[shop][index].item]--;
		}
		if ($scope.checkedLocations.length < 2) {
			$scope.disableUndo = true;
		}
		//$scope.route = $scope.route.substring(0, $scope.route.lastIndexOf('\n'));
	}
	$scope.updateForage()
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
		$scope.actions.push('Entrance:' + $scope.currentRegion + ':' + entrance);
		if (entrance == 'Pull Master Sword') {
			$scope.currentAdult++;
			$scope.route += '\n---- ADULT ' + $scope.currentAdult + ' ----\n\n';
			$scope.currentAge = 'Adult';
		}
		else if (entrance == 'Place Master Sword') {
			$scope.currentChild++;
			$scope.route += '\n---- CHILD ' + $scope.currentChild + ' ----\n\n';
			$scope.currentAge = 'Child';
		}
		else if (entrance == 'Savewarp Child') {
			$scope.currentRegion = 'Kokiri Forest';
			$scope.route += 'Savewarp\n';
		}
		else if (entrance == 'Savewarp Adult') {
			$scope.currentRegion = 'Temple of Time';
			$scope.route += 'Savewarp\n';
		}
		else if (entrance in songTargets) {
			$scope.currentRegion = songTargets[entrance];
			$scope.route += 'Play ' + entrance + '\n';
		}
		else if ($scope.currentRegion == 'Kokiri Forest' && entrance == 'Hyrule Field' && $scope.currentAge == 'Child' && !$scope.checkedLocations.includes('Gift from Saria')) {
			$scope.checkedLocations.push('Gift from Saria');
			var item = '';
			if ('Gift from Saria' in $scope.allLocations) {
				item = $scope.allLocations['Gift from Saria'];
			}
			else {
				item = 'Ocarina';
			}
			$scope.currentItemsAll.push(item);
			$scope.numChecksMade++;
			$scope.itemCounts[item]++;
			if($scope.checkedLocations.length >= 2) {
				$scope.disableUndo = false;
			}
			$scope.route += 'Gift from Saria' + (importantItems.includes(item) ? ' ('+item+')' : '') + '\n';
			$scope.lastchecked = 'Gift from Saria: ' + item;
			$scope.currentRegion = entrance;
		}
		else {
			$scope.currentRegion = entrance;
		}
		$scope.updateForage();
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
		if (dungeon in $scope.knownMedallions) {
			med = $scope.knownMedallions[dungeon];
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
				'???': 'unknown-small.png' 
			};
			return medToImage[med];
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

	$scope.getImage = function(item, count) {
		if (item == 'Bottle') {
			var bottles = 0;
			var hasLetter = false;
			for (var i = 0; i < $scope.currentItemsAll.length; i++) {
				if ($scope.currentItemsAll[i].startsWith('Bottle')) {
					bottles++;
					if ($scope.currentItemsAll[i] == 'Bottle with Letter') {
						hasLetter = true;
					}
				}
			}
			return [(hasLetter ? 'ruto' : '') + 'bottle' + bottles + '.png', bottles > 0]
		}
		else if (item == 'Child Trade') {
			retval = [];
			if ($.inArray('Weird Egg', $scope.currentItemsAll) == -1) {
				return ['egg.png', false];
			}
			if ($.inArray('Weird Egg', $scope.currentItemsAll) != -1) {
				retval = ['egg.png', true];
			}
			if ($.inArray('Chicken', $scope.currentItemsAll) != -1) {
				retval = ['cucco.png', true];
			}
			if ($.inArray('Zeldas Letter', $scope.currentItemsAll) != -1) {
				retval = ['letter.png', true];
			}
			if ($.inArray('Keaton Mask', $scope.currentItemsAll) != -1) {
				retval = ['keaton.png', true];
			}
			if ($.inArray('Skull Mask', $scope.currentItemsAll) != -1) {
				retval = ['skull.png', true];
			}
			if ($.inArray('Spooky Mask', $scope.currentItemsAll) != -1) {
				retval = ['spooky.png', true];
			}
			if ($.inArray('Bunny Hood', $scope.currentItemsAll) != -1) {
				retval = ['bunny.png', true];
			}
			if ($.inArray('Mask of Truth', $scope.currentItemsAll) != -1) {
				retval = ['truth.png', true];
			}
			return retval;
		}
		else if (item == 'Adult Trade') {
			if ($.inArray('Claim Check', $scope.currentItemsAll) != -1) {
				return ['claim.png', true];
			}
			if ($.inArray('Eyedrops', $scope.currentItemsAll) != -1) {
				return ['eyedrops.png', true];
			}
			if ($.inArray('Eyeball Frog', $scope.currentItemsAll) != -1) {
				return ['frog.png', true];
			}
			if ($.inArray('Prescription', $scope.currentItemsAll) != -1) {
				return ['prescription.png', true];
			}
			if ($.inArray('Broken Sword', $scope.currentItemsAll) != -1) {
				return ['broken_sword.png', true];
			}
			if ($.inArray('Poachers Saw', $scope.currentItemsAll) != -1) {
				return ['saw.png', true];
			}
			if ($.inArray('Odd Mushroom', $scope.currentItemsAll) != -1) {
				return ['mushroom.png', true];
			}
			if ($.inArray('Cojiro', $scope.currentItemsAll) != -1) {
				return ['cojiro.png', true];
			}
			if ($.inArray('Pocket Cucco', $scope.currentItemsAll) != -1) {
				return ['cucco.png', true];
			}
			if ($.inArray('Pocket Egg', $scope.currentItemsAll) != -1) {
				return ['egg.png', true];
			}
			else {
				return ['egg.png', false];
			}
		}
		else if (item == 'Gold Skulltulas') {
			return ['skulltula.png', false];
		}
		else if (item == 'Progressive Wallet' && !$scope.isShopsanity && count == 2) {
			return ['wallet2.png', true];
		}
		else {
			if (count >= $scope.codeToImage[item].length) {
				return [$scope.codeToImage[item][$scope.codeToImage[item].length - 1], count > 0];
			}
			else {
				return [$scope.codeToImage[item][count], count > 0];
			}
		}
	}
	
	$scope.throwAway = function(item) {
		$scope.init();
		$scope.updateForage();
	};
	
	$scope.countItem = function(item) {
		return 0;
	};

	$scope.setWind = function() {
		if ($scope.currentAge == "Child") {
			$scope.windRegionChild = $scope.currentRegion;
		}
		else {
			$scope.windRegionAdult = $scope.currentRegion;
		}
		$scope.updateForage();
	};

	$scope.recallWind = function() {
		if ($scope.currentAge == "Child") {
			$scope.currentRegion = $scope.windRegionChild;
			$scope.windRegionChild = "";
		}
		else {
			$scope.currentRegion = $scope.windRegionAdult;
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
		if ($scope.currentRegion == 'Kokiri Forest') {
			return 'Kokiri Shop';
		}
		else if ($scope.currentRegion == 'Market') {
			if ($scope.currentOtherShop == 'Castle Town Potion Shop' || $scope.currentOtherShop == 'Bombchu Shop') {
				return $scope.currentOtherShop;
			}
			else {
				return 'Castle Town Bazaar';
			}
		}
		else if ($scope.currentRegion == 'Kakariko Village') {
			if ($scope.currentOtherShop == 'Kakariko Potion Shop') {
				return $scope.currentOtherShop;
			}
			else {
				return 'Kakariko Bazaar';
			}
		}
		else if ($scope.currentRegion == 'Goron City') {
			return 'Goron Shop';
		}
		else if ($scope.currentRegion == 'Zoras Domain') {
			return 'Zora Shop';
		}
		else {
			return '';
		}
	}
	
	$scope.currentOtherShop = '';
	
	$scope.otherShops = function() {
		if ($scope.currentRegion == 'Market') {
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
		else if ($scope.currentRegion == 'Kakariko Village') {
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

	$scope.initializeFromServer = function(data) {
		console.log(data);
		$scope.generating = false;
		$scope.locations = data["locations"];
		console.log($scope.locations);
		$scope.currentItemsAll = data["starting_items"];
		$scope.fsHash = data["hash"];
		$scope.playthroughId = data["id"];
		$scope.playing = true;
		$scope.currentAge = data["starting_age"][0].toUpperCase() + data["starting_age"].slice(1);
		$scope.currentRegion = $scope.currentAge == "Child" ? "Kokiri Forest" : "Temple of Time";
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
			$scope.generating = false;
			if (response.data[':version'] == ('5.1.0 Release')) {
				$scope.currentSpoilerLog = response.data;
				$scope.parseLog(response.data);
			}
			else {
				if (response.data.includes('settings_string') || response.data.includes('Invalid randomizer settings')) {
					$scope.generationError = "Error! Invalid settings string! Note that multiworld isn't supported by the API endpoint.";
				}
				else if (response.data.includes('Game unbeatable')) {
					$scope.generationError = "Error! Game unbeatable! Try again with a different seed."
				}
				else if (response.data.includes('You may only generate a seed once every 5 seconds')) {
					$scope.generationError = "Error! Too many seeds being generated. Try again in 5 seconds.";
				}
				else if (response.data.includes('502 Bad Gateway')) {
					$scope.generationError = "Error! 502 Bad Gateway response from ootrandomizer.com.";
				}
				else {
					$scope.generationError = "Unknown Error (please report this!): " + response.data;
				}
			}
		}, function errorCallback(response) {
			$scope.generationError = response;
		});
	};
	
	$scope.fileSelected = function(event) {
		reader = new FileReader();
		reader.onload = function(e) {
			$http.post("/zootr-sim/uploadlog", e.target.result).then(function successCallback(response) {
				$scope.initializeFromServer(response["data"]);
			}, function errorCallback(response) {

			});
		}
		reader.readAsText(event.target.files[0]);
	}
	
	$scope.checkHint = function(stone) {
		
		var hint = '';
		if (stone == 'Generic Grotto') {
			hint = $scope.gossipHints[stone];
			$scope.checkedHints.push(stone);
		}
		else {
			hint = $scope.gossipHints[$scope.currentRegion][stone];
			$scope.checkedHints.push($scope.currentRegion + ' ' + stone);
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
		
		$scope.lastchecked = hint;
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
		$scope.currentItemsAll.push(item);
		$scope.lastchecked = $scope.currentShop() + ': ' + item;
		$scope.itemCounts[item]++;
		$scope.updateForage();
	};
	
	var forageItems = ['windRegionChild', 'windRegionAdult', 'peekedLocations', 'currentSeed', 'isShopsanity', 'shopContents', 'currentSpoilerLog', 'checkedHints', 'knownHints', 'allLocations', 'fsHash', 'checkedLocations', 'currentItemsAll', 'medallions', 'currentRegion', 'currentAge', 'knownMedallions', 'numChecksMade', 'totalChecks', 'gossipHints', 'itemCounts', 'usedChus', 'collectedWarps', 'finished', 'route', 'currentChild', 'currentAdult', 'playing', 'disableUndo', 'darkModeOn', 'actions']
	
	$scope.updateForage = function() {
		forageItems.forEach(function(item) {
			localforage.setItem(item, $scope[item]);
		});
		localforage.setItem('playing', $scope.playing);
		localforage.setItem('fsHash', $scope.fsHash);
	}
	
	
	Promise.all(
		forageItems.map(x => localforage.getItem(x))
	).then(function(results) {
		for (var i = 0; i < forageItems.length; i++) {
			if (results[i] != null && results[i] != undefined) {
				$scope[forageItems[i]] = results[i];
			}
		}
		$scope.$apply();
	});

	var logicEvaluation = {
		True: () => true,
		False: () => false,
		can_use: x => (logicEvaluation.is_magic_item(x) && logicEvaluation.has("Magic Meter") && logicEvaluation.has(x)) ||
									(logicEvaluation.is_adult_item(x) && $scope.currentAge == "Adult" && logicEvaluation.has(x)) ||
									(logicEvaluation.is_magic_arrow(x) && $scope.currentAge == "Adult" && logicEvaluation.has("Progressive Bow") && logicEvaluation.has(x)) ||
									(logicEvaluation.is_child_item(x) && $scope.currentAge == "Child" && logicEvaluation.has(x)),
		is_magic_item:x => x == "Dins Fire" || x == "Farores Wind" || x == "Nayrus Love" || x == "Lens of Truth",
		is_magic_arrow:x => x == "Fire Arrows" || x == "Light Arrows",
		is_adult_item: x => x == "Progressive Bow" || x == "Hammer" || x == "Iron Boots" || x == "Hover Boots" || x == "Progressive Hookshot" || x == "Progressive Strength Upgrade" || x == "Scarecrow" || x == "Distant_Scarecrow",
		is_child_item: x => x == "Slingshot" || x == "Boomerang" || x == "Kokiri Sword" || x == "Deku Shield",
		can_see_with_lens: () => true,
		has_projectile: x => logicEvaluation.has_explosives() ||
												 (x == "child" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang())) ||
												 (x == "adult" && (logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))) ||
												 (x == "both" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang()) && (logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))) ||
												 (x == "either" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang() || logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))),
		has: x => $scope.currentItemsAll.includes(x),
		has_explosives: () => logicEvaluation.has("Bomb Bag") || $scope.countChus() - $scope.usedChus > 0,
		has_bombchus: () => logicEvaluation.has_explosives(),
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
		can_play: x => (logicEvaluation.Ocarina()) && $scope.currentItemsAll.includes(x),
		Boomerang: () => $scope.currentItemsAll.includes("Boomerang"),
		Kokiri_Sword: () => true,
		Ocarina: () => logicEvaluation.has("Fairy Ocarina") || logicEvaluation.has("Ocarina of Time") || logicEvaluation.has("Ocarina"),
		"Skull Mask": () => true,
		"Mask of Truth": () => logicEvaluation.has_all_stones(),
		Zeldas_Letter: () => logicEvaluation.has("Zeldas Letter"),
		Eyedrops: () => logicEvaluation.has("Eyedrops"),
		Claim_Check: () => logicEvaluation.has("Claim Check"),
		"Water Temple Clear": () => logicEvaluation.has("Water Medallion"),
		Forest_Medallion: () => logicEvaluation.has("Forest Medallion"),
		Big_Poe: () => logicEvaluation.has("Big Poe"),
		Bottle_with_Letter: () => logicEvaluation.has("Bottle with Letter"),
		can_child_attack: () => true,
		has_bottle: () => $scope.currentItemsAll.filter(x => x.includes("Bottle")).length > 0,
		is_adult: () => $scope.currentAge == "Adult",
		can_use_projectile: () => logicEvaluation.has_explosives() || ($scope.currentAge == "Adult" && (logicEvaluation.has("Progressive Bow") || logicEvaluation.has("Progressive Hookshot"))) || ($scope.currentAge == "Child" && (logicEvaluation.has("Progressive Slingshot") || logicEvaluation.has("Boomerang"))),
		here: () => true,
		has_fire_source: () => logicEvaluation.can_use("Dins Fire") || logicEvaluation.can_use("Fire Arrows"),
		has_fire_source_with_torch: () => logicEvaluation.has_fire_source() || $scope.currentAge == "Child",
		can_stun_deku: () => true,
		can_summon_gossip_fairy: () => true,
		can_summon_gossip_fairy_without_suns: () => true,
		can_finish_GerudoFortress: () => true,
		can_blast_or_smash: () => logicEvaluation.has_explosives() || logicEvaluation.can_use("Hammer"),
		can_dive: () => logicEvaluation.has("Progressive Scale"),
		logic_fewer_tunic_requirements: () => true,
		is_child: () => $scope.currentAge == "Child",
		is_adult: () => $scope.currentAge == "Adult",
		can_plant_bugs: () => logicEvaluation.is_child() && logicEvaluation.has_bottle(),
		can_plant_bean: () => logicEvaluation.is_child(),
		can_cut_shrubs: () => logicEvaluation.is_adult() || logicEvaluation.has("Kokiri Sword") || logicEvaluation.Boomerang() || logicEvaluation.has_explosives(),
		can_ride_epona: () => logicEvaluation.is_adult() && logicEvaluation.can_play("Eponas Song"),
		found_bombchus: () => logicEvaluation.has("Bombchus") || logicEvaluation.has("Bomb Bag"),
		at_night: () => true,
		damage_multiplier: () => true,
		at: () => true,
		shuffle_dungeon_entrances: () => false,
		can_trigger_lacs: () => logicEvaluation.has("Shadow Medallion") && logicEvaluation.has("Spirit Medallion"),
		at_day: () => true,
		at_dampe_time: () => true,
		guarantee_trade_path: () => true,
		"Eyedrops Access": () => true,
		"Goron City Child Fire": () => logicEvaluation.is_child() && logicEvaluation.can_use("Dins Fire"),
		bombchus_in_logic: () => true,
		can_open_bomb_grotto: () => logicEvaluation.can_blast_or_smash(),
		can_open_storms_grotto: () => logicEvaluation.can_play("Song of Storms"),
	}

	function parseLogicRule(rule) {
		rule = rule.trim();
		var stack = [];
		var it = 0;
		var curChar = ' ';
		var curWord = '';

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
				while (/^[A-Za-z_]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
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
				while (/^[A-Za-z_]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
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
			return $scope.currentItemsAll.filter(x => x == item).length >= num;
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
					getChar();
					return negate ? !expr : expr;
				}
				else {
					var e = expression();
					whitespace();
					getChar();
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
					getChar();
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
});

function parseHint(hint) {
	var hintLoc = [];
	var hintItem = [];
	for (loc in hintLocationsMeanings) {
		if (hint.includes(loc)) {
			if (typeof(hintLocationsMeanings[loc]) == 'string') {
				hintLoc = hintLocationsMeanings[loc];
			}
			else {
				hintLoc = hintLocationsMeanings[loc]();
			}
			break;
		}
	}
	for (item in hintItemsMeanings) {
		if (hint.includes(item)) {
			hintItem = hintItemsMeanings[item];
			break;
		}
	}
	return [hintLoc, hintItem];
}

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

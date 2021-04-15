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
		if ("Required Trials" in items) {
			retval.push("Required Trials");
		}
		return retval.concat(Object.keys(items).filter(x => x != "Way of the Hero" && x != "Foolish Choice" && x != "Required Trials").reverse());
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

app.controller('simController', ['$scope', '$http', '$interval', '$document', function($scope, $http, $interval, $document) {
	localforage.getItem("darkModeOn").then(function (result) {
		if (result) {
			$scope.darkModeOn = result;
		}
	});

	localforage.getItem("playthroughId").then(function (result) {
		if (result) {
			$scope.resumeFromId(result);
		}
	});

	$document[0].onclick = function(event) {
		if (event.target.id != "reset" && !document.getElementsByClassName("modal-content")[0].contains(event.target)) {
			$scope.show_modal("throwAwayModal", false);
		}
	};

	$scope.get_lobbies = function() {
		$http.get("/zootr-sim/getmwgames").then(function (response) {
			$scope.mwgames = response.data;
		}, function (error) {
			$scope.lobbies_error = "Error! Could not load multiworld games. Refresh to try again.";
		});
	};

	$scope.get_lobbies();

	$scope.known_medallions = {};
	$scope.current_items = [];
	$scope.use_logic = true;
	$scope.recent_items = [];

	$scope.now = Date.now();
	$interval(() => $scope.now = Date.now(), 1000);
	
	$scope.is_empty = function(obj) {
		return Object.keys(obj).length == 0;
	};

	$scope.subscribe_lobby = function(id) {
		$scope.lobby_source = new EventSource(`/zootr-sim/lobbyconnect/${id}`);
		$scope.lobby_source.onmessage = function (event) {
			var data = JSON.parse(event.data);
			if ("joined" in data) {
				$scope.players.push(data.joined);
			}
			if ("left" in data) {
				var player_to_remove = $scope.players.filter(x => x._id == data.left)[0];
				$scope.players.splice($scope.players.indexOf(player_to_remove), 1);
			}
			if ("readied" in data) {
				var player = $scope.players.filter(x => x._id == data.readied)[0];
				player.ready = true;
			}
			if ("unreadied" in data) {
				var player = $scope.players.filter(x => x._id == data.unreadied)[0];
				player.ready = false;
			}
			if ("starting" in data) {
				if (data.starting) {
					if ($scope.playthroughId) {
						$scope.resumeFromId($scope.playthroughId);
					}
				}
			}
		};
	}

	$scope.subscribe_multiworld = function(multi_id, player_id) { 
		$scope.multiworld_source = new EventSource(`/zootr-sim/multiworldconnect/${multi_id}/${player_id}`);
		$scope.multiworld_source.onmessage = function (event) {
			var data = JSON.parse(event.data);
			if ("item" in data) {
				$scope.current_items.push(data.item);
				$scope.recent_items.unshift(`Received from ${data.from}: ${data.item}`);
				if (data.finish_obj) {
					Object.assign($scope, data.finish_obj);
					$scope.finished_mw_players = data.finish_obj.mw_players;
					$scope.everyone_finished = data.finish_obj.mw_players.every(x => x.finished);
					$scope.route = data.finish_obj.route.join("\n");
				}
				$scope.$apply();
				setTimeout(function() {
					$scope.recent_items.pop();
				}, 5000);
				
			}
		};
	}

	$scope.load_lobby = function(id) {
		$http.get(`/zootr-sim/getlobbyinfo/${id}`).then(function(response) {
			$scope.players = response.data.players;
			$scope.current_mw_lobby = response.data.id;
			$scope.current_mw_game = response.data;
			$scope.subscribe_lobby(id);
		}, function(error) {
			console.error(error);
			$scope.get_lobbies();
			$scope.show_modal("lobbyLoadErrorModal", true);
		});
	}

	$scope.unload_lobby = function() {
		$scope.get_lobbies();
		$scope.players = null;
		$scope.current_mw_lobby = null;
		$scope.lobby_source.close();
		$scope.lobby_source = null;
	}

	$scope.ready_up = function (id) {
		if ($scope.readying) {
			return;
		}
		$scope.readying = true;
		$http.get(`/zootr-sim/readyup/${id}`).then(function (result) {
			$scope.lobby_error = null;
			$scope.readying = false;
		}, function (error) {
			$scope.readying = false;
			console.error(error);
			$scope.lobby_error = "Error! Could not ready up. Please try again and report if this persists.";
		});
	}

	$scope.unready = function (id) {
		if ($scope.readying) {
			return;
		}
		$scope.readying = true;
		$http.get(`/zootr-sim/unready/${id}`).then(function (result) {
			$scope.lobby_error = null;
			$scope.readying = false;
		}, function (error) {
			$scope.readying = false;
			console.error(error);
			$scope.lobby_error = "Error! Could not unready. Please try again and report if this persists.";
		});
	}

	$scope.join_lobby = function (id, name) {
		if ($scope.joining) {
			return;
		}
		$scope.joining = true;
		$http.get(`/zootr-sim/joinlobby/${id}/${name}`).then(function (response) {
			$scope.playthroughId = response.data;
			localforage.setItem("playthroughId", response.data);
			$scope.joining = false;
			$scope.lobby_error = null;
		}, function (error) {
			if (error.status == 500) {
				console.error(error);
				$scope.lobby_error = "Error! Could not join game. Please try again and report if this persists.";
			}
			else {
				$scope.lobby_error = `Error! ${error.data}`;
			}
			$scope.joining = false;
		});
	}

	$scope.leave_lobby = function (multi_id, player_id) {
		if ($scope.leaving) {
			return;
		}
		$scope.leaving = true;
		$http.get(`/zootr-sim/leavelobby/${multi_id}/${player_id}`).then(function (response) {
			$scope.playthroughId = null;
			localforage.setItem("playthroughId", null);
			$scope.leaving = false;
			$scope.lobby_error = null;
		}, function (error) {
			console.error(error);
			$scope.lobby_error = "Error! Could not leave game. Please try again and report if this persists.";
			$scope.leaving = false;
		});
	}

	$scope.getAvailableLocations = function() {
		$http.get(`/zootr-sim/getlocations/${$scope.playthroughId}/${$scope.current_region}`).then(function(response) {
			$scope.locations_error = null;
			$scope.available_hints = response.data.locations.filter(x => x.includes("Gossip Stone"));
			$scope.available_skulltulas = response.data.locations.filter(x => x.startsWith("GS "));
			$scope.available_locations = response.data.locations.filter(x => !$scope.available_skulltulas.includes(x) && !$scope.available_hints.includes(x));
			$scope.shops = response.data.shops;
			if (Object.keys($scope.shops).length > 0) {
				$scope.current_shop = Object.keys($scope.shops)[0];
			}
		}, function(error) {
			console.error(error);
			$scope.locations_error = "Error! Could not retrieve locations. Refresh to try again and report if this persists.";
		});
	}
	
	$scope.getAvailableEntrances = function() {
		$http.get(`/zootr-sim/getentrances/${$scope.playthroughId}/${$scope.current_region}`).then(function (response) {
			$scope.available_entrances = response.data;
			$scope.entrances_error = null;
		}, function (error) {
			console.error(error);
			$scope.entrances_error = "Error! Could not retreive entrances. Refresh to try again and report if this persists.";
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

	$scope.checkLocation = function(loc) {
		if ($scope.checked_locations.includes(loc)) {
			return;
		}
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
				else if (loc == "Ganondorf Hint") {
					$scope.headline = `Ha ha ha...You'll never beat me by reflecting my lightning bolts and unleashing the arrows from ${response.data.light_arrow_region}!`
					$scope.known_hints = response.data.known_hints;
					$scope.checked_locations.push(loc);
					$scope.checkingLocation = false;
				}
				else if (loc == "Ganon") {
					if ("mw_players" in response.data && response.data.mw_players) {
						$scope.finished_mw_players = response.data.mw_players;
						$scope.everyone_finished = response.data.mw_players.every(x => x.finished);
					}
					$scope.finished = response.data.finished;
					$scope.playtime = response.data.playtime;
					$scope.num_checks_made = response.data.num_checks_made;
					$scope.total_checks = response.data.total_checks;
					$scope.used_logic = response.data.used_logic;
					$scope.percentiles = response.data.percentiles;
					$scope.route = response.data.route.join("\n");
					$scope.checkingLocation = false;
				}
				else {
					if (response.data.finished) {
						if ("mw_players" in response.data && response.data.mw_players) {
							$scope.finished_mw_players = response.data.mw_players;
							$scope.everyone_finished = response.data.mw_players.every(x => x.finished);
						}
						$scope.finished = response.data.finished;
						$scope.current_items = response.data.current_items;
						$scope.playtime = response.data.playtime;
						$scope.num_checks_made = response.data.num_checks_made;
						$scope.total_checks = response.data.total_checks;
						$scope.used_logic = response.data.used_logic;
						$scope.percentiles = response.data.percentiles;
						$scope.route = response.data.route.join("\n");
						$scope.checkingLocation = false;
					}
					else {
						$scope.checked_locations = response.data.checked_locations;
						if (response.data.other_player) {
							$scope.headline = `Sent to ${response.data.other_player}: ${response.data.item}`;
						}
						else {
							$scope.headline = `${loc}: ${response.data.item}`;
							$scope.current_items.push(response.data.item);
						}
						$scope.current_region = response.data.region;
						$scope.current_subregion = response.data.subregion;
						$scope.collected_warps = $scope.current_items.filter(x => warpSongs.includes(x));
						$scope.known_medallions = response.data.known_medallions;
						$scope.bombchu_count = response.data.bombchu_count;
						if ("region_changed" in response.data) {
							$scope.getAvailableEntrances();
							$scope.getAvailableLocations();
						}
						$scope.checkingLocation = false;
					}
				}

				var el = document.getElementById(loc);
				if (el) {
					el.classList.remove('loadinglink');
				}
			}, function(error) {
				var el = document.getElementById(loc);
				if (error.status == 403) {
					console.error(`Logic required: ${error.data}`);
					$scope.headline = `Can't ${loc.includes("Shop Item") || loc.includes("Bazaar Item") ? "afford" : "access"} that!`;
					if (el) {
						el.classList.add('logicfailed-anim');
						el.style.animation = 'none';
						el.offsetHeight;
						el.style.animation = null;
					}
				}
				else if (error.status == 500) {
					console.error(error);
					$scope.headline = "Unknown error. Try again and report if this persists.";
				}
				else {
					$scope.headline = error.data;
				}
				if (el) {
					el.classList.remove('loadinglink');
				}
				$scope.checkingLocation = false;
			});
		}
	};
	
	$scope.hasKeys = function(dungeon) {
		return [
			'Forest Temple',
			'Fire Temple',
			'Water Temple',
			'Shadow Temple',
			'Spirit Temple',
			'Spirit Temple',
			'Bottom of the Well',
			'Gerudo Fortress',
			'Gerudo Training Grounds',
			'Ganons Castle',
		].includes(dungeon);
	};

$scope.peekAt = function(loc) {
	if (!$scope.peeking) {
		$scope.peeking = true;
		var el = document.getElementById(loc);
		el.classList.add('loadinglink');
		el.style.animation = 'none';
		el.offsetHeight;
		el.style.animation = null;
		$http.get(`/zootr-sim/peek/${$scope.playthroughId}/${loc}`).then(function(response) {
			$scope.known_hints = response.data.known_hints;
			$scope.bombchu_count = response.data.bombchu_count;
			$scope.headline = `${loc}: ${response.data.item}`;
			var el = document.getElementById(loc);
			el.classList.remove('loadinglink');
			$scope.peeking = false;
		}, function(error) {
			var el = document.getElementById(loc);
			if (error.status == 403) {
				$scope.headline = "Can't see that!";
				el.classList.add('logicfailed-anim');
				el.style.animation = 'none';
				el.offsetHeight;
				el.style.animation = null;
			}
			else {
				console.error(error);
				$scope.headline = "Unknown error. Try again and report if this persists.";
			}
			el.classList.remove('loadinglink');
			$scope.peeking = false;
		});
	}
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
	window.saveAs(blob, $scope.playthroughId + "-route.txt");
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
			var original_region = $scope.current_region;
			$http.get(`/zootr-sim/takeentrance/${$scope.playthroughId}/${entrance}`).then(function(response) {
				$scope.current_region = response.data.region;
				$scope.current_subregion = response.data.subregion;
				if ("bombchu_count" in response.data) {
					$scope.bombchu_count = response.data.bombchu_count;
				}
				if ($scope.current_subregion == "Lost Woods Bridge From Forest" && original_region == "Kokiri Forest" && !$scope.checked_locations.includes("Gift from Saria")) {
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
					$scope.headline = "Unknown error. Try again and report if this persists.";
					console.error(err);
				}
				$scope.takingEntrance = false;
			})
		}
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
		else if (item == "Bombchus") {
			return $scope.bombchu_count > 0;
		}
		else {
			return $scope.getCount(item) > 0;
		}
	}

	$scope.show_modal = function (id, show) {
		var el = document.getElementById(id);
		if (show) {
			el.classList.remove("hidden");
		}
		else {
			el.classList.add("hidden");
		}
	}

	$scope.throwAway = function(delete_doc = true) {
		if (delete_doc) {
			$http.get(`/zootr-sim/throwaway/${$scope.playthroughId}`);
		}
		$scope.playthroughId = null;
		$scope.headline = "";
		$scope.playing = false;
		$scope.finished = false;
		$scope.finished_mw_players = null;
		$scope.shops = {};
		$scope.current_mw_lobby = null;
		$scope.get_lobbies();
		$scope.show_modal("throwAwayModal", false);
		localforage.setItem("playthroughId", null);
	};

	$scope.submitToLb = function(name) {
		if (!$scope.submitting) {
			$scope.submitting = true;
			$http.get(`/zootr-sim/submitname/${$scope.playthroughId}/${name}`).then(function(response) {
				$scope.submitting = false;
				$scope.submitted = true;
			}, function(error) {
				if (error.status == 403) {
					$scope.lb_error = "Run already named!";
				}
				else {
					console.error(error);
					$scope.lb_error = "Unknown error! Please try again and report if this persists.";
				}
				$scope.submitting = false;
			});
		}
	};

	$scope.setWind = function() {
		if (!$scope.setting_wind) {
			$scope.setting_wind = true;
			var el = document.getElementById("faroreswind");
			el.classList.add('loadinglink');
			$http.get(`/zootr-sim/setwind/${$scope.playthroughId}/${$scope.current_age}/${$scope.current_region}/${$scope.current_subregion}`).then(function(response) {
				$scope.wind_error = null;
				$scope.setting_wind = false;
				if ($scope.current_age == "child") {
					$scope.child_wind = $scope.current_region;
					$scope.child_wind_sub = $scope.current_subregion;
				}
				else {
					$scope.adult_wind = $scope.current_region;
					$scope.adult_wind_sub = $scope.current_subregion;
				}
				var el = document.getElementById("faroreswind");
				el.classList.remove('loadinglink');
			}, function(error) {
				$scope.setting_wind = false;
				var el = document.getElementById("faroreswind");
				el.classList.remove('loadinglink');
				$scope.wind_error = "Unknown error! Try again and report if this persists.";
			});
		}
	};

	$scope.recallWind = function() {
		if (!$scope.setting_wind) {
			$scope.setting_wind = true;
			var el = document.getElementById("faroreswind");
			el.classList.add('loadinglink');
			$http.get(`/zootr-sim/recallwind/${$scope.playthroughId}/${$scope.current_age}`).then(function (response) {
				$scope.wind_error = null;
				$scope.current_region = response.data.region;
				$scope.current_subregion = response.data.subregion;
				$scope.getAvailableLocations();
				$scope.getAvailableEntrances();
				if ($scope.current_age == "child") {
					$scope.child_wind = "";
				}
				else {
					$scope.adult_wind = "";
				}
				$scope.setting_wind = false;
				var el = document.getElementById("faroreswind");
				el.classList.remove('loadinglink');
			}, function (error) {
				$scope.setting_wind = false;
				var el = document.getElementById("faroreswind");
				el.classList.remove('loadinglink');
				$scope.wind_error = "Unknown error! Try again and report if this persists.";
			});
		}
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
	
	$scope.setShop = function(shop) {
		$scope.current_shop = shop;
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
			else {
				console.error(error);
				$scope.loadError = "Unknown error while loading playthrough. Please report if this persists.";
			}
		});
	};

	$scope.initializeFromServer = function(data) {
		$scope.generating = false;
		$scope.seed = data.seed;
		$scope.settings_string = data.settings_string;
		$scope.locations = data["locations"];
		$scope.players = data["players"];
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
		$scope.in_mw_party = data["in_mw_party"];
		$scope.current_mw_lobby = data["multiworld_id"];
		$scope.num_checks_made = data["num_checks_made"];
		$scope.used_logic = data["used_logic"];
		$scope.total_checks = data["total_checks"];
		$scope.route = "route" in data ? data["route"].join("\n") : "";
		$scope.collected_warps = $scope.current_items.filter(x => warpSongs.includes(x));
		$scope.percentiles = data["percentiles"];
		$scope.child_wind = data.child_wind;
		$scope.adult_wind = data.adult_wind;
		$scope.child_wind_sub = data.child_wind_sub;
		$scope.adult_wind_sub = data.adult_wind_sub;
		$scope.playing = data.playing;
		$scope.is_multiworld = data.multiworld_id ? true : false;
		localforage.setItem("playthroughId", data["id"]);
		if ($scope.playing) {
			$scope.getAvailableLocations();
			$scope.getAvailableEntrances();
		}
		if (data.multiworld_id) {
			if ($scope.playing) {
				$scope.subscribe_multiworld(data.multiworld_id, $scope.playthroughId);
			}
			else {
				$scope.load_lobby(data.multiworld_id);
			}
			if (data.mw_players) {
				$scope.finished_mw_players = data.mw_players;
				$scope.everyone_finished = data.mw_players.every(x => x.finished);
			}
		}
		if (data.missed_items && data.missed_items.length > 0) {
			$scope.missed_items = data.missed_items.map(x => `Received from ${x.from}: ${x.item}`);
			$scope.show_modal("missedItemsModal", true);
		}
	}
	
	$scope.fetchSeed = function() {
		if ($scope.generating) {
			return;
		}
		$scope.generating = true;
		$scope.generationError = null;
		var url = '/zootr-sim/getspoiler?logic='+$scope.use_logic+'&valid=true&settings='+$scope.settingsString+'&seed='+($scope.form_seed || '');
		$http({
			method: 'GET',
			url: url
		}).then(function successCallback(response) {
			$scope.generationError = null;
			if (response.data.logic_rules != "glitchless" && $scope.use_logic) {
				$scope.init_data = response.data;
				$scope.logic_rules = response.data.logic_rules;
				$scope.show_modal("logicWarningModal", true);
			}
			else {
				$scope.initializeFromServer(response["data"]);
			}
			return;
		}, function errorCallback(response) {
			$scope.generating = false;
			if (response.status == 400) {
				if (response.data == "Entrance shuffle is not supported.") {
					$scope.generationError = "Error! Entrance shuffle is not supported."
				}
				else {
					$scope.generationError = "Error! Invalid settings string."
				}
			}
			else if (response.status == 401) {
				$scope.generationError = "Error! Invalid API key! This is not user error - please report this."
			}
			else if (response.status == 403) {
				$scope.generationError = "Error! Multiworld is not supported by the generator. Upload a multiworld log instead."
			}
			else if (response.status == 408) {
				$scope.generationError = "Error! Request timed out."
			}
			else if (response.status == 502) {
				$scope.generationError = "Error! 502 Bad Gateway response from ootrandomizer.com.";
			}
			else {
				$scope.generationError = "Unknown error. Please try again and report if this persists.";
				console.error(response);
			}
		});
	};
	
	$scope.fileSelected = function(event) {
		reader = new FileReader();
		reader.onload = function(e) {
			$scope.uploading = true;
			$http.post("/zootr-sim/uploadlog?logic=" + $scope.use_logic, e.target.result).then(function successCallback(response) {
				$scope.uploadError = null;
				$scope.uploading = false;
				if (response.data.multiworld_id) {
					$scope.load_lobby(response.data.multiworld_id);
				}
				else {
					if (response.data.logic_rules != "glitchless" && $scope.use_logic) {
						$scope.init_data = response.data;
						$scope.logic_rules = response.data.logic_rules;
						$scope.show_modal("logicWarningModal", true);
					}
					else {
						$scope.initializeFromServer(response["data"]);
					}
				}
			}, function errorCallback(response) {
				$scope.uploading = false;
				if (response.status == 413) {
					$scope.uploadError = "Error! File size too large. If this is a v5.2 spoiler log, report this so the limit can be increased.";
				}
				else if (response.status == 400) {
					if (response.data == "Entrance shuffle is not supported.") {
						$scope.uploadError = "Error! Entrance shuffle is not supported.";
					}
					else {
						$scope.uploadError = "Error! Parsing file failed. If this is a v5.2 spoiler log, please report this."
					}
				}
				else {
					$scope.uploadError = "Unknown error. Please try again and report if this persists.";
					console.error(response);
				}
			});
		}
		reader.readAsText(event.target.files[0]);
	}

	$scope.show_song_check = function(song) {
		return song in song_locations && $scope.checked_locations.includes(song_locations[song]);
	}
	
	$scope.checkHint = function(stone) {
		if (!$scope.checkingLocation) {
			$scope.checkingLocation = true;
			$http.get(`/zootr-sim/checkhint/${$scope.playthroughId}/${stone}`).then(function(response) {
				$scope.headline = response.data.text;
				$scope.known_hints = response.data.known_hints;
				$scope.checked_locations.push(stone);
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
					$scope.headline = "Unknown error. Please try again and report if this persists.";
				}
				$scope.checkingLocation = false;
			})
		}
	};
	
	$scope.playing = false;
	
	$scope.getShopImage = function(item) {
		if (item.startsWith("Buy ")) {
			item = item.substr(4, item.length - 4);
		}
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
}]);

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
	'Double Defense': 'doubledefense.png',
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

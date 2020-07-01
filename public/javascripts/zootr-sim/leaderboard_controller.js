function formatTime(ms) {
	var s = ms/1000;
	var secs = Math.floor(s % 60);
	var min = Math.floor((s / 60) % 60);
	var hours = Math.floor(s / 3600);
	return `${hours}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

var app = angular.module('zootr-sim-leaderboard', []);

app.controller('leaderboard-controller', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.toggleDarkMode = function () {
		$scope.darkModeOn = !$scope.darkModeOn;
		localforage.setItem('darkModeOn', $scope.darkModeOn);
	};

	localforage.getItem("darkModeOn").then(function (result) {
		if (result) {
			$scope.darkModeOn = result;
			$scope.$apply();
		}
	});

	$scope.load_home = function() {
		$window.location.href = $window.location.origin + "/zootr-sim";
	}

	$scope.fields = ["name", "checked_locations", "total_locations", "seed", "settings_string", "playtime", "finish_date"];

	$scope.get_entries = function(count, sort_field, ascdesc, page, search_name = "", search_settings_string = "") {
		$scope.loading = true;
		$http.get(`/zootr-sim/getleaderboardentries/${count}/${sort_field}/${ascdesc}/${page}?name=${search_name}&settings_string=${search_settings_string}`).then(function (response) {
			if (response.data.entries.length == 0) {
				$scope.load_error = "No entries found.";
				$scope.entries = [];
			}
			else {
				$scope.load_error = "";
				$scope.current_sort = sort_field;
				$scope.sort_direction = ascdesc;
				$scope.current_page = page;
				$scope.search_name = search_name;
				$scope.search_settings_string = search_settings_string;
				if (response.data.count) {
					$scope.total = response.data.count;
					$scope.pages = Math.ceil($scope.total/$scope.per_page);
				}
				else {
					$scope.total = total_entries;
					$scope.pages = Math.ceil($scope.total/$scope.per_page);
				}
				$scope.entries = response.data.entries;
				$scope.entries.forEach(x => x.finish_date = new Date(x.finish_date).toDateString());
				$scope.entries.forEach(x => x.playtime = formatTime(x.playtime));
			}
			$scope.loading = false;
		}, function (error) {
			$scope.loading = false;
			$scope.load_error = "Unknown error. Please try again and report if this persists.";
			console.error(error);
		});
	}

	$scope.current_sort = "finish_date";
	$scope.sort_direction = "desc";
	$scope.current_page = 1;
	$scope.per_page = 25;
	$scope.pages = Math.ceil($scope.total/$scope.per_page);
	$scope.get_entries($scope.per_page, $scope.current_sort, $scope.sort_direction, $scope.current_page);
}]);
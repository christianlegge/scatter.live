function formatTime(s) {
	var secs = Math.floor(s % 60);
	var min = Math.floor((s / 60) % 60);
	var hours = Math.floor(s / 3600);
	return `${hours}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

var app = angular.module('zootr-sim-leaderboard', []);

app.controller('leaderboard-controller', ['$scope', '$http', function ($scope, $http) {
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

	$scope.fields = ["name", "checked_locations", "total_locations", "playtime", "finish_date"];

	$scope.get_entries = function(count, sort_field, ascdesc, page) {
		$scope.loading = true;
		$http.get(`/zootr-sim/getleaderboardentries/${count}/${sort_field}/${ascdesc}/${page}`).then(function (response) {
			if (response.data.length > 0) {
				$scope.current_sort = sort_field;
				$scope.sort_direction = ascdesc;
				$scope.current_page = page;
				$scope.entries = response.data;
				$scope.entries.forEach(x => x.finish_date = new Date(x.finish_date).toDateString());
				$scope.entries.forEach(x => x.playtime = formatTime(x.playtime));
			}
			$scope.loading = false;
		}, function (error) {
			$scope.loading = false;
			console.error(error);
		});
	}

	$scope.current_sort = "finish_date";
	$scope.sort_direction = "desc";
	$scope.current_page = 1;
	$scope.per_page = 25;
	$scope.pages = Math.ceil(count/$scope.per_page);
	$scope.get_entries($scope.per_page, $scope.current_sort, $scope.sort_direction, $scope.current_page);
}]);
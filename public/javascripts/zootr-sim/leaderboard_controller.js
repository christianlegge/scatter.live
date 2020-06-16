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
		$scope.current_sort = sort_field;
		$scope.sort_direction = ascdesc;
		$scope.current_page = page;
		$http.get(`/zootr-sim/getleaderboardentries/${count}/${sort_field}/${ascdesc}/${page}`).then(function (response) {
			$scope.loading = false;
			$scope.entries = response.data;
		}, function (error) {
			console.error(error);
		});
	}

	$scope.current_sort = "finish_date";
	$scope.sort_direction = "desc";
	$scope.current_page = 1;
	$scope.get_entries(25, $scope.current_sort, $scope.sort_direction, $scope.current_page);
}]);
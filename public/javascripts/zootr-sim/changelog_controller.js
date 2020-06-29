var app = angular.module('zootr-sim-changelog', []);

app.controller('changelog-controller', ['$scope', '$window', function ($scope, $window) {
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

	$scope.load_home = function () {
		$window.location.href = $window.location.origin + "/zootr-sim";
	}
}]);
var app = angular.module('oscarPredictions', []);

app.controller('oscarPredictionsController', ["$scope", "$http", function ($scope, $http) {
	$scope.submit = function() {
		console.log($scope.responses);
	};
}]);

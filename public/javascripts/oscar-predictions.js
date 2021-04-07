var app = angular.module('oscarPredictions', []);

app.controller('oscarPredictionsController', ["$scope", "$http", function ($scope, $http) {
	$scope.submit = function() {
		$http.post('/oscar-predictions/submit-responses', {responses: $scope.responses, user: "test_user"}).then(function(res) {
			console.log(res);
		}, function(err) {
			console.log(err);
		});
	};
}]);

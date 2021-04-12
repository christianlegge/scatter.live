var app = angular.module('oscarPredictions', []);

app.controller('oscarPredictionsController', ["$scope", "$http", function ($scope, $http) {
	$scope.submit = function(confirmed=false) {
		$http.post('/oscar-predictions/submit-responses', {responses: $scope.responses, user: $scope.submitter, confirmed: confirmed}).then(function(res) {
			if (res.data.overwrite && !confirmed && confirm("You're overwriting previous submissions! Continue?")) {
				$scope.submit(true);
			}
		}, function(err) {
			console.log(err);
		});
	};
}]);

var app = angular.module('oscarPredictions', []);

app.controller('oscarPredictionsController', ["$scope", "$http", function ($scope, $http) {
	$scope.categories = categories;
	$scope.movieInfo = movieInfo;
	$scope.responses = {};

	for (category in $scope.categories) {
		$scope.responses[category.replace(/\W/g, "")] = {};
		$scope.responses[category.replace(/\W/g, "")].predict = "";
		$scope.responses[category.replace(/\W/g, "")].want = "";
	}
	console.log($scope.responses);

	$scope.currentCategory = "Best Picture";

	$scope.setCategory = function(category) {
		$scope.currentCategory = category;
		console.log("set category to", $scope.currentCategory);
	};

	$scope.setOrToggleResponse = function(category, movie, wanted) {
		var selection = movie.Name;
		if (category.includes("Actor") || category.includes("Actress")) {
			selection = movie.Nominee;
		}
		if ($scope.responses[category.replace(/\W/g, "")][wanted ? "want" : "predict"] == selection) {
			$scope.responses[category.replace(/\W/g, "")][wanted ? "want" : "predict"] = "";
		}
		else {
			$scope.responses[category.replace(/\W/g, "")][wanted ? "want" : "predict"] = selection;
		}
	};

	$scope.movieIsSelected = function (category, movie, wanted) {
		var selection = movie.Name;
		if (category.includes("Actor") || category.includes("Actress")) {
			selection = movie.Nominee;
		}
		return $scope.responses[category.replace(/\W/g, "")][wanted ? "want" : "predict"] == selection;
	};

	$scope.categoryHasBothSelected = function(category) {
		return $scope.responses[category.replace(/\W/g, "")].predict != "" &&
				$scope.responses[category.replace(/\W/g, "")].want != "";
	};

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

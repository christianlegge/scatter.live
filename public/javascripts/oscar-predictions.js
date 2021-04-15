var app = angular.module('oscarPredictions', []);

app.controller('oscarPredictionsController', ["$scope", "$http", function ($scope, $http) {
	$scope.categories = categories;
	$scope.movieInfo = movieInfo;
	$scope.responses = {};
	console.log($scope.categories);

	for (category in $scope.categories) {
		$scope.responses[category] = {};
		$scope.responses[category].predict = "";
		$scope.responses[category].want = "";
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
		if ($scope.responses[category][wanted ? "want" : "predict"] == selection) {
			$scope.responses[category][wanted ? "want" : "predict"] = "";
		}
		else {
			$scope.responses[category][wanted ? "want" : "predict"] = selection;
		}
	};

	$scope.movieIsSelected = function (category, movie, wanted) {
		var selection = movie.Name;
		if (category.includes("Actor") || category.includes("Actress")) {
			selection = movie.Nominee;
		}
		return $scope.responses[category][wanted ? "want" : "predict"] == selection;
	};

	$scope.categoryHasBothSelected = function(category) {
		return $scope.responses[category].predict != "" &&
				$scope.responses[category].want != "";
	};

	$scope.getResponders = function(category, movie, wanted) {
		if (category.includes("Actor") || category.includes("Actress")) {
			return $scope.categories[category].filter(x => x.Nominee == movie.Nominee)[0][wanted ? "Wanters" : "Predictors"];
		}
		else {
			return $scope.categories[category].filter(x => x.Name == movie.Name)[0][wanted ? "Wanters" : "Predictors"];
		}
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

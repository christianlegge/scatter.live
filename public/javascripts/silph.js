var app = angular.module('silph', []);

app.controller('silphController', function($scope) {
	$scope.codeString = "A5 D2 K3 T4 E3 R2 J3 C2 G3 N5 M4 Q1 S3 F1 B3 I2 L4 O3 P2 H1";
	$scope.codes = $scope.codeString.split(" ");
	$scope.letters = Array.from(Array(20)).map((e, i) => String.fromCharCode(i + 65));
	$scope.answers = {};

	$scope.getLetter = function(i) {
		var letter = $scope.codes[i].charAt(0);
		var idx = $scope.codes[i].charAt(1);
		if (!(letter in $scope.answers)) return " ";
		if ($scope.answers[letter].length < idx) return " ";
		return $scope.answers[letter].charAt(idx - 1).toUpperCase();
	};
});

app.filter('range', function(){
	return function(n) {
		var res = [];
		for (var i = 0; i < n; i++) {
			res.push(i);
		}
		return res;
	};
});
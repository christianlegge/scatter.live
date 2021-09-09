var keypressed = false;
var saveTimeout = null;

function focusText() {
	keypressed = true;
	var el = document.getElementById("mainText");
	if (document.activeElement !== el) {
		el.focus();
		window.getSelection().selectAllChildren(el);
		window.getSelection().collapseToEnd();
	}
}

var app = angular.module('wordlengths', ['ngSanitize']);

app.directive('contenteditable', ['$sce', function ($sce) {
		return {
			restrict: 'A', // only activate on element attribute
			require: '?ngModel', // get a hold of NgModelController
			link: function (scope, element, attrs, ngModel) {
				if (!ngModel) return; // do nothing if no ng-model

				// Specify how UI should be updated
				ngModel.$render = function () {
					element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
				};

				// Listen for change events to enable binding
				element.on('blur keyup change', function () {
					scope.$evalAsync(read);
				});
				read(); // initialize

				// Write data to the model
				function read() {
					var html = element.html();
					// When we clear the content editable the browser leaves a <br> behind
					// If strip-br attribute is provided then we strip this out
					if (attrs.stripBr && html == '<br>') {
						html = '';
					}
					ngModel.$setViewValue(html);
				}
			}
		};
	}]);

function innerTextsFromMainText(mainText) {
	var el = document.createElement('html');
	el.innerHTML = mainText;
	return Array.from(el.getElementsByTagName('div')).map(x => x.innerText);
}

app.controller('wordlengthsController', function($scope) {
	$scope.mainText = "";
	$scope.lineLengths = [];
	$scope.dom = null;

	$scope.mainTextChanged = function() {
		$scope.lineLengths = innerTextsFromMainText($scope.mainText).map(x => x.replace(/\W/g, '')).map(x => x.length);

		if (keypressed) {
			clearTimeout(saveTimeout);
			saveTimeout = setTimeout(function() { 
				localforage.setItem("mainText", $scope.mainText, function(err) {
					if (err == null) {
						var el = document.getElementById("saved");
						el.classList.add("saved-anim");
						el.style.animation = 'none';
						el.offsetHeight;
						el.style.animation = null;
						
					}
					else {
						console.log(err);
					}
				});
			}, 5000);
		}
	};

	$scope.saveAsTxt = function() {
		var lines = innerTextsFromMainText($scope.mainText);
		var linesWithLength = [];
		for (var i = 0; i < lines.length; i++) {
			linesWithLength.push(lines[i] + ($scope.lineLengths[i] > 0 ? (" (" + $scope.lineLengths[i] + ")") : ""));
		}
		var blob = new Blob([linesWithLength.join("\r\n")], { type: "text/plain;charset=utf-8" });
		window.saveAs(blob, "words.txt");
	};

	localforage.getItem("mainText", function(err, value) {
		if (err) {
			console.log(err);
		}
		else {
			if (value == null) {
				$scope.mainText = "<div>Type here...</div>"
			}
			else {
				$scope.mainText = value;
			}
			$scope.mainTextChanged();
			$scope.$apply();
		}
	})
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
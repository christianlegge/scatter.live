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

app.controller('wordlengthsController', function($scope) {

    $scope.mainText = "";
    $scope.lineLengths = [];
    $scope.dom = null;

    $scope.mainTextChanged = function() {
      var el = document.createElement('html');
      el.innerHTML = $scope.mainText;
      var lines = el.getElementsByTagName("div");
      console.log(lines);

      $scope.lineLengths = Array.from(lines).map(x => x.innerText).map(x => x.replace(/\W/g, '')).map(x => x.length);
      console.log($scope.lineLengths);
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
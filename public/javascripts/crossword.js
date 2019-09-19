var app = angular.module('crossword', []);

app.controller('crosswordController', function($scope) {
  $scope.cellsize = '32px ';
  $scope.cols = 10;
  $scope.rows = 10;
  $scope.activecell = -1;
  $scope.downMode = false;
  $scope.paint = false;
  $scope.paintedCells = [];
  
  $scope.cellClicked = function(i) {
    if ($scope.paint) {
      $scope.paintedCells[i] = !$scope.paintedCells[i];
    }
    else if ($scope.activecell == i) {
      $scope.downMode = !$scope.downMode;
    }
    else {
      $scope.activecell = i;
    }
  }
  
  $scope.advanceActive = function() {
    if ($scope.downMode) {
      $scope.activecell += $scope.cols;
    }
    else {
      $scope.activecell++;
    }
  }
  
  $scope.reverseActive = function() {
    if ($scope.downMode) {
      $scope.activecell -= $scope.cols;
    }
    else {
      $scope.activecell--;
    }
  }
  
  $scope.isActiveLine = function(i) {
    if ($scope.paintedCells[i]) {
      return;
    }
    if ($scope.downMode) {
      return i % $scope.cols == $scope.activecell % $scope.cols;
    }
    else {
      return Math.floor(i/$scope.cols) == Math.floor($scope.activecell/$scope.cols);
    }
  }
  
  $scope.keyDown = function(keyEvent) {
    if (keyEvent.keyCode == 8) {
      keyEvent.preventDefault();
      $scope.reverseActive();
      var el = document.getElementById('activecell');
      el.innerHTML = '';
    }
  }
  
  $scope.keyPress = function(keyEvent) {
    if (keyEvent.keyCode >= 97 && keyEvent.keyCode <= 122) {
      var el = document.getElementById('activecell');
      el.innerHTML = keyEvent.key.toUpperCase();
      $scope.advanceActive();
    }
  }
  
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
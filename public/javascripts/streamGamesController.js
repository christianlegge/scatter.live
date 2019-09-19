var app = angular.module('streamGames', []);

app.controller('streamGamesController', function($scope, $http, $timeout) {
  
  $scope.upvotes = {};
  
  $scope.showAnim = {};
  
  $scope.upvotedGames = [];
  
  $scope.initupvotes = function(upv) {
    var upvotes = JSON.parse(upv);
    upvotes.forEach(function(el) {
      $scope.upvotes[el.title] = el.upvotes;
    });
  };
  
  $scope.voteGame = function(game) {
    if ($scope.upvotedGames.includes(game)) {
      $scope.downvoteGame(game);
    }
    else {
      $scope.upvoteGame(game);
    }
  };
  
  $scope.upvoteGame = function(game) {
    $http.post('/upvoteGame', {title: game}).then(function(res) {
      $scope.upvotes[game] = ($scope.upvotes[game] == null ? 1 : $scope.upvotes[game]+1);
      $scope.showAnim[game] = true;
      $timeout(function() {
        if ($scope.showAnim[game]) {
          $scope.showAnim[game] = false;
        }
      }, 999);
      console.log($scope.showAnim);
    }, function() {
      
    });
    $scope.upvotedGames.push(game);
    localforage.setItem('upvotedgames', $scope.upvotedGames);
  };
  
  $scope.downvoteGame = function(game) {
    if ($scope.upvotes[game] == null || $scope.upvotes[game] == 0) {
      $scope.upvotedGames = $scope.upvotedGames.filter((el) => el != game);
      localforage.setItem('upvotedgames', $scope.upvotedGames);
      return;
    }
    $http.post('/downvoteGame', {title: game}).then(function(res) {
      $scope.upvotes[game]--;
      $scope.showAnim[game] = false;
    }, function() {
      
    });
    $scope.upvotedGames = $scope.upvotedGames.filter((el) => el != game);
    localforage.setItem('upvotedgames', $scope.upvotedGames);
  };
  
  localforage.getItem('upvotedgames', function(err, val) {
    if(val) {
      $scope.upvotedGames = val;
      $scope.$apply();
    }
  });
  
});
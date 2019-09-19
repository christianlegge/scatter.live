var app = angular.module('spurts', []);

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

app.controller('spurtsController', function($scope) {
  
  $scope.melons = 'melons1';
  $scope.sniper = 'sniper';
  $scope.ammocap = 'ammo50';
  $scope.homing = 'homing';
  $scope.instcap = 'inst10';
  $scope.slam = 'ss';
  $scope.n64coin = 'n64coin';
  $scope.rarecoin = 'rarecoin';
  
  $scope.shownkeyselector = '';
  $scope.keynums = {};
  
  $scope.selected = {
    'donkey':true,
    'melons': true,
    'slam': true,
  };
  
  $scope.select = function(kongupgrade) {
    $scope.selected[kongupgrade] = $scope.selected[kongupgrade] != null ? !$scope.selected[kongupgrade]  : true;
    if (kongupgrade.includes('gun') && $scope.selected[kongupgrade] && !$scope.selected['ammocap']) {
      $scope.selected['ammocap'] = true;
    }
    if (kongupgrade.includes('instrument') && $scope.selected[kongupgrade] && !$scope.selected['instcap']) {
      $scope.selected['instcap'] = true;
    }
    updateForage();
  };
  
  $scope.getKeyStyle = function(worldkey) {
      return "background: url('/images/spurts/"+($scope.keynums[worldkey] || "q")+".png') right bottom / auto 16px no-repeat, url('/images/spurts/"+ ($scope.selected[worldkey] ? "key" : "keydis") +".png') center/contain no-repeat";
  }
  
  $scope.clickmelons = function() {
    if ($scope.melons == 'melons1') {
      $scope.melons = 'melons2';
    }
    else if ($scope.melons == 'melons2') {
      $scope.melons = 'melons3';
    }
    else if ($scope.melons == 'melons3') {
      $scope.melons = 'melons1';
    }
    updateForage();
  }
  
  $scope.clickammocap = function() {
    if (!$scope.selected['ammocap']) {
      $scope.selected['ammocap'] = true; 
    }
    else if ($scope.ammocap == 'ammo50') {
      $scope.ammocap = 'ammo100'; 
    }
    else if ($scope.ammocap == 'ammo100') {
      $scope.ammocap = 'ammo200'; 
    }
    else if ($scope.ammocap == 'ammo200') {
      $scope.ammocap = 'ammo50'; 
      $scope.selected['ammocap'] = false;
    }
    updateForage();
  }
  
  $scope.clickhoming = function () {
    $scope.select('homing');
  };
  
  $scope.clicksniper = function () {
    $scope.select('sniper');
  };
  
  $scope.clickslam = function() {
    if (!$scope.selected['slam']) {
      $scope.selected['slam'] = true; 
    }
    else if ($scope.slam == 'ss') {
      $scope.slam = 'sss'; 
    }
    else if ($scope.slam == 'sss') {
      $scope.slam = 'sdss'; 
    }
    else if ($scope.slam == 'sdss') {
      $scope.slam = 'ss'; 
      $scope.selected['slam'] = false;
    }
    updateForage();
  }
  
  $scope.clickinstcap = function() {
    if (!$scope.selected['instcap']) {
      $scope.selected['instcap'] = true; 
    }
    else if ($scope.instcap == 'inst10') {
      $scope.instcap = 'inst15'; 
    }
    else if ($scope.instcap == 'inst15') {
      $scope.instcap = 'inst20'; 
    }
    else if ($scope.instcap == 'inst20') {
      $scope.instcap = 'inst25'; 
    }
    else if ($scope.instcap == 'inst25') {
      $scope.instcap = 'inst10'; 
      $scope.selected['instcap'] = false;
    }
    updateForage();
  }
  
  $scope.clickn64coin = function () {
    $scope.select('n64coin');
  };
  
  $scope.clickrarecoin = function () {
    $scope.select('rarecoin');
  };
  
  $scope.setkeynum = function(worldkey) {
    if ($scope.keynums[worldkey] == 8) {
      $scope.keynums[worldkey] = 1;
    }
    else if ($scope.keynums[worldkey] < 8 && $scope.keynums[worldkey] >= 1) {
      $scope.keynums[worldkey]++;
    }
    else {
      $scope.keynums[worldkey] = 1;
    }
    updateForage();
  }
  
  $scope.reset = function() {
    $scope.melons = 'melons1';
    $scope.sniper = 'sniper';
    $scope.ammocap = 'ammo50';
    $scope.homing = 'homing';
    $scope.instcap = 'inst10';
    $scope.slam = 'ss';
    $scope.n64coin = 'n64coin';
    $scope.rarecoin = 'rarecoin';
    
    $scope.keynums = {};
    
    $scope.selected = {
      'donkey':true,
      'melons': true,
      'slam': true,
    };
    
    updateForage();
  }
  
  var forageItems = ['keynums', 'melons', 'sniper', 'ammocap', 'homing', 'instcap', 'slam', 'n64coin', 'rarecoin', 'selected'];
  
  $scope.updateForage = function() {
    updateForage();
  };
  
  var updateForage = function() {
    forageItems.forEach(function(item) {
      localforage.setItem(item, $scope[item]);
    });
  }
  
  
  Promise.all(
    forageItems.map(x => localforage.getItem(x))
  ).then(function(results) {
    for (var i = 0; i < forageItems.length; i++) {
      if (results[i] != null && results[i] != undefined) {
        $scope[forageItems[i]] = results[i];
      }
    }
    $scope.$apply();
  });
  
  
});
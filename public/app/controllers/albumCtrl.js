var app = angular.module('musicProj');

app.controller('albumCtrl', function ($scope, albumService, albumData) {
	$scope.albumData = albumData;
	console.log($scope.albumData);

  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };
  
  // $scope.test = function() {
  //   albumService.getUser()
  // }
});


var app = angular.module('musicProj');

app.controller('mainCtrl', function ($scope, homeService, reviewInfo) {
//   $scope.newReleases = function() {
//   		homeService.newReleases().then(function(res) {
//   			console.log('billy', res)
//   		})
//   }
    $scope.reviewInfo = reviewInfo;
    console.log(987654321, $scope.reviewInfo);
})

var app = angular.module('musicProj');

app.controller('profileCtrl', function ($scope, profileService, homeService, getCurrentUser) {
	$scope.getCurrentUser = getCurrentUser;
	console.log($scope.getCurrentUser)
	
	
	
	
})
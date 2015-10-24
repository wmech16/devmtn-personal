var app = angular.module('musicProj');

app.controller('mainCtrl', function ($scope, homeService, recentReview, $state, highestRated) {
	$scope.recentReview = recentReview;
	console.log(123, $scope.recentReview);
	$scope.highestRated = highestRated;
	console.log($scope.highestRated);
	
	// if ($scope.recentReview.userId.name = null) {
	// 		$scope.noName = false;
	// 		$scope.spotifyId = JSON.parse(JSON.stringify({spotifyId: recentReview.userId.spotifyId}));
	// }
	
	
	$scope.getArtistData = function (id, artist) {
    	homeService.setCurrentArtist(artist);
    	$state.go('artist.albums', {
    		id: id
    	})
    }
})

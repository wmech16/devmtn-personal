var app = angular.module('musicProj');

app.controller('searchCtrl', function ($scope, homeService, $state) {
	$scope.artistData = [];
    $scope.findArtistData = function() {
        homeService.artistSearch($scope.searchArtist).then(function (response) {
            $scope.searchArtist = ""
            $scope.artistData = response;
            console.log(12344, $scope.artistData);
        })
    }

    $scope.getArtistData = function (id, artist) {
    	homeService.setCurrentArtist(artist);
    	$state.go('artist.albums', {
    		id: id
    	})
    }
})
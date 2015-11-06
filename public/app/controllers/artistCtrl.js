var app = angular.module('musicProj');

app.controller('artistCtrl', function ($scope, homeService, id, artistService, albumInfo, conData, relatedArt, $state, albumService) {
 
	$scope.artistInfo = id;
	console.log('Artist Info', $scope.artistInfo);
	var artistId = $scope.artistInfo.id;
	$scope.albumInfo = albumInfo;
	console.log('Album Info', $scope.albumInfo);
	// var albumId = $scope.albumInfo[0].id;
	// console.log('Album Id', albumId)
	$scope.conData = conData
	if (typeof $scope.conData === 'undefined' || (!('event' in $scope.conData))) {
		$scope.noCon = true;
		$scope.conData = {
			message: 'This artist has no upcoming concerts :('
		}
	} 
	$scope.relatedArt = relatedArt;
	console.log('Related Artists', $scope.relatedArt);
	console.log('Concert Data', $scope.conData);
	// $scope.albumData = albumData;
	// console.log(00000, $scope.albumData);

	$scope.getArtistData = function (id, artist) {
    	homeService.setCurrentArtist(artist);
    	$state.go('artist.albums', {
    		id: id
    	})
    }

    $scope.getCurrentAlbum = function(){
    	$scope.currentAlbum = albumService.getCurrentAlbum();
    	    }

    $scope.goToAlbum = function (album) {
    	albumService.setCurrentAlbum(album);
    	$scope.albumData = albumService.getCurrentAlbum(); 
    	// $scope.albumData = albumData; 
    	console.log(222222222,$scope.albumData)
    	$state.go('artist.album', {
    		albumId: album.id
    	})
    	
    }
})

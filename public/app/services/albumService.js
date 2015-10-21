var app = angular.module('musicProj').service('albumService', function($http) {
	var currentAlbum = {};
	this.getCurrentAlbum = function() {
		return currentAlbum;
	}
	this.setCurrentAlbum = function(album) {
		currentAlbum = album;
	}
	this.getAlbumInfo = function(id) {
		return $http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/albums/'+ id
		}).then(function(res) {
			console.log(123456780, res.data);
			return res.data
		})
	}
	// this.getUser = function() {
	// 	return $http({
	// 		method: 'GET',
	// 		url: 'http://localhost:3000/user'
	// 	}).then(function(res) {
	// 		console.log(res);
	// 	})
	// }
	
});
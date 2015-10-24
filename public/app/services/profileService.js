var app = angular.module('musicProj').service('profileService', function($http) {
	
	this.getUser = function(userId) {
		return $http ({
			method: 'GET',
			url: 'http://localhost:3000/'+ userId
		}).then(function(res) {
			return res;
		})
	}
})
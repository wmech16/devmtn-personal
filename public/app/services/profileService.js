var app = angular.module('musicProj').service('profileService', function($http) {
	
	this.getUser = function(userId) {
		return $http ({
			method: 'GET',
			url: 'http://localhost:3000/users/'+ userId
		}).then(function(res) {
			console.log(11, res)
			return res.data.reviews;
		}, function(err){
			console.log(12, err)
		})
	}
	
	// this.getReviews = function(userId) {
	// 	return $http({
	// 		method: 'GET',
	// 		url: 'http://localhost:3000/review'+ userId
	// 	}).then(function(res) {
	// 		console.log(res);
	// 	})
	// }
    
    this.deleteReview = function(id) {
        return $http({
            method: 'DELETE',
            url: '/review/' + id
        })
    }
})
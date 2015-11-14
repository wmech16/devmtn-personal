var app = angular.module('musicProj');

app.controller('profileCtrl', function ($scope, profileService, getReviews, homeService, getCurrentUser) {
	$scope.getCurrentUser = getCurrentUser;
	console.log("FROM PROFILE CONTROLLER",$scope.getCurrentUser)
	
	$scope.getReviews = getReviews;
	console.log('billy', $scope.getReviews);
	
	// $scope.getReviews = function(userId) {
	// 	console.log('GETTING REVIEWS');
	// 	profileService.getUser($scope.getCurrentUser._id).then(function(res) {
	// 		console.log(12, res);
	// 	})
	// }
	
	$scope.removeReview = function(id) {
        if (confirm("Are you sure you want to delete this review?")) {
            profileService.deleteReview(id).then(function(res) {
                console.log('Review Deleted');
                profileService.getUser(getCurrentUser._id).then(function(res) {
                    $scope.getReviews = res;
                })
                
            })
        }
    }
})
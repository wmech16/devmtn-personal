var app = angular.module('musicProj');

app.directive('headerDirective', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/views/headerView.html',
		controller: function($scope, homeService) {
			$scope.findCurrentUser = function() {
				homeService.getCurrentUser().then(function(res) {
					$scope.currentUser = res.data
					return $scope.currentUser;
				})
			}
		}
			
	}
})
var app = angular.module('musicProj');

app.controller('headerCtrl', function ($scope, homeService) {
  
   

   (function findCurrentUser() {
   		homeService.getCurrentUser().then(function(res) {
   			console.log(res.data)
   			$scope.currentUser =  res.data
   		})
    })()          
})
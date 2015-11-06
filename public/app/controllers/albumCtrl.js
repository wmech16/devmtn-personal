var app = angular.module('musicProj');

app.controller('albumCtrl', function ($scope, albumService, albumData, getCurrentUser, getAlbumsReviews, profileService) {
	$scope.albumData = albumData;
  
  $scope.getCurrentUser = getCurrentUser;
  console.log(4444444, $scope.getCurrentUser);
  console.log('ALBUM DATA', albumData, $scope.get);
  $scope.getAlbumsReviews = getAlbumsReviews.data.reviews;
  console.log(77777, $scope.getAlbumsReviews);
  
  if($scope.getAlbumsReviews && $scope.getAlbumsReviews.length > 0) {
    $scope.getAlbumsReviews.forEach(function(review) {
      console.log(15, review)
      if(review.user._id == $scope.getCurrentUser._id) {
        $scope.userRating = review.review.review.score;
        $scope.alreadyReviewed = true;
        $scope.usersReview = JSON.parse(JSON.stringify({_id: review.review._id}));
        $scope.usersReview.review = JSON.parse(JSON.stringify(review.review.review));
      }
      if(!review.user._id) {
        $scope.userRating = 'No reviews'
      }
    })
  }
 
  if(!$scope.getAlbumsReviews) {
    $scope.averageScore = 'No reviews'
  } else {
      var total = 0
      $scope.getAlbumsReviews.forEach(function (item) {
      total += item.review.review.score        
      });
      $scope.averageScore = (total / $scope.getAlbumsReviews.length).toFixed(0);
      console.log($scope.averageScore);
      
    
    }
    

  
  // $scope.test = function() {
  //   albumService.getUser()
  // }
  
  $scope.test = function(review, album) {
     album = $scope.albumData;
     var userId = getCurrentUser._id;
     console.log(userId)
     albumService.postReview(review, album, userId).then(function(res) {
       $scope.review = "";
       console.log('New review', res);
        albumService.getAlbumsReviews(albumData.id).then(function(res) {
          $scope.getAlbumsReviews = res.data.reviews;
          console.log($scope.getAlbumReviews)
        })
    });
  };
  
  $scope.updateReview = function(usersReview) {
    albumService.updateReview(usersReview).then(function(res) {
      console.log('Update Review', res);
    })
  }
});



var app = angular.module('musicProj');

app.service('homeService', function ($http, $state) {
    var currentArtist = "";
    this.getCurrentArtist = function() {
        return currentArtist;
    }
    this.setCurrentArtist = function(artist){
        currentArtist = artist;
    }
    this.artistSearch = function (artist) {
        var url = 'https://api.spotify.com/v1/search?q=' + artist + '%20NOT%20ft.%20NOT%20featuring%20NOT%20feat&type=artist&market=US'
        return $http({
            method: 'GET',
            url: url
        }).then(function (results) {
            var results = results.data.artists.items;
            return results
        })
    }

    this.getArtist = function (id) {
        return $http({
            method: 'GET',
            url: "https://api.spotify.com/v1/artists/" + id

        }).then(function (results) {
            return results;
        })
        
    };
    
     this.newReleases = function() {
         var url = 'https://api.spotify.com/v1/browse/new-releases?country=US'
         return $http({
             method: 'GET',
             url: url
            
         }).then(function(newReleases) {
             console.log(newReleases);
         })
     }


    this.getCurrentUser = function() {
        return $http.get('currentUser')
    }
    
    this.getRecentReviews = function() {
        return $http({
            method: 'GET',
            url: 'review'
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.getHighest = function() {
        return $http({
            method: 'GET',
            url: 'album'
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.auth = function() {
        console.log(7)
        return $http({
            method: 'GET',
            url: 'isAuth'
        }).then(function(success) {
            return success;
        }, function(err) {
            if (err.status === 401) {
                $state.go('login')
            }
            else {
                console.log(err);
            }
        })
    }
    
})



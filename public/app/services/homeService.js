var app = angular.module('musicProj');

app.service('homeService', function ($http) {
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
        var url = 'https://api.spotify.com/v1/browse/new-releases&market=US'
        return $http({
            method: 'GET',
            url: url
        }).then(function(newReleases) {
            console.log(newReleases);
        })
    }


    this.getCurrentUser = function() {
        return $http.get('http://localhost:3000/currentUser')
        .then(function(response){
            return response
        })
    }
    
    this.getReviews = function() {
        return $http.get('http://localhost:3000/review').then(function(res) {
            return res.data[0];
        })
    }
})

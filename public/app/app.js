var app = angular.module('musicProj', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/landingView.html',
            controller: 'landingCtrl'
                
        })
        .state('home', {
            url: '/home',
            templateUrl: 'app/views/homeTemp.html',
            controller: 'mainCtrl',
            resolve: {
                recentReview: function(homeService) {
                    return homeService.getRecentReviews();
                },
                highestRated: function(homeService) {
                    return homeService.getHighest();
                },
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
//                newReleases: function(homeService) {
//                    return homeService.newReleases();
//                }
            }
        
    	})
        .state('search', {
        	url: '/search',
        	templateUrl: 'app/views/searchView.html',
        	controller: 'searchCtrl',
            resolve: {
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
            }
        })
        .state('artist', {
        	url: '/artist/:id',
        	templateUrl: 'app/views/artistView.html',
        	controller: 'artistCtrl',
        	resolve: {
        		id: function (homeService, $stateParams) {
        			return homeService.getArtist($stateParams.id).then(function (res) {
        					return res.data
        			})
        		},
                albumInfo: function(artistService, $stateParams) {
                    return artistService.getAlbums($stateParams.id);
                },
                conData: function(artistService, $stateParams) {
                    return artistService.getConcerts($stateParams.id);
                },
                relatedArt: function(artistService, $stateParams) {
                    return artistService.getRelated($stateParams.id);
                },
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
                // albumData: function(albumService, $stateParams) {
                //     var id = "null";
                //     if ($stateParams.albumId) id = $stateParams.albumId;
                //     return albumService.getAlbumInfo(id);
                // }
            }
        })
        .state('artist.albums', {
            url: '/albums',
            templateUrl: 'app/views/artistAlbums.html',
            controller: 'artistCtrl',
            resolve: {
               user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
            }
        })

        .state('artist.concerts', {
            url: '/concerts', 
            templateUrl: 'app/views/artistConcert.html',
            controller: 'artistCtrl',
            resolve: {
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
            }
        })

        .state('artist.similar', {
            url: '/similar',
            templateUrl: 'app/views/artistSimilar.html',
            controller: 'artistCtrl',
            resolve: {
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
            }
        })

        .state('artist.album', {
            url: '/album/:albumId',
            templateUrl: 'app/views/albumView.html',
            controller: 'albumCtrl',
            resolve: {
                albumData: function(albumService, $stateParams) {
                    return albumService.getAlbumInfo($stateParams.albumId);
                },
                getCurrentUser: function(homeService) {
                    return homeService.getCurrentUser().then(function(res){
                        return res.data;
                    })
                },
                getAlbumsReviews: function(albumService, $stateParams) {
                    return albumService.getAlbumsReviews($stateParams.albumId);
                },
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
          
            }
        })
        
        .state('profile', {
            url: '/profile/:userId',
            templateUrl: 'app/views/profile.html',
            controller: 'profileCtrl',
            resolve: {
                getCurrentUser: function(homeService) {
                    return homeService.getCurrentUser().then(function(res){
                        return res.data; 
                   })
                },
                getReviews: function($stateParams, profileService) {
                   console.log('profile resolve');
                   return profileService.getUser($stateParams.userId);
                },
                user: function(homeService) {
                    return homeService.auth().then(function(res) {
                        return res;
                    })
                    
                }
                
                
            }
        })

})

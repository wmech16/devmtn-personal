var mongoose = require('mongoose');

var Review = require('../models/review');
var Album = require('../models/album');
var Users = require('../models/users')


module.exports.create = function (req, res) {

    var reviewObj = {
        albumSpotifyId: req.body.albumSpotifyId,
        userId: req.body.userId,
        album: req.body.album,
        artist: req.body.artist,
        review: req.body.review
    }

    Review.create(req.body, function (err, resp) {
        console.log(5555555555, resp);
        if (err) return res.status(500).json(err);

        var reviewAdded = {};
        Users.findById(req.body.userId, function (err, user) {
                user.reviews.push(resp._id)
                user.save(function (err, updatedUser) {
                    if (err) return res.status(500).json(err);
                    reviewAdded.user = true;

                })
            }),
            Album.findOne({
                'albumSpotifyId': reviewObj.albumSpotifyId
            }, function (err, album) {
                if (err) return res.status(500).json(err);

                if (!album) {
                    Album.create({
                        albumSpotifyId: reviewObj.albumSpotifyId,
                        album: reviewObj.album,
                        artist: reviewObj.artist,
                        reviews: [{
                            review: resp._id,
                            user: resp.userId
                        }],
                    }, function (err, newAlbum) {
                        if (err) return res.status(500).json(err);
                        // return res.status(200).json('newAlbum', newAlbum);
                        reviewAdded.album = true;
                    });
                }

                if (album) {
                    album.reviews.push({
                        review: resp._id,
                        user: resp.userId
                    });
                    album.save(function (err, updatedAlbum) {
                        if (err) return res.status(500).json(err);
                        // return res.status(200).json('updatedAlbum', updatedAlbum);
                        reviewAdded.album = true;
                    });
                }
            });

        function isDone() {
            if (reviewAdded.user && reviewAdded.album) return res.status(200).json('newReview', resp);
            isDone();
        }

        isDone();
    });

}

module.exports.update = function (req, res) {
    console.log(req.params.id)
    Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, result) {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    })
}

module.exports.read = function (req, res) {
    Review.find()
        .sort({
            createdAt: -1
        })
        .limit(2)
        .populate('userId')
        .exec(function (err, recentReview) {
            if (err) return res.status(500).send(err);
            res.status(200).json(recentReview);
        })
}

module.exports.getReviews = function (req, res) {
    Review.findById(req.params.userId)
        .exec(function (err, userReview) {
            if (err) return res.status(500).send(err);
            res.status(200).json(userReview);
        })
}
	
	
	
	
	
	
	
	
	
module.exports.delete = function (req, res) {
    Review.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {return res.status(500).send("Review Failed!");}
        Album.find({}).update({},{
            $pull: {
                reviews: {
                    $elemMatch: {
                        review: req.params.id
                    }
                }
            }
        }).exec(function (err, result) {
            if (err) {
                console.log('could not delete album');
                return res.status(500).send("AlbumFailed!");
            }
            Users.find({}).update({
                $pull: {
                    reviews: req.params.id
                }
            }).exec(function (err, result) {
                if (err) {
                    console.log('User failed', err);
                    return res.status(500).send("User Failed!");
                }
                return res.json(result);
            });
        });
    });


}
// module.exports.delete = function (req, res) {
//     Review.findByIdAndRemove(req.params.id, function (err, result) {
//         if (err) {return res.status(500).send("Review Failed!");}
//         Album.update({},{
//             $pullAll: {
//                 reviews: [{review: mongoose.Schema.Types.ObjectId(req.params.id)}]
//             }
//         }).exec(function (err, result) {
//             if (err) {return res.status(500).send("AlbumFailed!");}
//             Users.find().update({},{
//                 $pullAll: {
//                     reviews: [{review: mongoose.Schema.Types.ObjectId(req.params.id)}]
//                 }
//             }).exec(function (err, result) {
//                 if (err) {
//                     console.log('User failed', err);
//                     return res.status(500).send("User Failed!");
//                 }
//                 return res.json(result);
//             });
//         });
//     });


// }








// 	new Review(reviewObj)
// 	.save(function(err, review) {
// 		if (err) {
// 			console.log('review creation error: ', err)
// 			res.status(500).send(err);
// 		}

// 		Album.findOne({spotifyId: req.params.albumId}, function(err, album) {
// 			if(err) {
// 				console.log('album find error: ', err)
// 				return res.status(500).json(err);
// 			}
// 			if (!album) {
// 				console.log(review);
// 				Album.create({spotifyId: req.params.albumId, reviews: [mongoose.Schema.Types.ObjectId(review._id)]}, function(err, newAlbum) {
// 					if (err) {
// 						res.status(500).send(err);
// 					} res.send(newAlbum);
// 				})
// 			} else {
// 			album.reviews.push({ review: mongoose.Schema.Types.ObjectId(review._id), user: mongoose.Schema.Types.ObjectId(req.params.userId) });
// 			album.save(function(err, data) {
// 				if (err) {
// 					console.log('album review save error: ', err);
// 					res.status(500).send(err);
// 				}
// 				res.send(data)
// 			})
// 			}
// 		})
// 	})
// }


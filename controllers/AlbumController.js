var mongoose = require('mongoose');

var Album = require('../models/album');

module.exports.create = function(req, res) {
	new Album(req.body)
	.save(function(err, album) {
		if (err) {
			console.log(err)
			res.status(500).send(err);
		}
		res.send(album)
	})
}

module.exports.getAlbum = function(req,res) {
	Album.findOne({albumSpotifyId: req.params.albumSpotifyId})
	.populate('reviews.review reviews.user')
	.exec(function(err, album) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		
		res.send(album)
	})
}

module.exports.read = function(req, res) {
	Album.find()
	.sort({ overallRating: 1 })
	.limit(10)
	.populate('reviews.review')
	.exec(function(err, highestRated) {
		if (err) return res.status(500).send(err);
		res.status(200).json(highestRated);
	})
}


module.exports.post = function(req, res) {
	Album.overRating
}



// module.exports = {
// 	create: function() {
		
// 	},
// 	getAlbum: function
// }
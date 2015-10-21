var Review = require('../models/review');
var Album = require('../models/album');


module.exports.create = function(req, res) {
	
	var reviewObj = {
		albumId: req.params.albumId,
		userId: req.params.userId,
		review: req.body
	}
	
	new Review(reviewObj)
	.save(function(err, review) {
		if (err) {
			console.log(err)
			res.status(500).send(err);
		}
		
		Album.findById(req.params.albumId, function(err, album) {
			if(err) {
				return res.status(500).json(err);
			}
			album.reviews.push({ review: review._id, user: req.params.userId });
			album.save(function(err, data) {
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				res.send(data)
			})
		})
	})
}

module.exports.getReviews = function(req, res) {
	Review.find()
	.exec(function(err, result) {
		if (err) return res.status(500).send(err);
		res.json(result);
	})
}
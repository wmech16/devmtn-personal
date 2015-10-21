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
	Album.findById(req.params.id)
	.populate('reviews.review')
	.populate('reviews.user')
	.exec(function(err, album) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		
		res.send(album)
	})
}
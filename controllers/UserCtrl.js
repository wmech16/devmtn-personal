var mongoose = require('mongoose');

var User = require('../models/users')

module.exports.getUser = function(req, res) {
	User.findById(req.params.userId)
	.populate('reviews')
	.exec(function(err, user) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		res.send(user);
	})
}

// module.exports = {
// 	getUser: function(req,res) {
// 		User.findById(req.params.userId)
// 		.populate('reviews.review')
// 		.exec(function(err, user) {
// 			if (err) return res.status(500).send(err);
// 			res.status(200).json(user);
// 		})
// 	}
// }
var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
	spotifyId: { type: String },
	title: { type: String },
	artist: { type: String },
	imgUrl: { type: String },
	spotifyPlayer: { type: String },
	tracks: [],
	reviews: [{
		review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	}],
	overallRating: { type: Number },
	createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Album', AlbumSchema)
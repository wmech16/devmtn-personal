var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	albumSpotifyId: { type: String },
	artist: { type: String },
	album: { type: String },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	review: {
		score: { type: Number, required: true },
		title: { type: String, maxlength: 100, required: true },
		content: { type: String, minlength: 120, required: true }
	},
	createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Review', ReviewSchema)
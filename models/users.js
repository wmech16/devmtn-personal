var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {type: String},
	spotifyId: {type: String},
	profilePic: {type: String},
	accessToken: {type: String},
	refreshToken: {type: String},
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
	likes: [{ type: String }],
	createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)



var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {type: String},
	spotifyId: {type: String},
	profilePic: {type: String},
	createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)



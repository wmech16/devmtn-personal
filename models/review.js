var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	review: {
		stars: { type: Number },
		title: { type: String },
		content: { type: String }
	},
	createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Review', ReviewSchema)
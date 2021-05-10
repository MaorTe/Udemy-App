const mongoose = require('mongoose');

const Comment = mongoose.model(
	'Comment',
	{
		// userAvatar: {
		// 	type: String,
		// 	required: true,
		// 	validate(val) {
		// 		if (!val.includes('.jpg')) {
		// 			throw new Error('not a jpg image');
		// 		}
		// 	},
		// },
		// userName: {
		// 	type: String,
		// 	required: true,
		// },
		// dateAdded: {
		// 	type: Date,
		// 	default: Date.now(),
		// 	validate(value) {
		// 		if (!validator.isDate(value)) {
		// 			console.log(value);
		// 			throw new Error('is not a valid date');
		// 		}
		// 	},
		// },
		content: {
			type: String,
			required: true,
			trim: true,
		},
		likes: {
			type: Number,
		},
		videoId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Video',
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = Comment;

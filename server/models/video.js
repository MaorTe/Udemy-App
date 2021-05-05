const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	videoLink: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	// comments: [
	// 	{
	// 		userAvatar: {
	// 			type: String,
	// 			required: true,
	// 			validate(val) {
	// 				if (!val.includes('.jpg')) {
	// 					throw new Error('not a jpg image');
	// 				}
	// 			},
	// 		},
	// 		userName: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		dateAdded: {
	// 			type: Date,
	// 			default: Date.now(),
	// 			validate(value) {
	// 				if (!validator.isDate(value)) {
	// 					console.log(value);
	// 					throw new Error('is not a valid date');
	// 				}
	// 			},
	// 		},
	// 		content: {
	// 			type: String,
	// 			required: true,
	// 			trim: true,
	// 		},
	// 		likes: {
	// 			type: Number,
	// 		},
	// 	},
	// ],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

userSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'owner',
});

const Video = mongoose.model('Video', userSchema);
module.exports = Video;

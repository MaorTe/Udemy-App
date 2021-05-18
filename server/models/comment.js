const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
	{
		comments: [
			{
				content: {
					type: String,
					required: true,
					trim: true,
				},
				owner: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User',
				},
				likes: {
					type: Number,
				},
			},
		],
		videoId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Video',
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

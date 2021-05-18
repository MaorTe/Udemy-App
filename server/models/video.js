const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	videoLink: {
		type: String,
		required: true,
		// trim: true,
	},
	videoTitle: {
		type: String,
		required: true,
		// trim: true,
	},
	videoDescription: {
		type: String,
		required: true,
		// trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Course',
	},
	comments: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	},
});

// videoSchema.virtual('comments', {
// 	ref: 'Comment',
// 	localField: '_id',
// 	foreignField: 'videoId',
// });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;

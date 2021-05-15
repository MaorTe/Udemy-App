const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	courseImage: {
		type: String,
		required: true,
		// validate(val) {
		// 	if (!val.includes('.jpg')) {
		// 		throw new Error('not a jpg image');
		// 	}
		// },
	},
	courseName: {
		type: String,
		required: true,
	},
	courseDescription: {
		type: String,
		required: true,
	},
	tag: {
		type: String,
		required: true,
	},
	courseVideos: [
		{
			videoId: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'Video',
			},
		},
	],
	// owner: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User',
	// },
});
courseSchema.virtual('videos', {
	ref: 'Video',
	localField: '_id',
	foreignField: 'courseId',
});
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

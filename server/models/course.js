const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
	courses: [
		{
			courseImage: {
				type: String,
				required: true,
				validate(val) {
					if (!val.includes('.jpg')) {
						throw new Error('not a jpg image');
					}
				},
			},
			courseName: {
				type: String,
				required: true,
			},
			courseDescription: {
				type: String,
				required: true,
			},
			owner: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'User',
			},
		},
	],
});
userSchema.virtual('videos', {
	ref: 'Video',
	localField: '_id',
	foreignField: 'owner',
});

module.exports = Course;

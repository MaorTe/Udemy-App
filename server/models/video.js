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

const Course = mongoose.model('Course', userSchema);
module.exports = Course;

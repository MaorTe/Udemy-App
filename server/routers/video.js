const express = require('express');
const auth = require('../middleware/auth');
const Video = require('../models/video');
const Course = require('../models/course');
const Comment = require('../models/comment');
const router = new express.Router();

// ---------add video---------
router.post('/api/video/addvideo', auth, async (req, res) => {
	//make new videos in video collection
	const video = new Video({
		...req.body,
	});
	const comment = new Comment({ videoId: video._id });
	//just like virtual, but wont return array
	video.comments = comment._id;
	try {
		//attach the video to the correct course
		const course = await Course.findById(req.body.courseId);
		course.courseVideos.push({ videoId: video._id });
		await course.save();
		await video.save();
		await comment.save();
		res.status(201).send({ video, course });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/api/users/courses/video/:courseId', auth, async (req, res) => {
	try {
		const video = await Video.find({ courseId: req.params.courseId });
		res.send(video);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

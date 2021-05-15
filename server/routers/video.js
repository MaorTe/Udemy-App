const express = require('express');
const Video = require('../models/video');
const auth = require('../middleware/auth');
const router = new express.Router();

// ---------add video---------
router.post('/api/video/addvideo', auth, async (req, res) => {
	//make new videos in video collection
	const video = new Video({
		...req.body,
	});
	try {
		//attach the video to the correct course
		const newCourse = { courseId: req.body.id };
		req.user.courses.push(newCourse);
		req.user.save();
		res.send(req.user.courses);
		//
		await video.save();
		res.status(201).send(video);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/api/users/courses/video/', auth, async (req, res) => {
	try {
		const video = await Video.find({});
		// await req.query
		// 	.populate({
		// 		path: 'comments',
		// 		populate: { path: 'courseId', select: 'name avatar-_id' },
		// 	})
		// 	.execPopulate();

		res.send(req.user.courses);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const Video = require('../models/video');
const router = new express.Router();

router.get('/api/users/courses/video/comments', auth, async (req, res) => {
	try {
		const video = await Video.find({});
		await req.query
			.populate({
				path: 'comments',
				populate: { path: 'owner', select: 'name avatar-_id' },
			})
			.execPopulate();
		res.send(req.user.courses);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

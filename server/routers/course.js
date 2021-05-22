const express = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router();

router.post('/api/courses/addcourse', auth, adminAuth, async (req, res) => {
	// const course = new Course(req.body);
	const course = new Course({
		...req.body,
	});

	try {
		await course.save();
		res.status(201).send(course);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/api/courses/:tag', async (req, res) => {
	try {
		const { tag } = req.query;
		const courses = await Course.find({ tag });
		// .populate('videos');
		res.send(courses);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/api/courses/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		//const course = await Course.findById(_id);
		const course = await Course.findOne({ _id, owner: req.user._id });
		if (!course) {
			return res.status(404).send();
		}

		res.send(course);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch('/api/courses/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		//const course = await Course.findById(req.params.id);
		const course = await Course.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!course) {
			return res.status(404).send();
		}

		updates.forEach((update) => (course[update] = req.body[update]));
		await course.save();
		res.send(course);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/api/courses/:id', auth, async (req, res) => {
	try {
		//const course = await Course.findByIdAndDelete(req.params.id);
		const course = await Course.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!course) {
			res.status(404).send();
		}

		res.send(course);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

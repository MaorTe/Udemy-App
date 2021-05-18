const express = require('express');
const auth = require('../middleware/auth');
const Comment = require('../models/comment');
const Video = require('../models/video');
const router = new express.Router();

// add comment
router.post('/api/comments/newcomment', auth, async (req, res) => {
	try {
		console.log(req.body);
		const comment = await Comment.findOne({ videoId: req.body.videoId });
		const newComment = { content: req.body.content, owner: req.user._id };
		comment.comments.unshift(newComment);
		await comment.save();
		res.send(newComment);
	} catch (e) {
		console.dir(e);
		res.status(500).send();
	}
});

// get comment
router.get('/api/comments/:videoId', auth, async (req, res) => {
	try {
		const comment = await Comment.findOne({
			videoId: req.params.videoId,
		}).populate({ path: 'comments.owner', select: 'name avatar' });
		res.status(200).send(comment.comments);
	} catch (e) {
		res.status(500).send();
	}
});
// edit comment
router.patch('/api/comments/:videoId', auth, async (req, res) => {
	try {
		// console.log(req.body.commentId);
		const comment = await Comment.findOne({
			videoId: req.params.videoId,
		});
		console.log(comment.comments);
		const foundComment = comment.comments.findIndex(
			// (el) => el._id === req.body.commentId
			(el) => console.log(el._id)
		);
		console.log(foundComment);
		comment.comments[foundComment].content = req.body.content;
		await comment.save();
		res.status(200).send(comment.comments);
	} catch (e) {
		console.dir(e);
		res.status(500).send();
	}
});

// delete comment
router.delete('/api/comments/:videoId', auth, async (req, res) => {
	try {
		const comment = await Comment.findOne({
			videoId: req.params.videoId,
		});

		const foundComment = comment.comments.findIndex(
			(el) => el._id === req.body.commentId
		);
		comment.comments.splice(foundComment, 1);
		await comment.save();
		res.status(200).send(comment.comments);
	} catch (e) {
		res.status(500).send();
	}
});

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

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};

	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		await req.user
			.populate({
				path: 'tasks',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.execPopulate();
		res.send(req.user.tasks);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

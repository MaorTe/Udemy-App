const express = require('express');
const auth = require('../middleware/auth');
const Comment = require('../models/comment');
const Video = require('../models/video');
const router = new express.Router();
const commentController = require('../controllers/commentController');

router.post('/api/comments/newcomment', auth, commentController.addNewComment);
router.get('/api/comments/:videoId', auth, commentController.getVideoComments);
router.patch('/api/comments/:videoId', auth, commentController.editComment);
router.delete('/api/comments/:videoId/:commentId', auth, commentController.deleteComment);

// -- features to be implemented --
// router.get('/api/users/courses/video/comments', auth, async (req, res) => {
//    try {
//       const video = await Video.find({});
//       await req.query
//          .populate({
//             path: 'comments',
//             populate: { path: 'owner', select: 'name avatar-_id' },
//          })
//          .execPopulate();
//       res.send(req.user.courses);
//    } catch (e) {
//       res.status(500).send();
//    }
// });

// GET /comments?completed=true
// GET /comments?limit=10&skip=20
// GET /comments?sortBy=createdAt:desc
// router.get('/tasks', auth, async (req, res) => {
// 	const match = {};
// 	const sort = {};

// 	if (req.query.completed) {
// 		match.completed = req.query.completed === 'true';
// 	}

// 	if (req.query.sortBy) {
// 		const parts = req.query.sortBy.split(':');
// 		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
// 	}

// 	try {
// 		await req.user
// 			.populate({
// 				path: 'tasks',
// 				match,
// 				options: {
// 					limit: parseInt(req.query.limit),
// 					skip: parseInt(req.query.skip),
// 					sort,
// 				},
// 			})
// 			.execPopulate();
// 		res.send(req.user.tasks);
// 	} catch (e) {
// 		res.status(500).send();
// 	}
// });

module.exports = router;

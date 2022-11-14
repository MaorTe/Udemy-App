const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router();
const videoController = require('../controllers/videoController');

router.post('/api/video/addvideo', auth, adminAuth, videoController.addNewVideo);
router.get('/api/users/courses/video/:courseId', auth, videoController.getVideo);

module.exports = router;

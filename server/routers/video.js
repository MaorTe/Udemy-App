const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router();
const videoController = require('../controllers/videoController');

router.post('/addvideo', auth, adminAuth, videoController.addNewVideo);
router.get('/courses/:courseId', auth, videoController.getVideo);

module.exports = router;

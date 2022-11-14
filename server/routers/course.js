const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const courseController = require('../controllers/courseController');
const router = new express.Router();

router.post('/api/courses/addcourse', auth, adminAuth, courseController.addNewCourse);
router.get('/api/courses/:tag', courseController.getCoursesByTag);

// ------ to be implemented on client side ------
router.get('/api/courses/:id', auth, courseController.getUserOwnCourse);
router.patch('/api/courses/:id', auth, courseController.updateUserOwnCourse);
router.delete('/api/courses/:id', auth, courseController.deleteUserOwnCourse);
// ------
module.exports = router;

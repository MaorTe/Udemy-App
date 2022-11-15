const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router();
const courseController = require('../controllers/courseController');

router.post('/api/courses/addcourse', auth, adminAuth, courseController.addNewCourse);
router.get('/api/courses/:tag', courseController.getCoursesByCategory);

// ------ to be implemented on client side ------
router.get('/api/courses/:id', auth, courseController.getUserOwnCourse);
router.patch('/api/courses/:id', auth, courseController.updateUserOwnCourse);
router.delete('/api/courses/:id', auth, courseController.deleteUserOwnCourse);
// ------
module.exports = router;

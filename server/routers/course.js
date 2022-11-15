const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router();
const courseController = require('../controllers/courseController');

router.post('/addcourse', auth, adminAuth, courseController.addNewCourse);
router.get('/:tag', courseController.getCoursesByCategory);

// ------ to be implemented on client side ------
router.get('/:id', auth, courseController.getUserOwnCourse);
router.patch('/:id', auth, courseController.updateUserOwnCourse);
router.delete('/:id', auth, courseController.deleteUserOwnCourse);
// ------
module.exports = router;

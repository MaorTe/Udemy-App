const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', auth, userController.logoutUser);
router.post('/logoutAll', auth, userController.logoutAllUsers);
router.post('/addcourse', auth, userController.addNewFavoriteCourse);
router.patch('/deletecourse', auth, userController.deleteFavoriteCourse);
router.get('/mycourses', auth, userController.getUserFavoriteCourses);
router.get('/me', auth, userController.validateUserToken);
router.patch('/me', auth, userController.updateUser);
router.delete('/me', auth, userController.deleteUser);

// -----------------Create user avatar-----------------
router.post(
   '/special/me/avatar',
   auth,
   userController.uploadUserAvatar.single('avatar'),
   userController.createUserAvatar,
   (error, req, res, next) => {
      res.status(400).send({ error: error.message });
   },
);
// delete avatar to be implemented on client side
router.delete('/me/avatar', auth, userController.deleteUserAvatar);
router.get('/:id/avatar', userController.getUserAvatar);

module.exports = router;

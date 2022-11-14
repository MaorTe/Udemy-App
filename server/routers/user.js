const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const userController = require('../controllers/userController');

router.post('/api/users', userController.createUser);
router.post('/api/users/login', userController.loginUser);
router.post('/api/users/logout', auth, userController.logoutUser);
router.post('/api/users/logoutAll', auth, userController.logoutAllUsers);
router.post('/api/users/addcourse', auth, userController.addNewFavoriteCourse);
router.patch('/api/users/deletecourse', auth, userController.deleteFavoriteCourse);
router.get('/api/users/mycourses', auth, userController.getUserFavoriteCourses);
router.get('/api/users/me', auth, userController.validateUserToken);
router.patch('/api/users/me', auth, userController.updateUser);
router.delete('/api/users/me', auth, userController.deleteUser);

// -----------------Create user avatar-----------------
router.post(
   '/api/users/special/me/avatar',
   auth,
   userController.uploadUserAvatar.single('avatar'),
   userController.createUserAvatar,
   (error, req, res, next) => {
      res.status(400).send({ error: error.message });
   },
);
router.delete('/users/me/avatar', auth, userController.deleteUserAvatar);
router.get('/users/:id/avatar', userController.getUserAvatar);

module.exports = router;

const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();

// -----------------Create user-----------------
router.post('/api/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

//the login/signup request will send back an auth token, JWT token, and then we can use it later on for other requests to be authenticated
//for example edit user profile,create new task...
router.post('/api/users/login', async (req, res) => {
	try {
		//we will create 'findByCredentials' in the user model
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		//generateAuthToken exist only on the instances
		const token = await user.generateAuthToken();
		//when we send an obj, behind the scenes it stringify toJSON
		res.send({ user, token });
	} catch (e) {
		res.status(400).send();
	}
});

// -----------------logout-----------------
router.post('/api/users/logout', auth, async (req, res) => {
	try {
		//we already have access to req.user so all we change is the token
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

// -----------------logout all users-----------------
router.post('/api/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

// -----------------Add course from favorite courses-----------------
//adminAuth
router.post('/api/users/addcourse', auth, async (req, res) => {
	try {
		const newCourse = { courseId: req.body.id };
		req.user.courses.push(newCourse);
		req.user.save();
		res.send(req.user.courses);
	} catch (e) {
		res.status(500).send();
	}
});

// -----------------Delete course from favorite courses-----------------
router.patch('/api/users/deletecourse', auth, async (req, res) => {
	try {
		await User.updateOne(
			{
				_id: req.user.id,
			},
			{
				$pull: {
					courses: { courseId: req.body.id },
				},
			}
		);
		res.send(req.user.courses);
	} catch (e) {
		res.status(500).send();
	}
});

// -----------------User favorite courses-----------------
router.get('/api/users/mycourses', auth, async (req, res) => {
	try {
		await req.user
			.populate({
				path: 'courses.courseId',
			})
			.execPopulate();
		res.send(req.user.courses);
	} catch (e) {
		res.status(500).send();
	}
});

//Without middleware: new request → run route handler
//With middleware:    new request → do something → run route handler

//after login/signup the client takes this auth token and providing it with the request its trying to perform
router.get('/api/users/me', auth, async (req, res) => {
	res.send(req.user);
});

//the next one is good for when a user is updated
router.patch('/api/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = Object.keys(User.schema.obj);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		// const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });
		//the code above bypass middleware so,we replace the code above with 3 lines:
		//1)
		// const user = await User.findById(req.params.id);

		//2)and now to update, we cant change it hardcoded its different every time so we will use this loop for dynamic updates
		updates.forEach((update) => (req.user[update] = req.body[update]));
		//3)this is where our middleware actually get executed
		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/api/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

// -----------------User Avatar-----------------
const upload = multer({
	limits: {
		fileSize: 100000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image'));
		}
		//if success
		cb(undefined, true);
	},
});

// -----------------Create user avatar-----------------
router.post(
	'/api/users/special/me/avatar',
	auth,
	upload.single('avatar'),
	async (req, res) => {
		try {
			const buffer = await sharp(req.file.buffer)
				.resize({ width: 250, height: 250 })
				.png()
				.toBuffer();
			// req.user.avatar = req.file.buffer;
			req.user.avatar = buffer;
			await req.user.save();
			res.send();
		} catch (e) {
			res.status(401).send();
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

// -----------------Delete user avatar-----------------
router.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
});

// -----------------Get user avatar-----------------
router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.avatar) {
			throw new Error();
		}

		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send();
	}
});

module.exports = router;

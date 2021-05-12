const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

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
		console.log(token);
		res.send({ user, token });
	} catch (e) {
		res.status(400).send();
	}
});

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

router.post('/api/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post('/api/users/addcourse', auth, async (req, res) => {
	try {
		console.log(req.body);
		const newCourse = { courseId: req.body.id };
		console.log(newCourse);
		req.user.courses.push(newCourse);
		req.user.save();
		res.send(req.user.courses);
	} catch (e) {
		res.status(500).send();
	}
});
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
	// try {const users = await User.find({});
	// 	res.send(users); } catch (e) {res.status(500).send();}
	//we dont need this ^ we passed it through the request
	res.send(req.user);
});

//we dont need to get user by id unless its our own user id, the function above doing this same process thats how we fetch user profile ^
// router.get('/users/:id', async (req, res) => {
// 	const _id = req.params.id;

// 	try {
// 		const user = await User.findById(_id);

// 		if (!user) {
// 			return res.status(404).send();
// 		}

// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send();
// 	}
// });

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

		// if (!user) {
		// 	return res.status(404).send();
		// }

		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/api/users/me', auth, async (req, res) => {
	try {
		//validating credentials
		//req.params.id changed to -> req.user._id since we already attacked the user to req and we do have access to it since we r using the authentication middleware
		// const user = await User.findByIdAndDelete(req.user._id);

		// if (!user) {
		// 	return res.status(404).send();
		// }
		//from mongoose doc we have .remove() and we dont need to check if user, we got it in the auth
		await req.user.remove();
		//user -> req.user
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

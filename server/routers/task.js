const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/api/tasks', auth, async (req, res) => {
	// const task = new Task(req.body);
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/api/tasks', auth, async (req, res) => {
	try {
		//const tasks = await Task.find({});
		await req.user.populate('tasks').execPopulate();
		//res.send(tasks);
		res.send(req.user.tasks);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/api/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		//const task = await Task.findById(_id);
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch('/api/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		//const task = await Task.findById(req.params.id);
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/api/tasks/:id', auth, async (req, res) => {
	try {
		//const task = await Task.findByIdAndDelete(req.params.id);
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;

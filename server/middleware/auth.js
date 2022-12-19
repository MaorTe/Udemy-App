const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
	try {
		//looking for the header is suppose to provide
		const token = req.header('Authorization').replace('Bearer ', '');
		//validates the header
		const decoded = jwt.verify(token, 'thisismynewcourse');
		//finds the associated user
		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token,
		});

		if (!user) {
			throw new Error();
		}
		//this is for logout user
		req.token = token;
		//all we need to do is add a property on to the request to store this and the route handlers will be able to access it later on
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate.' });
	}
};

module.exports = auth;

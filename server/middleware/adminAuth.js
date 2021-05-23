const adminAuth = async (req, res, next) => {
	try {
		if (req.user.userRole !== 'admin') {
			return res.status(403).send();
		}
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate.' });
	}
};

module.exports = adminAuth;

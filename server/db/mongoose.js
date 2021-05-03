const mongoose = require('mongoose');

let url;
if (process.env.NODE_ENV) {
	url = process.env.ATLAS;
} else {
	url = require('./atlas');
}

mongoose.connect('mongodb://127.0.0.1:27017/fullstack-mern-api', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

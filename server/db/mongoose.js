const mongoose = require('mongoose');

let url;
if (process.env.NODE_ENV) {
   url = process.env.ATLAS;
} else {
   url = require('./atlas');
}
mongoose.set('strictQuery', false);
mongoose.connect(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

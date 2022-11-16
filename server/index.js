const express = require('express');
const cors = require('cors');
const path = require('path');
require('./db/mongoose');
const userRouter = require('./routers/user');
const courseRouter = require('./routers/course');
const videoRouter = require('./routers/video');
const commentRouter = require('./routers/comment');

const app = express();
const router = new express.Router();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/video', videoRouter);
app.use('/api/comments', commentRouter);
app.use(cors());

app.listen(port, () => {
   console.log('Server is up on port ' + port);
});

//deploy to heroku
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

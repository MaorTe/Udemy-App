const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
   {
      courseImage: {
         type: String,
         required: true,
      },
      courseName: {
         type: String,
         required: true,
      },
      courseDescription: {
         type: String,
         required: true,
      },
      tag: {
         type: String,
         required: true,
      },
      courseVideos: [
         {
            videoId: {
               type: mongoose.Schema.Types.ObjectId,
               required: true,
               ref: 'Video',
            },
         },
      ],
   },
   // { toJSON: { virtuals: true } }
);
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

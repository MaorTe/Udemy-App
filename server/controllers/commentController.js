const Comment = require('../models/comment');
const Video = require('../models/video');

const addNewComment = async (req, res) => {
   try {
      const comment = await Comment.findOne({
         videoId: req.body.videoId,
      }).populate({ path: 'comments.owner', select: 'name' });

      const newComment = {
         ...comment.owner,
         content: req.body.content,
         owner: req.user._id,
      };
      comment.comments.unshift(newComment);
      await comment.save();

      const commentToSend = await Comment.findOne({
         videoId: req.body.videoId,
      }).populate({ path: 'comments.owner', select: 'name' });

      res.status(200).send(commentToSend.comments);
   } catch (e) {
      console.dir(e);
      res.status(500).send();
   }
};

const getVideoComments = async (req, res) => {
   try {
      const comment = await Comment.findOne({
         videoId: req.params.videoId,
      }).populate({ path: 'comments.owner', select: 'name' });

      res.status(200).send(comment.comments);
   } catch (e) {
      res.status(500).send();
   }
};

const editComment = async (req, res) => {
   try {
      const comment = await Comment.findOne({
         videoId: req.params.videoId,
      });
      const foundComment = comment.comments.findIndex(
         (el) => el._id.toString() === req.body.commentId,
      );
      comment.comments[foundComment].content = req.body.content;
      await comment.save();

      const commentToSend = await Comment.findOne({
         videoId: req.params.videoId,
      }).populate({ path: 'comments.owner', select: 'name' });

      res.status(200).send(commentToSend.comments);
   } catch (e) {
      console.dir(e);
      res.status(500).send();
   }
};

const deleteComment = async (req, res) => {
   try {
      const comment = await Comment.findOne({
         videoId: req.params.videoId,
      });

      const foundComment = comment.comments.findIndex(
         (el) => el._id.toString() === req.params.commentId,
      );
      comment.comments.splice(foundComment, 1);
      await comment.save();

      const commentToSend = await Comment.findOne({
         videoId: req.params.videoId,
      }).populate({ path: 'comments.owner', select: 'name' });

      res.status(200).send(commentToSend.comments);
   } catch (e) {
      res.status(500).send();
   }
};
module.exports = { addNewComment, getComment, editComment, deleteComment };

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../API/api';

// Thunk functions
export const fetchComments = createAsyncThunk('comments/fetchComments', async (videoId) => {
   const response = await axiosInstance.get(`comments/${videoId}`);
   return response.data;
});

export const addComment = createAsyncThunk(
   'comments/addComment',
   async ({ newComment, videoId }) => {
      const response = await axiosInstance.post(`comments/newcomment`, {
         content: newComment,
         videoId: videoId,
      });
      return response.data;
   },
);

export const editComment = createAsyncThunk(
   'comments/editComment',
   async ({ videoId, commentId, content }) => {
      const response = await axiosInstance.patch(`comments/${videoId}`, { content, commentId });
      return response.data;
   },
);

export const deleteComment = createAsyncThunk(
   'comments/deleteComment',
   async ({ videoId, commentId }) => {
      const response = await axiosInstance.delete(`comments/${videoId}/${commentId}`);
      return response.data;
   },
);

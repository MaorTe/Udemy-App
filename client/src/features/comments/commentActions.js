import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../API/api';

const token = localStorage.getItem('userToken');
// Thunk functions
export const fetchComments = createAsyncThunk('comments/fetchComments', async (videoId) => {
   // try {
   if (videoId) {
      const response = await api.get(`comments/${videoId}`, {
         headers: { Authorization: token },
      });
      return response.data;
   }
   // } catch (error) {
   // console.log(error);
   // }
});

export const addComment = createAsyncThunk(
   'comments/addComment',
   async ({ newComment, videoId }) => {
      const response = await api.post(
         `comments/newcomment`,
         { content: newComment, videoId: videoId },
         {
            headers: { Authorization: token },
         },
      );
      return response.data;
   },
);

export const editComment = createAsyncThunk(
   'comments/editComment',
   async ({ videoId, commentId, content }) => {
      const response = await api.patch(
         `comments/${videoId}`,
         { content, commentId },
         {
            headers: { Authorization: token },
         },
      );
      return response.data;
   },
);
export const deleteComment = createAsyncThunk(
   'comments/deleteComment',
   async ({ videoId, commentId }) => {
      const response = await api.delete(`comments/${videoId}/${commentId}`, {
         headers: { Authorization: token },
      });
      return response.data;
   },
);

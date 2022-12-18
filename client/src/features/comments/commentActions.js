import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../API/api';

const userToken = localStorage.getItem('userToken');
// Thunk functions
export const fetchComments = createAsyncThunk('comments/fetchComments', async (videoId) => {
   if (videoId) {
      const response = await api.get(`comments/${videoId}`, {
         headers: { Authorization: userToken },
      });
      return response.data;
   }
});

export const addComment = createAsyncThunk(
   'comments/addComment',
   async ({ newComment, videoId }) => {
      const response = await api.post(
         `comments/newcomment`,
         { content: newComment, videoId: videoId },
         {
            headers: { Authorization: userToken },
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
            headers: { Authorization: userToken },
         },
      );
      return response.data;
   },
);

export const deleteComment = createAsyncThunk(
   'comments/deleteComment',
   async ({ videoId, commentId }) => {
      const response = await api.delete(`comments/${videoId}/${commentId}`, {
         headers: { Authorization: userToken },
      });
      return response.data;
   },
);

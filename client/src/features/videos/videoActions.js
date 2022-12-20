import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../API/api';

const userToken = localStorage.getItem('userToken');
// Thunk functions

export const addVideo = createAsyncThunk('videos/addNewVideo', async (videoInfo) => {
   const response = await api.post('/video/addvideo', videoInfo, {
      headers: { Authorization: userToken },
   });
   return response.data;
});

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async (courseId) => {
   const response = await api.get(`/video/courses/${courseId}`, {
      headers: { Authorization: userToken },
   });
   return response.data;
});
